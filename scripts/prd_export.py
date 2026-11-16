#!/usr/bin/env python3
"""Export a prd-forge document set as one Word document and one PDF.

    python3 prd_export.py <set directory> [--out <directory>] [--docx] [--pdf]

With neither --docx nor --pdf, both are written. The whole set becomes one
document: a title page, the document information, the executive summary, a table
of contents, then every section in reading order with its prose and the full
detail of every item its front matter carries.

Needs PyYAML and python-docx for the Word file, and Chromium for the PDF.
"""

import argparse, base64, html, os, re, shutil, struct, subprocess, sys, tempfile
from datetime import date

try:
    import yaml
except ImportError:
    sys.exit("prd_export: PyYAML is required (pip install pyyaml)")

# ---------------------------------------------------------------- the set

SECTION_OF_KIND = {
    "problem-opportunity": 1, "customer-market": 2, "objectives-metrics": 3,
    "personas": 4, "journeys": 5, "scenarios": 5, "scope": 6,
    "functional-requirements": 7, "wireframes": 7, "nonfunctional-requirements": 8,
    "constraints": 9, "decision-rights": 10,
    "assumptions-risks-dependencies": 11, "open-questions": 12,
    "release-plan": 13, "glossary": 14, "change-log": 15, "review-comments": 15, "roadmap": 13,
}

# per kind: the front-matter lists holding its items, and the field that heads each
ITEM_LISTS = {
    "problem-opportunity": [("problems", "statement")],
    "customer-market": [("segments", "name"), ("competitors", "name")],
    "objectives-metrics": [("objectives", "objective"), ("guardrails", "metric")],
    "personas": [("personas", "name")],
    "journeys": [("journeys", "goal")],
    "scenarios": [("scenarios", "context"), ("lifecycles", "subject")],
    "scope": [("in_scope", "summary"), ("out_of_scope", "summary")],
    "functional-requirements": [("requirements", "capability")],
    "wireframes": [("wireframes", "title")],
    "nonfunctional-requirements": [("requirements", "statement"), ("not_applicable", "category")],
    "constraints": [("constraints", "statement")],
    "decision-rights": [("decisions", "decision")],
    "assumptions-risks-dependencies": [("assumptions", "assumption"), ("risks", "risk"), ("dependencies", "need")],
    "open-questions": [("questions", "question")],
    "release-plan": [("releases", "name")],
    "glossary": [("terms", "term")],
    "change-log": [("changes", "summary")],
    "review-comments": [("comments", "comment")],
    "roadmap": [("items", "title"), ("changes", "change")],
    "backlog": [], "features": [("features", "name")], "epics": [("epics", "goal")],
    "stories": [("stories", "capability")], "spikes": [("spikes", "question")],
}

LABEL = {
    "id": "ID", "why_now": "Why now", "cost_of_inaction": "Cost of inaction",
    "end_state": "End state", "pain_points": "Pain points", "golden_thread": "Golden thread",
    "journey_stage": "Journey stage", "expected_outcome": "Expected outcome",
    "applies_to": "Applies to", "never_delegated": "Never delegated",
    "delegable_to_agent": "Delegable to an agent", "evidence_required": "Evidence required",
    "if_false": "If false", "validated_by": "Validated by", "see_also": "See also",
    "not": "Not", "target_date": "Target date", "willingness_to_pay": "Willingness to pay",
    "our_edge": "Our edge", "why_we_win": "Why we win", "release_line": "Release line",
    "in_scope": "In scope", "out_of_scope": "Out of scope", "non_goals": "Non-goals",
    "timebox_days": "Time-box (days)", "ends_in": "Ends in",
}
label = lambda k: LABEL.get(k, k.replace("_", " ").capitalize())

SKIP_FRONT = {"id", "kind", "schema", "title", "status", "updated", "links", "score",
              "blocking", "graded", "domain", "section", "order"}


def split_front_matter(text):
    if not text.startswith("---"):
        return {}, text
    lines = text.split("\n")
    end = next((i for i in range(1, len(lines)) if lines[i].rstrip() in ("---", "...")), -1)
    if end == -1:
        return {}, text
    front = yaml.safe_load("\n".join(lines[1:end])) or {}
    return front, "\n".join(lines[end + 1:])


DETAILS = re.compile(r"\n*<!-- prd-forge:details -->.*?<!-- /prd-forge:details -->\n*", re.S)


def without_details(body):
    """The body without the block prd-details.mjs writes: render_items prints the same fields."""
    return DETAILS.sub("\n", body)


def bookmark_name(ident):
    """A Word bookmark name for an id: letters, digits and `_`, at most 40, starting with a letter.
    prd_comments.py maps a reviewer's comment back to the id through the same rule."""
    name = re.sub(r"[^A-Za-z0-9]", "_", str(ident))[:40]
    return name if name[:1].isalpha() else f"x{name}"[:40]


def read_set(directory):
    docs = []
    for name in sorted(os.listdir(directory)):
        if not name.endswith(".md"):
            continue
        front, body = split_front_matter(open(os.path.join(directory, name), encoding="utf-8").read())
        if not isinstance(front, dict) or "kind" not in front:
            continue
        docs.append({"file": name, "front": front, "body": without_details(body)})
    root = next((d for d in docs if d["front"]["kind"] in ("prd", "backlog")), None)
    if root is None:
        sys.exit(f"prd_export: no root document (kind: prd) in {directory}")
    rest = sorted((d for d in docs if d is not root), key=lambda d: (d["front"].get("order", 999), d["file"]))
    return root, rest

# ---------------------------------------------------------- markdown subset

# ponytail: the set being exported, so an image path in a body resolves; set once in main
SET_DIR = "."


def image_file(path):
    """The PNG to embed for a body image link.

    A designed figure, `<id>_imagen.png`, wins when its sidecar's hash matches
    the diagram's current source. A stale one is skipped with a warning, so a
    reader never sees a figure of an older diagram. Otherwise the link's own
    file, or its .png twin.
    """
    full = os.path.join(SET_DIR, path)
    stem = re.sub(r"\.(svg|png)$", "", full)
    designed, sidecar = stem + "_imagen.png", stem + "_imagen.json"
    source = next((stem + ext for ext in (".mmd", ".puml") if os.path.exists(stem + ext)), None)
    if os.path.exists(designed) and os.path.exists(sidecar) and source:
        import hashlib, json
        try:
            want = json.load(open(sidecar, encoding="utf-8")).get("hash")
        except (OSError, ValueError):
            want = None
        have = hashlib.sha256(open(source, encoding="utf-8").read().encode("utf-8")).hexdigest()
        if want == have:
            return designed
        print(f"prd_export: {os.path.relpath(designed, SET_DIR)} is older than "
              f"{os.path.basename(source)}; using the plain diagram", file=sys.stderr)
    png = re.sub(r"\.svg$", ".png", full)
    return png if os.path.exists(png) else (full if os.path.exists(full) else None)


ACRONYMS = {"prd", "ai", "api", "ui", "ux", "id", "url", "pdf"}


def display_name(name):
    """A product or document name as a reader sees it.

    A name with any capital letter is kept: its author chose that case. An
    all-lowercase name, like a slug, becomes title case with known acronyms in
    capitals, so `prd-forge` reads PRD Forge.
    """
    name = str(name or "").strip()
    title = lambda slug: " ".join(w.upper() if w in ACRONYMS else w[:1].upper() + w[1:]
                                  for w in re.split(r"[_-]+", slug) if w)
    if name == name.lower():
        return " ".join(title(w) for w in name.split())
    # Mixed case: only a slug inside it changes, as in `prd-forge PRD`.
    return " ".join(title(w) if w == w.lower() and re.search(r"[a-z][_-][a-z]", w) else w
                    for w in name.split())


INLINE = re.compile(r"(\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|_[^_]+_|\*[^*\s][^*]*?\*)")


