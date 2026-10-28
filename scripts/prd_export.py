#!/usr/bin/env python3
"""Export a prd-forge document set as one Word document and one PDF.

    python3 prd_export.py <set directory> [--out <directory>] [--docx] [--pdf]

With neither --docx nor --pdf, both are written. The whole set becomes one
document: a title page, the document information, the executive summary, a table
of contents, then every section in reading order with its prose and the full
detail of every item its front matter carries.

Needs PyYAML and python-docx for the Word file, and Chromium for the PDF.
"""

import argparse, base64, html, os, re, shutil, subprocess, sys, tempfile
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
    "release-plan": 13, "glossary": 14, "change-log": 15,
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
    "backlog": [], "features": [("features", "name")], "epics": [("epics", "goal")],
    "stories": [("stories", "capability")], "spikes": [("spikes", "question")],
}

LABEL = {
    "id": "ID", "why_now": "Why now", "cost_of_inaction": "Cost of inaction",
    "end_state": "End state", "pain_points": "Pain points", "golden_thread": "Golden thread",
    "journey_stage": "Journey stage", "expected_outcome": "Expected outcome",
    "applies_to": "Applies to", "never_delegated": "Never delegated",
    "delegable_to_agent": "An agent may decide", "evidence_required": "Evidence required",
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
    """The PNG to embed for a body image link: the link's own file, or its .png twin."""
    full = os.path.join(SET_DIR, path)
    png = re.sub(r"\.svg$", ".png", full)
    return png if os.path.exists(png) else (full if os.path.exists(full) else None)


INLINE = re.compile(r"(\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|_[^_]+_)")


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
        elif piece.startswith("_") and piece.endswith("_") and len(piece) > 2:
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
        return None, [inline(v) for v in value], None
    if isinstance(value, dict):
        return None, None, [value]
    return str(value), None, None

# ----------------------------------------------------------------- HTML/PDF

CSS = """
:root{--ink:#16181d;--mute:#5c6370;--faint:#8b93a1;--rule:#d8dce3;--accent:#1f4e79;
      --chip:#eef2f7;--soft:#f7f8fa}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;color:var(--ink);font:10.5pt/1.55 "Charter","Bitstream Charter","Georgia",serif}
h1,h2,h3,h4,.ui{font-family:"Inter","Helvetica Neue",Arial,sans-serif}
p{margin:0 0 .62em}
a{color:var(--accent);text-decoration:none}
code{font-family:"DejaVu Sans Mono",monospace;font-size:.88em;background:var(--chip);
     padding:.08em .32em;border-radius:3px}

/* title page */
.cover{height:235mm;display:flex;flex-direction:column;justify-content:space-between;
       break-after:page}
.cover .top{padding-top:34mm}
.eyebrow{font-size:8.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--faint);
         font-weight:600}
.cover h1{font-size:40pt;line-height:1.05;margin:.18em 0 .1em;letter-spacing:-.02em;
          font-weight:700}
.cover .tagline{font-size:13pt;color:var(--mute);margin:0;max-width:122mm}
.cover .rule{height:3px;background:var(--accent);width:54mm;margin:8mm 0 0}
.cover dl{display:grid;grid-template-columns:30mm 1fr;gap:2.2mm 6mm;margin:0;
          border-top:1px solid var(--rule);padding-top:5mm;font-size:9.5pt}
.cover dt{color:var(--faint);font-family:"Inter",sans-serif;font-size:8pt;
          letter-spacing:.07em;text-transform:uppercase;font-weight:600}
.cover dd{margin:0}

/* sections */
section.part{break-before:page}
h1.sec{font-size:22pt;line-height:1.15;margin:.1em 0 .1em;letter-spacing:-.01em;font-weight:700}
.sechead{border-bottom:2px solid var(--ink);padding-bottom:3mm;margin-bottom:6mm}
.chips{margin-top:2.5mm;display:flex;gap:2mm;flex-wrap:wrap}
.chip{font-family:"Inter",sans-serif;font-size:7.5pt;font-weight:600;letter-spacing:.06em;
      text-transform:uppercase;background:var(--chip);color:var(--mute);
      padding:1mm 2.4mm;border-radius:10px}
.chip.warn{background:#fdecec;color:#9c2b2b}
.chip.ok{background:#e9f4ec;color:#1f6b36}

h2{font-size:13pt;margin:7mm 0 2mm;font-weight:700;break-after:avoid}
h3{font-size:11pt;margin:5mm 0 1.5mm;font-weight:600;break-after:avoid}
h4{font-size:10pt;margin:4mm 0 1mm;font-weight:600;color:var(--mute);break-after:avoid}
ul,ol{margin:.2em 0 .7em;padding-left:1.15em}
li{margin:.18em 0}
pre{font-family:"DejaVu Sans Mono","Menlo",monospace;font-size:8.6pt;line-height:1.25;
    margin:.4em 0 1em;padding:3mm 4mm;background:var(--chip);white-space:pre;break-inside:avoid}
figure.diagram{margin:.6em 0 1.2em;text-align:center;break-inside:avoid}
figure.diagram img{max-width:100%;max-height:215mm}
figure.diagram figcaption{font-family:"Inter",sans-serif;font-size:8pt;color:var(--faint);margin-top:1.5mm}
pre.wireframe{border:1px dashed var(--rule);line-height:1.02}
blockquote{margin:.4em 0 .8em;padding:2mm 0 2mm 4mm;border-left:2px solid var(--rule);
           color:var(--mute)}

table{width:100%;border-collapse:collapse;margin:.3em 0 1em;font-size:9pt}
thead{display:table-header-group}
tr{break-inside:avoid}
th{font-family:"Inter",sans-serif;font-size:7.8pt;letter-spacing:.06em;text-transform:uppercase;
   color:var(--mute);text-align:left;border-bottom:1.4px solid var(--ink);padding:1.6mm 2.4mm 1.4mm 0;
   font-weight:600;vertical-align:bottom}
td{border-bottom:.6px solid var(--rule);padding:1.6mm 2.4mm 1.6mm 0;vertical-align:top}
tr:last-child td{border-bottom:none}

/* item detail */
.items{margin-top:3mm}
.item{border-left:2.5px solid var(--accent);padding:0 0 0 4.5mm;margin:0 0 5.5mm}
.item.tight{break-inside:avoid}
.item .idline{font-family:"Inter",sans-serif;font-weight:700;font-size:10pt;margin:0 0 1mm;
     break-after:avoid}
.item dl>dt,.item dl>dd{break-inside:avoid}
.item .idline .id{color:var(--accent)}
.item dl{display:grid;grid-template-columns:34mm 1fr;gap:1.2mm 5mm;margin:0;font-size:9.3pt}
.item dt{font-family:"Inter",sans-serif;font-size:7.8pt;letter-spacing:.05em;
         text-transform:uppercase;color:var(--faint);font-weight:600;padding-top:.5mm}
.item dd{margin:0}
.item dd ul{margin:0;padding-left:1.05em}
.item .sub{margin:1.5mm 0 0 0;padding:2mm 0 0 3mm;border-top:.6px solid var(--rule)}
.item .sub .subhead{font-family:"Inter",sans-serif;font-weight:600;font-size:9pt;margin:0 0 1mm}

/* contents */
.toc{font-size:9.5pt}
.toc td:first-child{width:14mm;color:var(--faint);font-family:"Inter",sans-serif;font-weight:600}
.toc td:nth-child(3),.toc td:nth-child(4){width:20mm;font-family:"Inter",sans-serif;font-size:8.5pt;
     color:var(--mute)}
.summary dl{display:grid;grid-template-columns:28mm 1fr;gap:2.6mm 6mm;margin:0;
            background:var(--soft);padding:5mm;border-radius:4px}
.summary dt{font-family:"Inter",sans-serif;font-size:8pt;letter-spacing:.06em;
            text-transform:uppercase;color:var(--accent);font-weight:700;padding-top:.4mm}
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
            out.append(e(piece))
    return "".join(out)


def h_blocks(bs, demote=1):
    out = []
    for b in bs:
        t = b["type"]
        if t == "heading":
            lvl = min(b["level"] + demote, 4)
            out.append(f"<h{lvl}>{h_runs(b['text'])}</h{lvl}>")
        elif t == "para":
            out.append(f"<p>{h_runs(b['text'])}</p>")
        elif t == "bullets":
            out.append("<ul>" + "".join(f"<li>{h_runs(i)}</li>" for i in b["items"]) + "</ul>")
        elif t == "numbered":
            out.append("<ol>" + "".join(f"<li>{h_runs(i)}</li>" for i in b["items"]) + "</ol>")
        elif t == "quote":
            out.append(f"<blockquote>{h_runs(b['text'])}</blockquote>")
        elif t == "image":
            found = image_file(b["path"])
            if found:
                data = base64.b64encode(open(found, "rb").read()).decode()
                out.append(f'<figure class="diagram"><img src="data:image/png;base64,{data}" alt="{e(b["alt"])}">'
                           f'<figcaption>{e(b["alt"])}</figcaption></figure>')
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
            parts.append(f'<div class="sub"><p class="subhead">{h_runs(str(name))}</p><dl>{rows}</dl></div>')
        return "".join(parts)
    return ""


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
            ident = one.get("id", "")
            headline = str(one.get(head_field, "")).strip()
            # A long headline is never cut: it becomes the first field instead, so
            # the heading stays one line and nothing is lost.
            inline = len(headline) <= 90
            title = (f'<span class="id">{e(ident)}</span>'
                     + (f' · {h_runs(headline)}' if inline else '')) if ident \
                else h_runs(headline if inline else headline[:90])
            fields = [(head_field, headline)] if (not inline and ident) else []
            fields += [(k, v) for k, v in one.items()
                       if k not in ("id", head_field) and v is not None and v != []]
            rows = "".join(f"<dt>{e(label(k))}</dt><dd>{h_value(v)}</dd>" for k, v in fields)
            weight = sum(len(str(v)) for _, v in fields) + len(headline)
            klass = "item tight" if weight < 900 else "item"
            out.append(f'<div class="{klass}"><p class="idline">{title}</p><dl>{rows}</dl></div>')
    return f'<div class="items">{"".join(out)}</div>' if out else ""


def build_html(root, rest, title):
    f = root["front"]
    meta = [("Version", f.get("version")), ("Status", f.get("status")),
            ("Owner", f.get("owner")), ("Domain", f.get("domain")),
            ("Created", f.get("created")), ("Updated", f.get("updated"))]
    if f.get("golden_thread"):
        meta.append(("Golden thread", f["golden_thread"]))
    if f.get("stakeholders"):
        meta.append(("Stakeholders", "; ".join(
            s if isinstance(s, str) else s.get("role", "") for s in f["stakeholders"])))
    cover_dl = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in meta if v)

    summary = ""
    if isinstance(f.get("summary"), dict):
        rows = "".join(f"<dt>{e(label(k))}</dt><dd>{h_runs(str(v).strip())}</dd>"
                       for k, v in f["summary"].items())
        summary = f'<h2>Executive summary</h2><div class="summary"><dl>{rows}</dl></div>'

    toc = []
    for d in rest:
        df = d["front"]
        sec = df.get("section", SECTION_OF_KIND.get(df["kind"], ""))
        grade = f'{df["score"]}/100' if df.get("score") is not None else "—"
        block = f'{df["blocking"]}' if df.get("blocking") else "—"
        toc.append(f'<tr><td>{e(sec)}</td><td>{e(df.get("title",""))}</td>'
                   f'<td>{e(df.get("status",""))}</td><td>{e(grade)}</td><td>{e(block)}</td></tr>')
    toc_table = ('<h2>Contents</h2><table class="toc"><thead><tr><th>§</th><th>Section</th>'
                 '<th>Status</th><th>Grade</th><th>Blocking</th></tr></thead><tbody>'
                 + "".join(toc) + "</tbody></table>")

    body_md = re.sub(r"^#\s+.*$", "", root["body"], count=1, flags=re.M)
    parts = [f"""<section class="front">
      {summary}
      {toc_table}
      <h2>About this document</h2>
      {h_blocks(blocks(body_md), demote=2)}
    </section>"""]

    for d in rest:
        df = d["front"]
        sec = df.get("section", SECTION_OF_KIND.get(df["kind"], ""))
        chips = [f'<span class="chip">{e(df.get("status","draft"))}</span>']
        if df.get("score") is not None:
            chips.append(f'<span class="chip">{df["score"]}/100</span>')
        if df.get("blocking"):
            chips.append(f'<span class="chip warn">{df["blocking"]} blocking</span>')
        elif df.get("score") is not None:
            chips.append('<span class="chip ok">no blocking defects</span>')
        md = re.sub(r"^#\s+.*$", "", d["body"], count=1, flags=re.M)
        parts.append(f"""<section class="part">
          <div class="sechead">
            <p class="eyebrow">Section {e(sec)}</p>
            <h1 class="sec">{e(df.get("title",""))}</h1>
            <div class="chips">{"".join(chips)}</div>
          </div>
          {h_blocks(blocks(md), demote=1)}
          {h_items(df, df["kind"])}
        </section>""")

    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>{e(title)}</title><style>{CSS}</style></head><body>
<div class="cover"><div class="top">
  <p class="eyebrow">Product requirements document</p>
  <h1>{e(f.get("product", title))}</h1>
  <p class="tagline">{e(str(f.get("summary", {}).get("bet", "")).strip())}</p>
  <div class="rule"></div>
</div><dl>{cover_dl}</dl></div>
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

    st = doc.styles["Normal"]
    st.font.name, st.font.size, st.font.color.rgb = BODY_FONT, Pt(10.5), INK
    st.paragraph_format.space_after, st.paragraph_format.line_spacing = Pt(7), 1.3
    for name, size, colour in (("Heading 1", 20, INK), ("Heading 2", 13, INK),
                               ("Heading 3", 11, INK), ("Heading 4", 10, MUTE)):
        h = doc.styles[name]
        h.font.name, h.font.size, h.font.bold, h.font.color.rgb = UI_FONT, Pt(size), True, colour
        h.paragraph_format.space_before, h.paragraph_format.space_after = Pt(14 if size > 12 else 10), Pt(4)
        h.paragraph_format.keep_with_next = True

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
            r.font.name, r.font.size, r.font.bold, r.font.all_caps = UI_FONT, Pt(7.8), True, True
            r.font.color.rgb = MUTE
            border(cell._tc, "bottom", sz=12, colour="16181D")
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

    def render_blocks(bs, demote=1):
        for b in bs:
            t = b["type"]
            if t == "heading":
                para(b["text"], style=f"Heading {min(b['level'] + demote, 4)}")
            elif t == "para":
                para(b["text"])
            elif t == "bullets":
                for item in b["items"]:
                    para(item, style="List Bullet", space_after=3)
            elif t == "numbered":
                for item in b["items"]:
                    para(item, style="List Number", space_after=3)
            elif t == "quote":
                p = para(b["text"], colour=MUTE, indent=0.25)
                border(p._p, "left", sz=10)
            elif t == "table":
                md_table(b)
            elif t == "image":
                found = image_file(b["path"])
                if found:
                    doc.add_picture(found)
                    pic = doc.inline_shapes[-1]
                    # Fit the page: 6 inches wide, 8 tall, whichever binds first.
                    scale = min(1.0, Inches(6.0) / pic.width, Inches(8.0) / pic.height)
                    pic.width, pic.height = int(pic.width * scale), int(pic.height * scale)
                    doc.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
                    para(b["alt"], size=8, colour=MUTE, space_after=10).alignment = WD_ALIGN_PARAGRAPH.CENTER
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

    def field_table(pairs, label_w=1.35, shaded=False, label_colour=FAINT):
        value_w = PAGE_W - label_w - 2 * PAD * 2
        t = doc.add_table(rows=0, cols=2)
        fix_layout(t, [label_w, value_w])
        for key, value in pairs:
            if value is None or value == [] or value == "":
                continue
            row = t.add_row()
            row._tr.get_or_add_trPr().append(OxmlElement("w:cantSplit"))
            row.cells[0].width, row.cells[1].width = Inches(label_w), Inches(value_w)
            row.cells[0].paragraphs[0].paragraph_format.space_after = Pt(3)
            c0 = row.cells[0].paragraphs[0]
            c0.paragraph_format.space_after = Pt(3)
            r = c0.add_run(str(key))
            r.font.name, r.font.size, r.font.bold, r.font.all_caps = UI_FONT, Pt(7.8), True, True
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
                ident = one.get("id", "")
                headline = str(one.get(head_field, "")).strip()
                inline = len(headline) <= 90
                p = doc.add_paragraph()
                p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(11), Pt(3)
                p.paragraph_format.keep_with_next = True
                p.paragraph_format.left_indent = Inches(0.08)
                border(p._p, "left", sz=18, colour="1F4E79")
                if ident:
                    r = p.add_run(ident + ("  " if inline else ""))
                    r.font.name, r.font.size, r.font.bold, r.font.color.rgb = UI_FONT, Pt(10), True, ACCENT
                if inline or not ident:
                    r2 = p.add_run(headline)
                    r2.font.name, r2.font.size, r2.font.bold = UI_FONT, Pt(10), True
                fields = [(label(head_field), headline)] if (not inline and ident) else []
                fields += [(label(k), v) for k, v in one.items()
                           if k not in ("id", head_field) and v is not None and v != []]
                field_table(fields)

    # ---- cover
    f = root["front"]
    para("Product requirements document", caps=True, size=8.5, colour=FAINT, space_after=4)
    p = para(f.get("product", title), size=34, bold=True, font=UI_FONT, space_after=6)
    p.paragraph_format.line_spacing = 1.0
    bet = str(f.get("summary", {}).get("bet", "")).strip()
    if bet:
        para(bet, size=13, colour=MUTE, space_after=16)
    rule = doc.add_paragraph()
    rule.paragraph_format.space_after = Pt(18)
    border(rule._p, "bottom", sz=20, colour="1F4E79")
    meta = [("Version", f.get("version")), ("Status", f.get("status")), ("Owner", f.get("owner")),
            ("Domain", f.get("domain")), ("Created", f.get("created")), ("Updated", f.get("updated"))]
    if f.get("golden_thread"):
        meta.append(("Golden thread", f["golden_thread"]))
    if f.get("stakeholders"):
        meta.append(("Stakeholders", f["stakeholders"]))
    field_table([(k, v) for k, v in meta if v])

    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

    # ---- executive summary, contents, about
    if isinstance(f.get("summary"), dict):
        para("Executive summary", style="Heading 2")
        field_table([(label(k), str(v).strip()) for k, v in f["summary"].items()],
                    label_w=1.25, shaded=True, label_colour=ACCENT)

    para("Contents", style="Heading 2")
    md_table({"header": ["§", "Section", "Status", "Grade", "Blocking"],
              "rows": [[str(d["front"].get("section", SECTION_OF_KIND.get(d["front"]["kind"], ""))),
                        d["front"].get("title", ""), d["front"].get("status", ""),
                        f'{d["front"]["score"]}/100' if d["front"].get("score") is not None else "—",
                        str(d["front"]["blocking"]) if d["front"].get("blocking") else "—"]
                       for d in rest]})

    body_md = re.sub(r"^#\s+.*$", "", root["body"], count=1, flags=re.M)
    para("About this document", style="Heading 2")
    render_blocks(blocks(body_md), demote=2)

    # ---- sections
    for d in rest:
        df = d["front"]
        doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
        sec = df.get("section", SECTION_OF_KIND.get(df["kind"], ""))
        para(f"Section {sec}", caps=True, size=8.5, colour=FAINT, space_after=2)
        head = para(df.get("title", ""), style="Heading 1")
        head.paragraph_format.space_before = Pt(0)
        border(head._p, "bottom", sz=14, colour="16181D")
        bits = [df.get("status", "draft")]
        if df.get("score") is not None:
            bits.append(f'{df["score"]}/100')
        bits.append(f'{df["blocking"]} blocking defects' if df.get("blocking")
                    else ("no blocking defects" if df.get("score") is not None else ""))
        para(" · ".join(b for b in bits if b), caps=True, size=7.8,
             colour=RGBColor(0x9C, 0x2B, 0x2B) if df.get("blocking") else MUTE, space_after=12)
        render_blocks(blocks(re.sub(r"^#\s+.*$", "", d["body"], count=1, flags=re.M)), demote=1)
        render_items(df, df["kind"])

    # ---- footer with a page number
    footer = doc.sections[0].footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer.add_run()
    run.font.name, run.font.size, run.font.color.rgb = UI_FONT, Pt(8), FAINT
    for tag, attrs, text in (("w:fldChar", {"w:fldCharType": "begin"}, None),
                             ("w:instrText", {"xml:space": "preserve"}, " PAGE "),
                             ("w:fldChar", {"w:fldCharType": "end"}, None)):
        el = OxmlElement(tag)
        for k, v in attrs.items():
            el.set(qn(k), v)
        if text:
            el.text = text
        run._r.append(el)

    # Word shows these in Properties and in a file listing; python-docx's own
    # defaults ("author: python-docx") would otherwise travel with the document.
    cp = doc.core_properties
    cp.title = f'{f.get("product", title)} — product requirements document'
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
    out_dir = os.path.abspath(args.out or directory)
    os.makedirs(out_dir, exist_ok=True)
    stem = root["front"].get("slug") or os.path.basename(directory)
    title = root["front"].get("title", stem)
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
        result = subprocess.run(["node", driver, html_path, pdf_path, title],
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
