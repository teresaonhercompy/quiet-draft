#!/usr/bin/env python3
"""Export the private Dreamspeak chunk index to a device-importable JSON file."""

import argparse
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a private read-only canon archive.")
    parser.add_argument("--database", required=True, type=Path, help="Source SQLite database")
    parser.add_argument("--output", required=True, type=Path, help="Destination .dreamspeak-canon.json file")
    parser.add_argument("--title", default="Dreamspeak Canon", help="Archive title shown in the app")
    args = parser.parse_args()

    if not args.database.is_file():
      parser.error("the source database does not exist")

    with sqlite3.connect(f"file:{args.database}?mode=ro", uri=True) as connection:
        columns = {row[1] for row in connection.execute("PRAGMA table_info(chunks)")}
        required = {"chunk_number", "chapter_title", "text"}
        if not required.issubset(columns):
            parser.error("the chunks table does not have the required columns")
        rows = connection.execute(
            "SELECT chunk_number, chapter_title, text FROM chunks ORDER BY chunk_number"
        ).fetchall()

    chunks = []
    seen = set()
    for number, title, text in rows:
        if not isinstance(number, int) or number < 1 or number in seen or not isinstance(text, str) or not text.strip():
            parser.error("the chunks table contains invalid rows")
        seen.add(number)
        chunks.append({"chunkNumber": number, "title": title or None, "text": text})

    package = {
        "schemaVersion": 1,
        "archiveTitle": args.title.strip() or "Dreamspeak Canon",
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "chunkCount": len(chunks),
        "chunks": chunks,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(package, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Exported {len(chunks)} chunks to {args.output}")


if __name__ == "__main__":
    main()