def runs(text):
    """Inline markdown -> [(kind, text)] with kind in plain/bold/code/italic/link."""
    out = []
    for piece in INLINE.split(text):
        if not piece:
            continue
        if piece.startswith("**") and piece.endswith("**"):
            out.append(("bold", piece[2:-2]))
        elif piece.startswith("`") and piece.endswith("`"):
            out.append(("code", piece[1:-1]))
        elif piece.startswith("[") and "](" in piece:
            out.append(("link", piece[1:piece.index("](")]))
        elif piece[:1] in "_*" and piece.endswith(piece[0]) and len(piece) > 2:
            out.append(("italic", piece[1:-1]))
        else:
            out.append(("plain", piece))
    return out


def blocks(md):
    """Markdown -> a list of blocks the renderers both understand."""
    out, lines, i = [], md.split("\n"), 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        fence = re.match(r"^\s*```\s*([\w-]*)\s*$", line)
        if fence:
            pre = []
            i += 1
            while i < len(lines) and not re.match(r"^\s*```\s*$", lines[i]):
                pre.append(lines[i])
                i += 1
            out.append({"type": "pre", "lang": fence.group(1), "lines": pre})
            i += 1
            continue
        image = re.match(r"^!\[([^\]]*)\]\(([^)\s]+)\)\s*$", line)
        if image:
            out.append({"type": "image", "alt": image.group(1), "path": image.group(2)})
            i += 1
            continue
        head = re.match(r"^(#{1,4})\s+(.*)$", line)
        if head:
            out.append({"type": "heading", "level": len(head.group(1)), "text": head.group(2).strip()})
            i += 1
            continue
        if line.lstrip().startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|[\s:|-]+\|\s*$", lines[i + 1]):
            cells = lambda r: [c.strip() for c in r.strip().strip("|").split("|")]
            header, rows = cells(line), []
            i += 2
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                rows.append(cells(lines[i]))
                i += 1
            out.append({"type": "table", "header": header, "rows": rows})
            continue
        if re.match(r"^\s*[-*]\s+", line):
            items = []
            while i < len(lines) and re.match(r"^\s*[-*]\s+", lines[i]):
                items.append(re.sub(r"^\s*[-*]\s+", "", lines[i]).strip())
                i += 1
                while i < len(lines) and lines[i].startswith("  ") and lines[i].strip() and not re.match(r"^\s*[-*]\s+", lines[i]):
                    items[-1] += " " + lines[i].strip()
                    i += 1
            out.append({"type": "bullets", "items": items})
            continue
        if re.match(r"^\s*\d+\.\s+", line):
            items = []
            while i < len(lines) and re.match(r"^\s*\d+\.\s+", lines[i]):
                items.append(re.sub(r"^\s*\d+\.\s+", "", lines[i]).strip())
                i += 1
                while i < len(lines) and lines[i].startswith("   ") and lines[i].strip() and not re.match(r"^\s*\d+\.\s+", lines[i]):
                    items[-1] += " " + lines[i].strip()
                    i += 1
            out.append({"type": "numbered", "items": items})
            continue
        if line.lstrip().startswith(">"):
            quote = []
            while i < len(lines) and lines[i].lstrip().startswith(">"):
                quote.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append({"type": "quote", "text": " ".join(q.strip() for q in quote if q.strip())})
            continue
        para = []
        while i < len(lines) and lines[i].strip() and not re.match(r"^(#{1,4}\s|\s*[-*]\s|\s*\d+\.\s|\s*>|\s*```|!\[)", lines[i]) \
                and not lines[i].lstrip().startswith("|"):
            para.append(lines[i].strip())
            i += 1
        if para:
            out.append({"type": "para", "text": " ".join(para)})
        else:
            # A line no branch claimed - a table row whose header is elsewhere, say.
            # Take it as its own paragraph: never leave `i` where it was, or this
            # loop does not terminate.
            out.append({"type": "para", "text": lines[i].strip()})
            i += 1
    # A wireframe's drawing stands in for its text sketch on the page.
    return [b for n, b in enumerate(out)
            if not (b["type"] == "pre" and b["lang"] == "wireframe" and n + 1 < len(out)
                    and out[n + 1]["type"] == "image" and image_file(out[n + 1]["path"]))]


def inline(value):
    """A value on one line. A mapping in a mixed list reads `Label: value; Label: value`."""
    if isinstance(value, dict):
        return "; ".join(f"{label(k)}: {inline(v).rstrip('.')}" for k, v in value.items() if v not in (None, []))
    if isinstance(value, list):
        return ", ".join(inline(v) for v in value)
    return str(value).strip()


def flatten(value):
    """A front-matter value as (text, list_of_strings, nested_items)."""
    if isinstance(value, bool):
        return ("yes" if value else "no"), None, None
    if value is None:
        return "—", None, None
    if isinstance(value, (int, float, str)):
        return str(value).strip(), None, None
    if isinstance(value, list):
        if value and all(isinstance(v, dict) for v in value):
            return None, None, value
        items = [inline(v) for v in value]
        # Bare ids read better on one line than as a tall list: FR-001, FR-002, FR-003.
        if items and all(re.fullmatch(r"[A-Z][A-Z0-9]{0,5}-\d{2,4}", i) for i in items):
            return ", ".join(items), None, None
        return None, items, None
    if isinstance(value, dict):
        return None, None, [value]
    return str(value), None, None

# ----------------------------------------------------------------- HTML/PDF

