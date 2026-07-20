"use strict";

const assert = require("assert").strict;
const canon = require("../canon-core.js");

const archive = canon.validatePackage({
  schemaVersion: 1,
  archiveTitle: "Synthetic Canon",
  generatedAt: "2026-07-19T12:00:00Z",
  chunkCount: 3,
  chunks: [
    { chunkNumber: 9, title: "Third", text: "A violet signal returns." },
    { chunkNumber: 2, title: "First", text: "The quiet room holds a signal." },
    { chunkNumber: 5, title: "Second Signal", text: "A quiet room opens." }
  ]
});

assert.deepEqual(archive.chunks.map((chunk) => chunk.chunkNumber), [2, 5, 9]);
assert.deepEqual(canon.parseQuery('quiet "room opens" quiet'), ["quiet", "room opens"]);
assert.deepEqual(canon.search(archive.chunks, "signal").results.map((chunk) => chunk.chunkNumber), [2, 5, 9]);
assert.deepEqual(canon.search(archive.chunks, '"quiet room"').results.map((chunk) => chunk.chunkNumber), [2, 5]);
assert.throws(() => canon.validatePackage({ ...archive, chunkCount: 2 }), /count/);
assert.throws(() => canon.validatePackage({ ...archive, chunks: [archive.chunks[0], archive.chunks[0]], chunkCount: 2 }), /unique/);

console.log("Canon core tests passed");
