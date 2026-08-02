"use strict";

const assert = require("assert").strict;
const theater = require("../theater-core.js");

assert.equal(theater.titleFromFilename("Dreamspeak_Final_Cut.mp4"), "Dreamspeak Final Cut");
assert.equal(theater.titleFromFilename(""), "Untitled Video");
assert.equal(theater.isCompatibleVideoFile({ name: "film.mp4", type: "" }), true);
assert.equal(theater.isCompatibleVideoFile({ name: "film.mov", type: "video/quicktime" }), false);
assert.equal(theater.videoIdentity({ name: "Film.mp4", size: 100, lastModified: 42 }), "film.mp4|100|42");
assert.equal(theater.safeYoutubeUrl("https://youtu.be/abc123"), "https://youtu.be/abc123");
assert.equal(theater.safeYoutubeUrl("https://example.com/video"), "");
assert.equal(theater.formatBytes(200 * 1024 * 1024), "200 MB");
assert.deepEqual(theater.normalizeState({
  selectedVideoId: "video-1",
  positions: { "video-1": 42.5, broken: -1, nope: "x" }
}), {
  selectedVideoId: "video-1",
  positions: { "video-1": 42.5 }
});

console.log("Theater core tests passed");