CSS = """
:root{--ink:#16181d;--mute:#5c6370;--faint:#8b93a1;--rule:#d8dce3;--accent:#1f4e79;
      --accent-soft:#e8eef6;--chip:#eef2f7;--soft:#f7f8fa;--ok:#1f6b36;--warn:#9c2b2b;
      --sans:"Avenir Next","Helvetica Neue",Helvetica,Arial,sans-serif;
      --serif:"Charter","Bitstream Charter",Georgia,serif;
      --mono:"SF Mono",Menlo,"DejaVu Sans Mono",monospace}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;color:var(--ink);font:10.4pt/1.58 var(--serif);counter-reset:fig}
h1,h2,h3,h4,.ui{font-family:var(--sans)}
p{margin:0 0 .62em}
p,li,dd{orphans:3;widows:3}
a{color:var(--accent);text-decoration:none}
code{font-family:var(--mono);font-size:.84em;background:var(--chip);padding:.06em .3em;border-radius:2px}
strong{font-weight:700}
.nw{white-space:nowrap}

/* title page: the one bold element */
@page cover{margin:0}
.cover{page:cover;height:279mm;display:flex;flex-direction:column;break-after:page;padding:0 20mm 20mm}
.cover .band{background:var(--accent);color:#fff;margin:0 -20mm;padding:34mm 20mm 14mm;min-height:132mm;
             display:flex;flex-direction:column;justify-content:flex-end}
.cover .kind{font-family:var(--sans);font-size:10pt;font-weight:500;color:#c7d6e8;margin:0 0 3mm}
.cover h1{font-size:44pt;line-height:1.02;margin:0 0 6mm;letter-spacing:-.02em;font-weight:700;color:#fff}
.cover .tagline{font-size:12.5pt;line-height:1.5;color:#e4ebf4;margin:0;max-width:150mm}
.cover .facts{display:flex;gap:9mm;margin:10mm 0 0;font-family:var(--sans)}
.cover .facts div{font-size:9pt;color:var(--mute)}
.cover .facts b{display:block;font-size:15pt;color:var(--ink);font-weight:600;line-height:1.25}
.cover .people{margin-top:auto;display:grid;grid-template-columns:32mm 1fr;gap:2.4mm 6mm;
               border-top:1px solid var(--rule);padding-top:5mm;font-size:9.4pt}
.cover .people dt{font-family:var(--sans);font-size:8.6pt;color:var(--mute)}
.cover .people dd{margin:0}
.cover .people ul{margin:0;padding-left:1em}

/* sections */
section.part{break-before:page}
.sechead{display:grid;grid-template-columns:20mm 1fr;align-items:end;column-gap:4mm;
         border-bottom:1.5px solid var(--ink);padding-bottom:3.5mm;margin-bottom:6mm}
.sechead .num{font-family:var(--sans);font-size:40pt;line-height:.85;font-weight:700;color:var(--accent)}
h1.sec{font-size:21pt;line-height:1.15;margin:0;letter-spacing:-.01em;font-weight:700}
.chips{margin-top:2mm;display:flex;gap:1.6mm;flex-wrap:wrap}
.chip{font-family:var(--sans);font-size:8pt;font-weight:600;background:var(--chip);color:var(--mute);
      padding:.5mm 2.2mm;border-radius:2mm}
.chip.warn{background:#fbeaea;color:var(--warn)}
.chip.ok{background:#e7f2ea;color:var(--ok)}

h2{font-size:13pt;margin:7mm 0 2mm;font-weight:700;break-after:avoid;color:var(--ink)}
h3{font-size:11pt;margin:5.5mm 0 1.5mm;font-weight:600;break-after:avoid;color:var(--accent)}
h4{font-size:10pt;margin:4mm 0 1mm;font-weight:600;color:var(--mute);break-after:avoid}
ul,ol{margin:.2em 0 .7em;padding-left:1.15em}
li{margin:.18em 0}
ul.ids{list-style:none;padding:0}
ul.ids li{display:grid;grid-template-columns:19mm 1fr;column-gap:2mm;margin:0;padding:1.1mm 0;
          border-bottom:.5px solid var(--rule);break-inside:avoid}
ul.ids li:last-child{border-bottom:none}
ul.ids .tag{font-family:var(--sans);font-weight:600;font-size:8.8pt;color:var(--accent);padding-top:.3mm}
pre{font-family:var(--mono);font-size:8.4pt;line-height:1.25;margin:.4em 0 1em;padding:3mm 4mm;
    background:var(--soft);border:.5px solid var(--rule);white-space:pre;break-inside:avoid}
pre.wireframe{border-style:dashed;line-height:1.02}
figure.diagram{margin:2mm 0 5mm;break-inside:avoid;counter-increment:fig;
               border:.5px solid var(--rule);border-radius:1.5mm;padding:4mm 4mm 2.5mm;background:#fff}
figure.diagram img{display:block;margin:0 auto;width:100%;max-width:100%;height:auto;max-height:150mm;object-fit:contain}
.figrow{display:grid;grid-template-columns:1fr 1fr;gap:4mm;align-items:start;break-inside:avoid}
.figrow figure.diagram{margin:1mm 0 4mm}
.figrow figure.diagram img{max-height:100mm}
figure.diagram figcaption{font-family:var(--sans);font-size:8.4pt;color:var(--mute);margin-top:2.5mm;
               border-top:.5px solid var(--rule);padding-top:2mm}
figure.diagram figcaption::before{content:"Figure " counter(fig) ". ";font-weight:600;color:var(--ink)}
blockquote{margin:.4em 0 .8em;padding:2mm 0 2mm 4mm;border-left:2px solid var(--accent);color:var(--mute)}

table{width:100%;border-collapse:collapse;margin:.3em 0 1em;font-size:9pt}
thead{display:table-header-group}
tr{break-inside:avoid}
th{font-family:var(--sans);font-size:8.4pt;color:var(--accent);text-align:left;font-weight:600;
   border-bottom:1.2px solid var(--accent);padding:1.4mm 2.4mm 1.2mm 0;vertical-align:bottom}
td{border-bottom:.5px solid var(--rule);padding:1.5mm 2.4mm 1.5mm 0;vertical-align:top}
tbody tr:nth-child(even) td{background:var(--soft)}
tr:last-child td{border-bottom:none}

/* item detail */
.items{margin-top:4mm}
.item{margin:0 0 5mm;padding-top:2mm;border-top:1px solid var(--rule)}
.item.tight{break-inside:avoid}
.item .idline{font-family:var(--sans);font-weight:600;font-size:10.2pt;margin:0 0 1.6mm;break-after:avoid;
              line-height:1.35}
.item .idline .id{display:inline-block;background:var(--accent);color:#fff;font-size:8.6pt;font-weight:600;
              padding:.2mm 1.8mm;border-radius:1mm;margin-right:2mm}
.item dl{display:grid;grid-template-columns:31mm 1fr;gap:1.1mm 5mm;margin:0;font-size:9.4pt}
.item dt{font-family:var(--sans);font-size:8.4pt;color:var(--mute);padding-top:.4mm}
.item dd{margin:0}
.item dd ul{margin:0;padding-left:1.05em}
.item .sub{margin:1.2mm 0 0;padding:2mm 0 1mm 3mm;border-left:2px solid var(--accent-soft)}
.item .sub.tight{break-inside:avoid}
.item .sub .subhead{font-family:var(--sans);font-weight:600;font-size:9.2pt;margin:0 0 1mm}

/* contents */
.toc{font-size:9.6pt}
.toc td{padding:1.3mm 2.4mm 1.3mm 0;vertical-align:middle}
.toc td:first-child{width:9mm;color:var(--accent);font-family:var(--sans);font-weight:700}
.toc td a{color:var(--ink)}
.toc td:nth-child(3){width:16mm;font-family:var(--sans);font-size:8.6pt;color:var(--mute)}
.toc td:nth-child(4){width:34mm;font-family:var(--sans);font-size:8.6pt;color:var(--mute);white-space:nowrap}
.toc td:nth-child(5){width:17mm;font-family:var(--sans);font-size:8.6pt;color:var(--mute)}
.bar{display:inline-block;width:18mm;height:1.6mm;background:var(--chip);border-radius:1mm;
     margin-right:2mm;vertical-align:middle;overflow:hidden}
.bar i{display:block;height:100%;background:var(--accent)}
.summary dl{display:grid;grid-template-columns:26mm 1fr;gap:2.8mm 6mm;margin:0;
            border-left:3px solid var(--accent);padding:1mm 0 1mm 6mm}
.summary dt{font-family:var(--sans);font-size:9pt;color:var(--accent);font-weight:600;padding-top:.3mm}
.summary dd{margin:0}
.note{font-size:9pt;color:var(--mute);border-top:1px solid var(--rule);margin-top:6mm;padding-top:3mm}
"""

e = lambda s: html.escape(str(s), quote=False)


def h_runs(text):
    out = []
    for kind, piece in runs(text):
        if kind == "bold":
            out.append(f"<strong>{e(piece)}</strong>")
        elif kind == "code":
            out.append(f"<code>{e(piece)}</code>")
        elif kind == "italic":
            out.append(f"<em>{e(piece)}</em>")
        else:
            # An id never breaks at its hyphen, so `O-001` stays on one line.
            out.append(re.sub(r"\b([A-Z]{1,5}-\d{2,4})\b", r'<span class="nw">\1</span>', e(piece)))
    return "".join(out)


# A list item that starts with an id, such as `IN-001: ...`, for the tagged list.
ID_ITEM = re.compile(r"^([A-Z][A-Z0-9]{0,5}-\d{2,4}):\s+(.*)$")


def without_contents(bs):
    """Drop a body's own "Contents" subsection: the export prints its own contents."""
    out, skip = [], None
    for b in bs:
        if b["type"] == "heading":
            if skip is not None and b["level"] <= skip:
                skip = None
            if b["text"].strip().lower() == "contents":
                skip = b["level"]
        if skip is None:
            out.append(b)
    return out


def png_size(path):
    """(width, height) in pixels of a PNG, from its header; (0, 0) when unreadable."""
    try:
        head = open(path, "rb").read(24)
        return struct.unpack(">II", head[16:24]) if head[:8] == b"\x89PNG\r\n\x1a\n" else (0, 0)
    except OSError:
        return (0, 0)


def figure_width(path):
    """The CSS width a figure draws at: Mermaid PNGs are rendered at twice their
    size, PlantUML at their own size, and a designed figure fills the column."""
    w, _ = png_size(path)
    if path.endswith("_imagen.png") or not w:
        return None
    return w // 2 if os.path.exists(re.sub(r"\.png$", ".mmd", path)) else w


