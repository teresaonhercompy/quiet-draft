(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.QuietDraftCanon = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const SCHEMA_VERSION = 1;
  const MAX_CHUNKS = 50000;
  const MAX_TEXT_LENGTH = 250000;
  const MAX_TITLE_LENGTH = 500;

  function normalized(value) {
    return String(value || "").toLocaleLowerCase();
  }

  function validatePackage(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("This is not a canon archive.");
    if (value.schemaVersion !== SCHEMA_VERSION) throw new Error("This canon archive uses an unsupported version.");
    if (!Array.isArray(value.chunks) || value.chunks.length > MAX_CHUNKS) throw new Error("The canon archive has an invalid chunk list.");
    if (typeof value.archiveTitle !== "string" || !value.archiveTitle.trim() || value.archiveTitle.length > 200) throw new Error("The canon archive title is invalid.");
    if (typeof value.generatedAt !== "string" || !Number.isFinite(Date.parse(value.generatedAt))) throw new Error("The canon archive date is invalid.");
    if (value.chunkCount !== value.chunks.length) throw new Error("The canon archive count does not match its contents.");

    const chunks = [];
    const seen = new Set();
    for (const item of value.chunks) {
      if (!item || typeof item !== "object") throw new Error("The canon archive contains an invalid chunk.");
      const chunkNumber = item.chunkNumber;
      if (!Number.isSafeInteger(chunkNumber) || chunkNumber < 1 || seen.has(chunkNumber)) throw new Error("Canon chunk numbers must be unique positive integers.");
      if (item.title !== null && item.title !== undefined && (typeof item.title !== "string" || item.title.length > MAX_TITLE_LENGTH)) throw new Error("A canon title is invalid.");
      if (typeof item.text !== "string" || !item.text.trim() || item.text.length > MAX_TEXT_LENGTH) throw new Error("A canon passage is invalid.");
      seen.add(chunkNumber);
      chunks.push({ chunkNumber, title: item.title ? item.title.trim() : null, text: item.text });
    }
    chunks.sort((a, b) => a.chunkNumber - b.chunkNumber);
    return {
      schemaVersion: SCHEMA_VERSION,
      archiveTitle: value.archiveTitle.trim(),
      generatedAt: new Date(value.generatedAt).toISOString(),
      chunkCount: chunks.length,
      chunks
    };
  }

  function parseQuery(query) {
    const terms = [];
    const pattern = /"([^"]+)"|(\S+)/g;
    let match;
    while ((match = pattern.exec(String(query || "")))) {
      const value = normalized(match[1] || match[2]).trim();
      if (value && !terms.includes(value)) terms.push(value);
    }
    return terms.slice(0, 12);
  }

  function matchingIndex(chunk, terms) {
    const text = normalized(chunk.text);
    const title = normalized(chunk.title);
    if (!terms.length || !terms.every((term) => text.includes(term) || title.includes(term))) return -1;
    const positions = terms.map((term) => text.indexOf(term)).filter((index) => index >= 0);
    return positions.length ? Math.min(...positions) : 0;
  }

  function makeSnippet(text, matchIndex, radius = 150) {
    const source = String(text || "").replace(/\s+/g, " ").trim();
    if (!source) return "";
    const start = Math.max(0, matchIndex - radius);
    const end = Math.min(source.length, matchIndex + radius);
    return `${start ? "…" : ""}${source.slice(start, end).trim()}${end < source.length ? "…" : ""}`;
  }

  function search(chunks, query, limit = 50) {
    const terms = parseQuery(query);
    if (!terms.length) return { terms, results: [], total: 0 };
    const matches = [];
    for (const chunk of chunks) {
      const index = matchingIndex(chunk, terms);
      if (index >= 0) matches.push({ ...chunk, snippet: makeSnippet(chunk.text, index) });
    }
    matches.sort((a, b) => a.chunkNumber - b.chunkNumber);
    return { terms, total: matches.length, results: matches.slice(0, Math.max(1, limit)) };
  }

  return { SCHEMA_VERSION, validatePackage, parseQuery, search };
});
