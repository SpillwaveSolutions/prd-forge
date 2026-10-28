#!/usr/bin/env python3
"""Read the comments reviewers left in an exported Word copy of a set.

    uv run --with python-docx --with pyyaml python3 prd_comments.py <set directory> <reviewed.docx>

Prints JSON: one entry per comment, in document order, with the id it is
anchored to, the text it marks, its author, date, and text, and its replies.
prd_export.py marks each section heading and each item with a bookmark named
by its id. A comment belongs to the nearest bookmark before the place it
starts. The set directory gives the ids, so each bookmark name maps back.

It writes nothing. The /prd-comments command adds the comments to the set.
"""

import json
import os
import sys
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prd_export import bookmark_name, read_set  # noqa: E402

try:
    import docx
    from docx.oxml.ns import qn
except ImportError:
    sys.exit("prd_comments: python-docx is required (uv run --with python-docx ...)")

W14 = "http://schemas.microsoft.com/office/word/2010/wordml"
W15 = "http://schemas.microsoft.com/office/word/2012/wordml"


def ids_in(value, out):
    """Every id in a document's front matter, at any depth."""
    if isinstance(value, list):
        for one in value:
            ids_in(one, out)
    elif isinstance(value, dict):
        if isinstance(value.get("id"), str):
            out.append(value["id"])
        for key, one in value.items():
            if key != "links":
                ids_in(one, out)
    return out


def parents_of(path):
    """Each reply's parent, by the paraId of the comments' last paragraphs (commentsExtended.xml)."""
    with zipfile.ZipFile(path) as z:
        if "word/commentsExtended.xml" not in z.namelist():
            return {}
        from lxml import etree
        root = etree.fromstring(z.read("word/commentsExtended.xml"))
    return {ex.get(f"{{{W15}}}paraId"): ex.get(f"{{{W15}}}paraIdParent")
            for ex in root.iter(f"{{{W15}}}commentEx") if ex.get(f"{{{W15}}}paraIdParent")}


def read_comments(set_dir, path):
    root, rest = read_set(set_dir)
    names = {}
    for d in [root, *rest]:
        for ident in ids_in(d["front"], []):
            names.setdefault(bookmark_name(ident), ident)

    document = docx.Document(path)
    anchors, quotes, open_ranges = {}, {}, set()
    current = None
    for el in document.element.body.iter():
        tag = el.tag
        if tag == qn("w:bookmarkStart"):
            current = names.get(el.get(qn("w:name")), current)
        elif tag == qn("w:commentRangeStart"):
            cid = el.get(qn("w:id"))
            anchors[cid] = current
            quotes[cid] = []
            open_ranges.add(cid)
        elif tag == qn("w:commentRangeEnd"):
            open_ranges.discard(el.get(qn("w:id")))
        elif tag == qn("w:t") and el.text:
            for cid in open_ranges:
                quotes[cid].append(el.text)

    parents = parents_of(path)
    para_of, by_id = {}, {}
    for c in document.comments:
        last = c.paragraphs
        pid = last[-1]._p.get(f"{{{W14}}}paraId") if last else None
        cid = str(c.comment_id)
        if pid:
            para_of[pid] = cid
        by_id[cid] = {
            "source": f"{os.path.basename(path)}#{cid}",
            "about": anchors.get(cid),
            "quote": " ".join("".join(quotes.get(cid, [])).split()),
            "reviewer": c.author or c.initials or "unknown",
            "date": c.timestamp.date().isoformat() if c.timestamp else None,
            "comment": c.text.strip(),
            "replies": [],
        }
    top = []
    for c in document.comments:
        cid = str(c.comment_id)
        last = c.paragraphs
        pid = last[-1]._p.get(f"{{{W14}}}paraId") if last else None
        parent = para_of.get(parents[pid]) if pid in parents else None
        entry = by_id[cid]
        if parent is not None and parent in by_id:
            by_id[parent]["replies"].append({k: entry[k] for k in ("reviewer", "date", "comment")})
        else:
            top.append(entry)
    order = {cid: n for n, cid in enumerate(anchors)}
    top.sort(key=lambda e: order.get(e["source"].rsplit("#", 1)[1], len(order)))
    return top


def main(argv):
    if len(argv) != 2:
        sys.exit("usage: prd_comments.py <set directory> <reviewed.docx>")
    print(json.dumps(read_comments(argv[0], argv[1]), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1:])