def h_figure(b):
    found = image_file(b["path"])
    if not found:
        return ""
    data = base64.b64encode(open(found, "rb").read()).decode()
    width = figure_width(found)
    style = f' style="width:{width}px"' if width else ""
    return (f'<figure class="diagram"><img src="data:image/png;base64,{data}" alt="{e(b["alt"])}"{style}>'
            f'<figcaption>{e(b["alt"])}</figcaption></figure>')


def paired(bs):
    """Two upright figures in a row share the width, so neither stands alone on a page."""
    def upright(b):
        found = b["type"] == "image" and image_file(b["path"])
        if not found or found.endswith("_imagen.png"):  # a designed figure fills the width
            return False
        w, h = png_size(found)
        return bool(w and h and w / h < 1.3)
    out, i = [], 0
    while i < len(bs):
        if i + 1 < len(bs) and upright(bs[i]) and upright(bs[i + 1]):
            out.append({"type": "figrow", "images": [bs[i], bs[i + 1]]})
            i += 2
        else:
            out.append(bs[i])
            i += 1
    return out


def h_blocks(bs, demote=1):
    out = []
    for b in paired(bs):
        t = b["type"]
        if t == "heading":
            lvl = min(b["level"] + demote, 4)
            out.append(f"<h{lvl}>{h_runs(b['text'])}</h{lvl}>")
        elif t == "para":
            out.append(f"<p>{h_runs(b['text'])}</p>")
        elif t == "bullets":
            tagged = [ID_ITEM.match(i) for i in b["items"]]
            if all(tagged):
                out.append('<ul class="ids">' + "".join(
                    f'<li><span class="tag">{e(m.group(1))}</span><span>{h_runs(m.group(2))}</span></li>'
                    for m in tagged) + "</ul>")
            else:
                out.append("<ul>" + "".join(f"<li>{h_runs(i)}</li>" for i in b["items"]) + "</ul>")
        elif t == "numbered":
            out.append("<ol>" + "".join(f"<li>{h_runs(i)}</li>" for i in b["items"]) + "</ol>")
        elif t == "quote":
            out.append(f"<blockquote>{h_runs(b['text'])}</blockquote>")
        elif t == "image":
            out.append(h_figure(b))
        elif t == "figrow":
            out.append('<div class="figrow">' + "".join(h_figure(x) for x in b["images"]) + "</div>")
        elif t == "pre":
            klass = ' class="wireframe"' if b["lang"] == "wireframe" else ""
            out.append(f"<pre{klass}>{e(chr(10).join(b['lines']))}</pre>")
        elif t == "table":
            head = "".join(f"<th>{h_runs(c)}</th>" for c in b["header"])
            rows = "".join("<tr>" + "".join(f"<td>{h_runs(c)}</td>" for c in r) + "</tr>"
                           for r in b["rows"])
            out.append(f"<table><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table>")
    return "\n".join(out)


def h_value(value):
    text, items, nested = flatten(value)
    if text is not None:
        return h_runs(text)
    if items is not None:
        return "<ul>" + "".join(f"<li>{h_runs(i)}</li>" for i in items) + "</ul>"
    if nested is not None:
        parts = []
        for one in nested:
            name = one.get("name") or one.get("id") or ""
            rows = "".join(
                f"<dt>{e(label(k))}</dt><dd>{h_value(v)}</dd>"
                for k, v in one.items() if k not in ("name",) and v is not None)
            klass = "sub tight" if len(str(one)) < 700 else "sub"
            parts.append(f'<div class="{klass}"><p class="subhead">{h_runs(str(name))}</p><dl>{rows}</dl></div>')
        return "".join(parts)
    return ""


# Filled by main(): each section number's title, and each person's role.
SECTION_TITLES, ROLES = {}, {}


def item_view(kind, one, head_field):
    """(id, headline, fields) for one item, shared by the PDF and Word renderers.

    A headline over 90 characters is never cut: it becomes the first field and
    the heading shows the id alone. A change-log entry is headed by its version
    and short title, names each section with its title, and its author with a role.
    """
    one = dict(one)
    ident = str(one.pop("id", "") or "")
    if kind == "change-log":
        ident = str(one.pop("version", "") or ident)
        head_field = "title" if one.get("title") else head_field
        if one.get("author") in ROLES:
            one["author"] = f'{one["author"]}, {ROLES[one["author"]]}'
        if isinstance(one.get("sections"), list):
            one["sections"] = [f"{n} {SECTION_TITLES[n]}" if n in SECTION_TITLES else str(n)
                               for n in one["sections"]]
    headline = str(one.get(head_field, "") or "").strip()
    fields = [] if len(headline) <= 90 else [(head_field, headline)]
    if fields:
        headline = ""
    fields += [(k, v) for k, v in one.items() if k != head_field and v is not None and v != []]
    return ident, headline, fields


def h_items(front, kind):
    out = []
    for key, head_field in ITEM_LISTS.get(kind, []):
        value = front.get(key)
        if not isinstance(value, list) or not value:
            continue
        if len(ITEM_LISTS.get(kind, [])) > 1:
            out.append(f"<h3>{e(label(key))}</h3>")
        for one in value:
            if not isinstance(one, dict):
                continue
            ident, headline, fields = item_view(kind, one, head_field)
            title = " ".join(x for x in ((f'<span class="id">{e(ident)}</span>' if ident else ""),
                                           h_runs(headline)) if x)
            rows = "".join(f"<dt>{e(label(k))}</dt><dd>{h_value(v)}</dd>" for k, v in fields)
            weight = sum(len(str(v)) for _, v in fields) + len(headline)
            klass = "item tight" if weight < 900 else "item"
            anchor = f' id="{e(bookmark_name(one["id"]))}"' if one.get("id") else ""
            head = f'<p class="idline"{anchor}>{title}</p>' if title else ""
            out.append(f'<div class="{klass}">{head}<dl>{rows}</dl></div>')
    return f'<div class="items">{"".join(out)}</div>' if out else ""


def approval_md(f, rest):
    """FR-013: what the approver needs on the root page, as markdown. The export
    drops the details block that carries the same view, so it prints it here."""
    of = {d["front"]["kind"]: d["front"] for d in rest}
    md = []
    approvers = [a for a in f.get("approvers") or [] if isinstance(a, dict)]
    if approvers:
        md += ["# Approvers", ""] + [f'- {a.get("name", "")}, {a.get("role", "")}' for a in approvers] + [""]
    scope = of.get("scope") or {}
    for key, name in (("in_scope", "In scope"), ("out_of_scope", "Out of scope")):
        items = [i for i in scope.get(key) or [] if isinstance(i, dict)]
        if items:
            md += [f"# {name}", ""] + [f'- {i.get("id", "")}: {inline(i.get("summary", ""))}' for i in items] + [""]
    open_qs = [q for q in (of.get("open-questions") or {}).get("questions") or []
               if isinstance(q, dict) and not q.get("answer")]
    md += ["# Undecided", ""]
    md += ([f'- {q.get("id", "")}: {inline(q.get("question", ""))} Decider: {q.get("decider", "—")}. By: {q.get("by", "—")}.'
            for q in open_qs] or ["Nothing is undecided."]) + [""]
    blocked = [d["front"] for d in rest if (d["front"].get("blocking") or 0) > 0]
    md += ["# Blocking defects", "",
           "Blocking defects in " + ", ".join(f'section {b.get("section", "")} ({b["blocking"]})' for b in blocked) + "."
           if blocked else "None.", ""]
    return "\n".join(md)


