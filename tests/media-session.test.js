"use strict";

const assert = require("assert").strict;
const { createMediaSessionController } = require("../media-session.js");

const handlers = {};
const positions = [];
const mediaSession = {
  metadata: null,
  playbackState: "none",
  setActionHandler(action, handler) {
    if (action === "previoustrack") throw new Error("unsupported");
    handlers[action] = handler;
  },
  setPositionState(state) {
    positions.push(state);
  }
};
class FakeMetadata {
  constructor(value) {
    Object.assign(this, value);
  }
}
const audio = { paused: true, duration: 180, currentTime: 24, playbackRate: 1 };
const calls = [];
const controller = createMediaSessionController({
  mediaSession,
  MediaMetadataCtor: FakeMetadata,
  audio,
  callbacks: {
    play: () => calls.push("play"),
    pause: () => calls.push("pause"),
    previous: () => calls.push("previous"),
    next: () => calls.push("next")
  }
});

assert.equal(controller.supported, true);
assert.deepEqual(controller.install(), ["play", "pause", "nexttrack"]);
handlers.play();
handlers.pause();
handlers.nexttrack();
assert.deepEqual(calls, ["play", "pause", "next"]);

assert.equal(controller.setMetadata({
  title: "Synthetic Track",
  artist: "Synthetic Artist",
  album: "Synthetic Album",
  artwork: [{ src: "icon.svg", type: "image/svg+xml" }]
}), true);
assert.equal(mediaSession.metadata.title, "Synthetic Track");
assert.equal(mediaSession.playbackState, "paused");

audio.paused = false;
controller.syncPlaybackState();
assert.equal(mediaSession.playbackState, "playing");
controller.syncPosition();
assert.deepEqual(positions[0], { duration: 180, position: 24, playbackRate: 1 });

controller.clear();
assert.equal(mediaSession.metadata, null);
assert.equal(mediaSession.playbackState, "none");

const unsupported = createMediaSessionController({});
assert.equal(unsupported.supported, false);
assert.deepEqual(unsupported.install(), []);

console.log("Media Session tests passed");