def build_html(root, rest, title):
    f = root["front"]
    product = display_name(f.get("product", title))

    facts = "".join(f"<div>{e(k)}<b>{e(v)}</b></div>" for k, v in (
        ("Version", f.get("version")), ("Status", str(f.get("status", "")).capitalize()),
        ("Updated", f.get("updated")), ("Domain", str(f.get("domain", "")).capitalize())) if v)
    people = [("Owner", e(f.get("owner", ""))) if f.get("owner") else None]
    approvers = [a for a in f.get("approvers") or [] if isinstance(a, dict)]
    if approvers:
        people.append(("Approvers", "<br>".join(e(f'{a.get("name", "")}, {a.get("role", "")}') for a in approvers)))
    if f.get("golden_thread"):
        people.append(("Golden thread", e(f["golden_thread"])))
    if f.get("stakeholders"):
        people.append(("Stakeholders", "<ul>" + "".join(
            f"<li>{e(s if isinstance(s, str) else s.get('role', ''))}</li>" for s in f["stakeholders"]) + "</ul>"))
    people_dl = "".join(f"<dt>{k}</dt><dd>{v}</dd>" for k, v in filter(None, people))

    summary = ""
    if isinstance(f.get("summary"), dict):
        rows = "".join(f"<dt>{e(label(k))}</dt><dd>{h_runs(str(v).strip())}</dd>"
                       for k, v in f["summary"].items())
        summary = f'<h2>Executive summary</h2><div class="summary"><dl>{rows}</dl></div>'

    toc = []
    for d in rest:
        df = d["front"]
        sec = df.get("section", SECTION_OF_KIND.get(df["kind"], ""))
        score = df.get("score")
        grade = (f'<span class="bar"><i style="width:{int(score)}%"></i></span>{int(score)}'
                 if isinstance(score, (int, float)) else "—")
        block = f'{df["blocking"]} blocking' if df.get("blocking") else "None"
        toc.append(f'<tr><td>{e(sec)}</td><td><a href="#{e(bookmark_name(df.get("id") or df["kind"]))}">'
                   f'{e(df.get("title",""))}</a></td><td>{e(str(df.get("status","")).capitalize())}</td>'
                   f'<td>{grade}</td><td>{e(block)}</td></tr>')
    toc_table = ('<h2>Contents</h2><table class="toc"><thead><tr><th>§</th><th>Section</th>'
                 '<th>Status</th><th>Grade</th><th>Blocking</th></tr></thead><tbody>'
                 + "".join(toc) + "</tbody></table>")

    body_md = re.sub(r"^#\s+.*$", "", root["body"], count=1, flags=re.M)
    parts = [f"""<section class="front">
      {summary}
      {toc_table}
      {h_blocks(blocks(approval_md(f, rest)), demote=1)}
      <h2>About this document</h2>
      {h_blocks(without_contents(blocks(body_md)), demote=2)}
    </section>"""]

    for d in rest:
        df = d["front"]
        sec = df.get("section", SECTION_OF_KIND.get(df["kind"], ""))
        chips = [f'<span class="chip">{e(str(df.get("status","draft")).capitalize())}</span>']
        if df.get("score") is not None:
            chips.append(f'<span class="chip">Grade {df["score"]}</span>')
        if df.get("blocking"):
            chips.append(f'<span class="chip warn">{df["blocking"]} blocking</span>')
        elif df.get("score") is not None:
            chips.append('<span class="chip ok">No blocking defects</span>')
        md = re.sub(r"^#\s+.*$", "", d["body"], count=1, flags=re.M)
        parts.append(f"""<section class="part" id="{e(bookmark_name(df.get("id") or df["kind"]))}">
          <div class="sechead">
            <div class="num">{e(sec)}</div>
            <div><h1 class="sec">{e(df.get("title",""))}</h1>
            <div class="chips">{"".join(chips)}</div></div>
          </div>
          {h_blocks(blocks(md), demote=1)}
          {h_items(df, df["kind"])}
        </section>""")

    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>{e(title)}</title><style>{CSS}</style></head><body>
<div class="cover">
  <div class="band">
    <p class="kind">Product requirements document</p>
    <h1>{e(product)}</h1>
    <p class="tagline">{e(str(f.get("summary", {}).get("bet", "")).strip())}</p>
  </div>
  <div class="facts">{facts}</div>
  <dl class="people">{people_dl}</dl>
</div>
{"".join(parts)}
</body></html>"""

# ---------------------------------------------------------------------- DOCX

def build_docx(root, rest, out_path, title):
    from docx import Document
    from docx.enum.section import WD_SECTION
    from docx.enum.table import WD_TABLE_ALIGNMENT
    from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.shared import Inches, Pt, RGBColor

    INK, MUTE, FAINT, ACCENT = RGBColor(0x16, 0x18, 0x1D), RGBColor(0x5C, 0x63, 0x70), \
        RGBColor(0x8B, 0x93, 0xA1), RGBColor(0x1F, 0x4E, 0x79)
    BODY_FONT, UI_FONT, MONO = "Georgia", "Calibri", "Consolas"

    doc = Document()
    for s in doc.sections:
        s.page_width, s.page_height = Inches(8.5), Inches(11)
        s.top_margin = s.bottom_margin = Inches(0.95)
        s.left_margin = s.right_margin = Inches(1.0)

    def all_slots(style, name):
        """Set a style's font in every slot, so Word never swaps in a theme font."""
        rpr = style.element.get_or_add_rPr()
        fonts = rpr.find(qn("w:rFonts"))
        if fonts is None:
            fonts = OxmlElement("w:rFonts")
            rpr.insert(0, fonts)
        for slot in ("ascii", "hAnsi", "eastAsia", "cs"):
            fonts.set(qn(f"w:{slot}"), name)
        for theme in ("asciiTheme", "hAnsiTheme", "eastAsiaTheme", "cstheme"):
            fonts.attrib.pop(qn(f"w:{theme}"), None)

    st = doc.styles["Normal"]
    st.font.name, st.font.size, st.font.color.rgb = BODY_FONT, Pt(10.5), INK
    all_slots(st, BODY_FONT)
    st.paragraph_format.space_after, st.paragraph_format.line_spacing = Pt(7), 1.3
    for name, size, colour in (("Heading 1", 22, INK), ("Heading 2", 14, INK),
                               ("Heading 3", 11.5, ACCENT), ("Heading 4", 10, MUTE)):
        h = doc.styles[name]
        h.font.name, h.font.size, h.font.bold, h.font.color.rgb = UI_FONT, Pt(size), True, colour
        all_slots(h, UI_FONT)
        h.paragraph_format.space_before, h.paragraph_format.space_after = Pt(16 if size > 12 else 10), Pt(4)
        h.paragraph_format.keep_with_next = True
    caption = doc.styles["Caption"]
    caption.font.name, caption.font.size, caption.font.color.rgb = UI_FONT, Pt(8.5), MUTE
    caption.font.bold, caption.font.italic = False, False
    all_slots(caption, UI_FONT)
    caption.paragraph_format.space_after = Pt(12)

    def xml(tag, **attrs):
        el = OxmlElement(tag)
        for k, v in attrs.items():
            el.set(qn(f"w:{k}"), str(v))
        return el

    def border(element, edge, sz=6, colour="D8DCE3"):
        pr = element.get_or_add_tcPr() if element.tag.endswith("tc") else element.get_or_add_pPr()
        bd = pr.find(qn("w:tcBorders")) if element.tag.endswith("tc") else pr.find(qn("w:pBdr"))
        if bd is None:
            bd = OxmlElement("w:tcBorders" if element.tag.endswith("tc") else "w:pBdr")
            pr.append(bd)
        bd.append(xml(f"w:{edge}", val="single", sz=sz, space="4" if edge == "bottom" else "0", color=colour))

    marks = iter(range(1, 1_000_000))

    def bookmark(paragraph, ident):
        """Marks the paragraph with the id, so a comment on what follows maps back to it."""
        if not ident:
            return
        n = str(next(marks))
        start = xml("w:bookmarkStart", id=n, name=bookmark_name(ident))
        paragraph._p.insert(1 if paragraph._p.pPr is not None else 0, start)
        paragraph._p.append(xml("w:bookmarkEnd", id=n))

    def shade(cell, fill):
        cell._tc.get_or_add_tcPr().append(xml("w:shd", val="clear", color="auto", fill=fill))

    def para(text_runs, style=None, size=None, colour=None, font=None, space_after=None,
             caps=False, bold=None, align=None, indent=None):
        p = doc.add_paragraph(style=style)
        if align is not None:
            p.alignment = align
        if space_after is not None:
            p.paragraph_format.space_after = Pt(space_after)
        if indent is not None:
            p.paragraph_format.left_indent = Inches(indent)
        for kind, piece in (text_runs if isinstance(text_runs, list) else runs(str(text_runs))):
            r = p.add_run(piece)
            # A styled paragraph keeps its style's font; only override when asked.
            if kind == "code":
                r.font.name = MONO
            elif font:
                r.font.name = font
            elif style is None:
                r.font.name = UI_FONT if caps else BODY_FONT
            if size:
                r.font.size = Pt(size)
            if colour:
                r.font.color.rgb = colour
            if caps:
                r.font.all_caps = True
                r.font.bold = True
            if kind == "bold" or bold:
                r.font.bold = True
            if kind == "italic":
                r.font.italic = True
            if kind == "code":
                r.font.size = Pt((size or 10.5) - 1)
        return p

    def md_table(block):
        cols = max(len(block["header"]), max((len(r) for r in block["rows"]), default=0))
        t = doc.add_table(rows=1, cols=cols)
        t.alignment = WD_TABLE_ALIGNMENT.LEFT
        # Width by the longest cell in each column, with the header counted once
        # and every column guaranteed a readable minimum.
        widest = []
        for i in range(cols):
            lengths = [len(block["header"][i]) if i < len(block["header"]) else 0]
            lengths += [len(r[i]) for r in block["rows"] if i < len(r)]
            widest.append(min(max(lengths or [1]), 60))
        total = sum(widest) or cols
        floor = 0.62
        free = PAGE_W - floor * cols - cols * PAD * 2
        t_widths = [floor + max(0.0, free) * n / total for n in widest]
        fix_layout(t, t_widths)
        for i, w in enumerate(t_widths):
            t.rows[0].cells[i].width = Inches(w)
        for i, text in enumerate(block["header"]):
            cell = t.rows[0].cells[i]
            cell.text = ""
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(3)
            r = p.add_run(re.sub(r"\*\*|`", "", text))
            r.font.name, r.font.size, r.font.bold = UI_FONT, Pt(8.5), True
            r.font.color.rgb = ACCENT
            border(cell._tc, "bottom", sz=10, colour="1F4E79")
        t.rows[0]._tr.get_or_add_trPr().append(xml("w:tblHeader"))
        for row in block["rows"]:
            cells = t.add_row().cells
            for i, w in enumerate(t_widths):
                if i < len(cells):
                    cells[i].width = Inches(w)
            for i, text in enumerate(row[:cols]):
                cells[i].text = ""
                p = cells[i].paragraphs[0]
                p.paragraph_format.space_after = Pt(3)
                for kind, piece in runs(text):
                    r = p.add_run(piece)
                    r.font.name = MONO if kind == "code" else BODY_FONT
                    r.font.size = Pt(9)
                    if kind == "bold":
                        r.font.bold = True
                border(cells[i]._tc, "bottom")
        doc.add_paragraph().paragraph_format.space_after = Pt(2)

    def figure(where, b, max_w, max_h, first=None):
        """A picture at its natural size within max_w by max_h inches, then a numbered caption."""
        found = image_file(b["path"])
        if not found:
            return
        p = first or where.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.keep_with_next = True
        p.paragraph_format.space_after = Pt(4)
        w_px, h_px = png_size(found)
        css = figure_width(found)
        w_in = min(max_w, (css or w_px) / 96 if css else max_w)
        h_in = w_in * h_px / w_px if w_px else max_h
        if h_in > max_h:
            w_in, h_in = w_in * max_h / h_in, max_h
        p.add_run().add_picture(found, width=Inches(w_in))
        cap = where.add_paragraph(style="Caption")
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = cap.add_run("Figure ")
        r.bold = True
        seq = cap.add_run()
        seq.bold = True
        for tag, attrs, text in (("w:fldChar", {"w:fldCharType": "begin"}, None),
                                 ("w:instrText", {"xml:space": "preserve"}, " SEQ Figure \\* ARABIC "),
                                 ("w:fldChar", {"w:fldCharType": "separate"}, None),
                                 ("w:t", {}, str(next(figures))),
                                 ("w:fldChar", {"w:fldCharType": "end"}, None)):
            el = OxmlElement(tag)
            for k, v in attrs.items():
                el.set(qn(k), v)
            if text:
                el.text = text
            seq._r.append(el)
        cap.add_run(". ").bold = True
        cap.add_run(b["alt"])

    figures = iter(range(1, 100_000))

    def render_blocks(bs, demote=1):
        for b in paired(bs):
            t = b["type"]
            if t == "heading":
                para(b["text"], style=f"Heading {min(b['level'] + demote, 4)}")
            elif t == "para":
                para(b["text"])
            elif t == "bullets":
                tagged = [ID_ITEM.match(i) for i in b["items"]]
                for item, m in zip(b["items"], tagged):
                    if not all(tagged):
                        para(item, style="List Bullet", space_after=3)
                        continue
                    # An id list: the id in the margin, the text hanging beside it.
                    p = para([("plain", "")], space_after=4)
                    p.paragraph_format.left_indent = Inches(0.85)
                    p.paragraph_format.first_line_indent = Inches(-0.85)
                    p.paragraph_format.tab_stops.add_tab_stop(Inches(0.85))
                    r = p.add_run(m.group(1) + "\t")
                    r.font.name, r.font.size, r.font.bold, r.font.color.rgb = UI_FONT, Pt(9), True, ACCENT
                    for kind, piece in runs(m.group(2)):
                        rr = p.add_run(piece)
                        rr.font.name = MONO if kind == "code" else BODY_FONT
                        rr.bold = kind == "bold"
            elif t == "numbered":
                for item in b["items"]:
                    para(item, style="List Number", space_after=3)
            elif t == "quote":
                p = para(b["text"], colour=MUTE, indent=0.25)
                border(p._p, "left", sz=10)
            elif t == "table":
                md_table(b)
            elif t == "image":
                figure(doc, b, 6.3, 5.9)
            elif t == "figrow":
                # Two upright figures side by side, in a borderless two-column table.
                row = doc.add_table(rows=1, cols=2)
                fix_layout(row, [PAGE_W / 2 - PAD * 2] * 2)
                row.rows[0]._tr.get_or_add_trPr().append(OxmlElement("w:cantSplit"))
                for cell, one in zip(row.rows[0].cells, b["images"]):
                    cell.width = Inches(PAGE_W / 2 - PAD * 2)
                    figure(cell, one, PAGE_W / 2 - 0.25, 4.0, first=cell.paragraphs[0])
                doc.add_paragraph().paragraph_format.space_after = Pt(2)
            elif t == "pre":
                # One paragraph, lines joined by breaks, so Word keeps the sketch whole.
                p = doc.add_paragraph()
                p.paragraph_format.space_after = Pt(8)
                p.paragraph_format.keep_together = True
                for n, text in enumerate(b["lines"]):
                    r = p.add_run(text if text else " ")
                    r.font.name, r.font.size = MONO, Pt(8)
                    if n < len(b["lines"]) - 1:
                        r.add_break()
                p._p.get_or_add_pPr().append(xml("w:shd", val="clear", color="auto", fill="F3F4F6"))

    PAGE_W = 6.5          # inches between the margins
    PAD = 0.06            # the cell padding set below, per side

    def fix_layout(table, widths):
        """Word honours column widths only under a fixed layout."""
        table.autofit = False
        pr = table._tbl.tblPr
        layout = OxmlElement("w:tblLayout")
        layout.set(qn("w:type"), "fixed")
        pr.append(layout)
        margins = OxmlElement("w:tblCellMar")
        for edge, inches in (("left", 0.0), ("right", PAD * 2), ("top", 0.02), ("bottom", 0.02)):
            m = OxmlElement(f"w:{edge}")
            m.set(qn("w:w"), str(int(inches * 1440)))
            m.set(qn("w:type"), "dxa")
            margins.append(m)
        pr.append(margins)
        total = OxmlElement("w:tblW")
        total.set(qn("w:w"), str(int(sum(widths) * 1440)))
        total.set(qn("w:type"), "dxa")
        pr.append(total)
        # python-docx already made an auto-sized grid; replace it rather than add
        # a second one, which Word and LibreOffice both ignore.
        grid = OxmlElement("w:tblGrid")
        for w in widths:
            col = OxmlElement("w:gridCol")
            col.set(qn("w:w"), str(int(w * 1440)))
            grid.append(col)
        existing = table._tbl.find(qn("w:tblGrid"))
        if existing is not None:
            table._tbl.replace(existing, grid)
        else:
            table._tbl.insert(1, grid)

    def field_table(pairs, label_w=1.35, shaded=False, label_colour=MUTE):
        value_w = PAGE_W - label_w - 2 * PAD * 2
        t = doc.add_table(rows=0, cols=2)
        fix_layout(t, [label_w, value_w])
        for key, value in pairs:
            if value is None or value == [] or value == "":
                continue
            row = t.add_row()
            if len(str(value)) < 600:  # a short row stays whole; a long one may split, or it leaves a blank page
                row._tr.get_or_add_trPr().append(OxmlElement("w:cantSplit"))
            row.cells[0].width, row.cells[1].width = Inches(label_w), Inches(value_w)
            row.cells[0].paragraphs[0].paragraph_format.space_after = Pt(3)
            c0 = row.cells[0].paragraphs[0]
            c0.paragraph_format.space_after = Pt(3)
            r = c0.add_run(str(key))
            r.font.name, r.font.size = UI_FONT, Pt(8.6)
            r.font.color.rgb = label_colour
            cell = row.cells[1]
            cell.text = ""
            text, items, nested = flatten(value)
            if text is not None:
                p = cell.paragraphs[0]
                p.paragraph_format.space_after = Pt(3)
                for kind, piece in runs(text):
                    rr = p.add_run(piece)
                    rr.font.name = MONO if kind == "code" else BODY_FONT
                    rr.font.size = Pt(9.5)
                    if kind == "bold":
                        rr.font.bold = True
            elif items is not None:
                first = True
                for one in items:
                    p = cell.paragraphs[0] if first else cell.add_paragraph()
                    first = False
                    p.paragraph_format.space_after = Pt(2)
                    p.paragraph_format.left_indent = Inches(0.12)
                    rr = p.add_run("• " + one)
                    rr.font.name, rr.font.size = BODY_FONT, Pt(9.5)
            elif nested is not None:
                first = True
                for one in nested:
                    head = one.get("name") or one.get("id") or ""
                    p = cell.paragraphs[0] if first else cell.add_paragraph()
                    first = False
                    p.paragraph_format.space_after = Pt(1)
                    rr = p.add_run(str(head))
                    rr.font.name, rr.font.size, rr.font.bold = UI_FONT, Pt(9), True
                    for k2, v2 in one.items():
                        if k2 in ("name",) or v2 is None:
                            continue
                        t2, i2, _ = flatten(v2)
                        line = t2 if t2 is not None else "; ".join(i2 or [])
                        q = cell.add_paragraph()
                        q.paragraph_format.space_after = Pt(1)
                        q.paragraph_format.left_indent = Inches(0.12)
                        a = q.add_run(f"{label(k2)}: ")
                        a.font.name, a.font.size, a.font.bold, a.font.color.rgb = UI_FONT, Pt(8.5), True, FAINT
                        b2 = q.add_run(str(line))
                        b2.font.name, b2.font.size = BODY_FONT, Pt(9.5)
            if shaded:
                shade(row.cells[0], "F7F8FA")
                shade(row.cells[1], "F7F8FA")
        doc.add_paragraph().paragraph_format.space_after = Pt(2)
        return t

    def render_items(front, kind):
        groups = ITEM_LISTS.get(kind, [])
        for key, head_field in groups:
            value = front.get(key)
            if not isinstance(value, list) or not value:
                continue
            if len(groups) > 1:
                para(label(key), style="Heading 3")
            for one in value:
                if not isinstance(one, dict):
                    continue
                ident, headline, fields = item_view(kind, one, head_field)
                p = doc.add_paragraph()
                p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(11), Pt(3)
                p.paragraph_format.keep_with_next = True
                border(p._p, "top", sz=6, colour="D8DCE3")
                if ident:
                    r = p.add_run(ident)  # no padding: a reader's text, and prd_comments, start at the id
                    r.font.name, r.font.size, r.font.bold = UI_FONT, Pt(9), True
                    r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                    r._r.get_or_add_rPr().append(xml("w:shd", val="clear", color="auto", fill="1F4E79"))
                    if headline:
                        p.add_run("  ")
                if headline:
                    r2 = p.add_run(headline)
                    r2.font.name, r2.font.size, r2.font.bold = UI_FONT, Pt(10), True
                bookmark(p, one.get("id"))  # a real id only: prd_comments.py maps comments back by it
                field_table([(label(k), v) for k, v in fields])

    def field(paragraph, code, shown=""):
        """A Word field, such as PAGE or a table of contents, with text shown until Word updates it."""
        r = paragraph.add_run()
        for tag, attrs, text in (("w:fldChar", {"w:fldCharType": "begin"}, None),
                                 ("w:instrText", {"xml:space": "preserve"}, f" {code} "),
                                 ("w:fldChar", {"w:fldCharType": "separate"}, None),
                                 ("w:t", {}, shown),
                                 ("w:fldChar", {"w:fldCharType": "end"}, None)):
            el = OxmlElement(tag)
            for k, v in attrs.items():
                el.set(qn(k), v)
            if text:
                el.text = text
            r._r.append(el)
        return r

    # ---- cover: a navy band, the facts, the people. No header or footer on it.
    f = root["front"]
    product = display_name(f.get("product", title))
    band = doc.add_table(rows=1, cols=1)
    fix_layout(band, [PAGE_W])
    cell = band.rows[0].cells[0]
    shade(cell, "1F4E79")
    mar = xml("w:tcMar")
    for edge, inches in (("top", 1.6), ("left", 0.3), ("bottom", 0.35), ("right", 0.3)):
        mar.append(xml(f"w:{edge}", w=int(inches * 1440), type="dxa"))
    cell._tc.get_or_add_tcPr().append(mar)
    white, pale = RGBColor(0xFF, 0xFF, 0xFF), RGBColor(0xC7, 0xD6, 0xE8)
    kind = cell.paragraphs[0]
    k = kind.add_run("Product requirements document")
    k.font.name, k.font.size, k.font.color.rgb = UI_FONT, Pt(10), pale
    name = cell.add_paragraph()
    name.paragraph_format.space_after, name.paragraph_format.line_spacing = Pt(8), 1.0
    n = name.add_run(product)
    n.font.name, n.font.size, n.font.bold, n.font.color.rgb = UI_FONT, Pt(38), True, white
    bookmark(name, f.get("id"))
    bet = str(f.get("summary", {}).get("bet", "")).strip()
    if bet:
        tag = cell.add_paragraph()
        b = tag.add_run(bet)
        b.font.name, b.font.size, b.font.color.rgb = BODY_FONT, Pt(12), RGBColor(0xE4, 0xEB, 0xF4)

    facts = [(k, v) for k, v in (("Version", f.get("version")), ("Status", str(f.get("status", "")).capitalize()),
                                 ("Updated", f.get("updated")), ("Domain", str(f.get("domain", "")).capitalize())) if v]
    if facts:
        doc.add_paragraph().paragraph_format.space_after = Pt(6)
        ft = doc.add_table(rows=2, cols=len(facts))
        widths = [1.1] * (len(facts) - 1) + [PAGE_W - 1.1 * (len(facts) - 1)]
        fix_layout(ft, widths)
        for i, (k, v) in enumerate(facts):
            a = ft.rows[0].cells[i].paragraphs[0].add_run(k)
            a.font.name, a.font.size, a.font.color.rgb = UI_FONT, Pt(8.5), MUTE
            ft.rows[0].cells[i].paragraphs[0].paragraph_format.space_after = Pt(0)
            v_run = ft.rows[1].cells[i].paragraphs[0].add_run(str(v))
            v_run.font.name, v_run.font.size, v_run.font.bold = UI_FONT, Pt(14), True
    doc.add_paragraph().paragraph_format.space_after = Pt(30)
    people = [("Owner", f.get("owner"))]
    approvers = [a for a in f.get("approvers") or [] if isinstance(a, dict)]
    if approvers:
        people.append(("Approvers", [f'{a.get("name", "")}, {a.get("role", "")}' for a in approvers]))
    if f.get("golden_thread"):
        people.append(("Golden thread", f["golden_thread"]))
    if f.get("stakeholders"):
        people.append(("Stakeholders", f["stakeholders"]))
    field_table([(k, v) for k, v in people if v])

    # ---- executive summary, contents, about: a new section, so the cover has no header
    doc.add_section(WD_SECTION.NEW_PAGE)
    if isinstance(f.get("summary"), dict):
        para("Executive summary", style="Heading 2")
        field_table([(label(k), str(v).strip()) for k, v in f["summary"].items()],
                    label_w=1.25, shaded=True, label_colour=ACCENT)

    para("Contents", style="Heading 2")
    toc = doc.add_paragraph()
    field(toc, 'TOC \\o "1-1" \\h \\z \\u', "Open this document in Word and choose Update Field to list the page numbers.")
    para("Section grades", style="Heading 3")
    md_table({"header": ["§", "Section", "Status", "Grade", "Blocking"],
              "rows": [[str(d["front"].get("section", SECTION_OF_KIND.get(d["front"]["kind"], ""))),
                        d["front"].get("title", ""), str(d["front"].get("status", "")).capitalize(),
                        str(d["front"]["score"]) if d["front"].get("score") is not None else "—",
                        f'{d["front"]["blocking"]} blocking' if d["front"].get("blocking") else "None"]
                       for d in rest]})
    render_blocks(blocks(approval_md(f, rest)), demote=1)

    body_md = re.sub(r"^#\s+.*$", "", root["body"], count=1, flags=re.M)
    para("About this document", style="Heading 2")
    render_blocks(without_contents(blocks(body_md)), demote=2)

    # ---- sections: each starts a page through its own first paragraph, never an empty one
    for d in rest:
        df = d["front"]
        sec = df.get("section", SECTION_OF_KIND.get(df["kind"], ""))
        eyebrow = para(f"Section {sec}", size=11, colour=ACCENT, font=UI_FONT, bold=True, space_after=0)
        eyebrow.paragraph_format.page_break_before = True
        eyebrow.paragraph_format.keep_with_next = True
        head = para(df.get("title", ""), style="Heading 1")
        bookmark(head, df.get("id"))
        head.paragraph_format.space_before = Pt(0)
        border(head._p, "bottom", sz=12, colour="16181D")
        bits = [str(df.get("status", "draft")).capitalize()]
        if df.get("score") is not None:
            bits.append(f'Grade {df["score"]}')
        bits.append(f'{df["blocking"]} blocking defects' if df.get("blocking")
                    else ("No blocking defects" if df.get("score") is not None else ""))
        para(", ".join(b for b in bits if b), size=9, font=UI_FONT,
             colour=RGBColor(0x9C, 0x2B, 0x2B) if df.get("blocking") else MUTE, space_after=12)
        render_blocks(blocks(re.sub(r"^#\s+.*$", "", d["body"], count=1, flags=re.M)), demote=1)
        render_items(df, df["kind"])

    # ---- header and footer on every page after the cover
    first, body = doc.sections[0], doc.sections[-1]
    first.footer.is_linked_to_previous = False
    body.header.is_linked_to_previous = body.footer.is_linked_to_previous = False
    hp = body.header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    hr = hp.add_run(f"{product}, product requirements document")
    hr.font.name, hr.font.size, hr.font.color.rgb = UI_FONT, Pt(8), FAINT
    for name in ("Header", "Footer"):
        style = doc.styles[name]
        style.font.name, style.font.size, style.font.color.rgb = UI_FONT, Pt(8), FAINT
        all_slots(style, UI_FONT)
    fp = body.footer.paragraphs[0]
    version = f.get("version")
    # The Footer style has a center tab and a right tab: two tabs reach the right edge.
    left = fp.add_run(f"{title}, version {version}\t\t" if version else f"{title}\t\t")
    left.font.name, left.font.size, left.font.color.rgb = UI_FONT, Pt(8), FAINT
    for text, code in (("Page ", None), (None, "PAGE"), (" of ", None), (None, "NUMPAGES")):
        r = fp.add_run(text) if text else field(fp, code, "1")
        r.font.name, r.font.size, r.font.color.rgb = UI_FONT, Pt(8), FAINT
    for sec in doc.sections:
        sec.page_width, sec.page_height = Inches(8.5), Inches(11)
        sec.top_margin = sec.bottom_margin = Inches(0.95)
        sec.left_margin = sec.right_margin = Inches(1.0)

    # Word fills in the contents and the page count when the document opens.
    doc.settings.element.append(xml("w:updateFields", val="true"))

    # Word shows these in Properties and in a file listing; python-docx's own
    # defaults ("author: python-docx") would otherwise travel with the document.
    cp = doc.core_properties
    cp.title = f'{product}: product requirements document'
    cp.author = f.get("owner") or ""
    cp.last_modified_by = f.get("owner") or ""
    cp.subject = f'PRD {f.get("version", "")}, {f.get("status", "")}'.strip(", ")
    cp.category = "Product requirements document"
    cp.comments = ""
    cp.revision = 1

    doc.save(out_path)
    return out_path


# ---------------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description="Export a prd-forge set as Word and PDF.")
    ap.add_argument("directory")
    ap.add_argument("--out", default=None, help="output directory (default: the set's own)")
    ap.add_argument("--docx", action="store_true")
    ap.add_argument("--pdf", action="store_true")
    ap.add_argument("--keep-html", action="store_true")
    args = ap.parse_args()
    want_docx = args.docx or not (args.docx or args.pdf)
    want_pdf = args.pdf or not (args.docx or args.pdf)

    directory = os.path.abspath(args.directory)
    global SET_DIR
    SET_DIR = directory
    root, rest = read_set(directory)
    for d in rest:
        n = d["front"].get("section", SECTION_OF_KIND.get(d["front"]["kind"]))
        t = d["front"].get("title", "")
        if n is not None and t:
            SECTION_TITLES[n] = f"{SECTION_TITLES[n]} and {t[:1].lower()}{t[1:]}" if n in SECTION_TITLES else t
    owner = root["front"].get("owner")
    for a in root["front"].get("approvers") or []:
        if isinstance(a, dict) and a.get("name") and a.get("role"):
            ROLES[a["name"]] = ("Owner and " if a["name"] == owner else "") + a["role"]
    if owner and owner not in ROLES:
        ROLES[owner] = "Owner"
    out_dir = os.path.abspath(args.out or directory)
    os.makedirs(out_dir, exist_ok=True)
    stem = root["front"].get("slug") or os.path.basename(directory)
    title = display_name(root["front"].get("title", stem))
    made = []

    if want_docx:
        path = os.path.join(out_dir, f"{stem}-prd.docx")
        build_docx(root, rest, path, title)
        made.append(path)

    if want_pdf:
        html_path = os.path.join(out_dir, f"{stem}-prd.html")
        open(html_path, "w", encoding="utf-8").write(build_html(root, rest, title))
        pdf_path = os.path.join(out_dir, f"{stem}-prd.pdf")
        driver = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prd-pdf.mjs")
        version = root["front"].get("version")
        footer = f"{title}, version {version}" if version else title
        result = subprocess.run(["node", driver, html_path, pdf_path, footer],
                                capture_output=True, text=True)
        if result.returncode != 0:
            print(result.stdout + result.stderr, file=sys.stderr)
            sys.exit("prd_export: the PDF step failed (is Chromium available?)")
        made.append(pdf_path)
        if not args.keep_html:
            os.remove(html_path)

    for path in made:
        print(f"  {os.path.getsize(path) / 1024:7.0f} KB  {path}")
    print(f"\n{len(rest) + 1} documents exported as {len(made)} file{'' if len(made) == 1 else 's'}.")


if __name__ == "__main__":
    main()
