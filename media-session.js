(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.QuietDraftMediaSession = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  function createMediaSessionController(options = {}) {
    const mediaSession = options.mediaSession;
    const MediaMetadataCtor = options.MediaMetadataCtor;
    const audio = options.audio;
    const callbacks = options.callbacks || {};
    const supported = Boolean(mediaSession && typeof mediaSession.setActionHandler === "function");
    let active = false;

    function install() {
      if (!supported) return [];
      const registered = [];
      const actions = {
        play: callbacks.play,
        pause: callbacks.pause,
        previoustrack: callbacks.previous,
        nexttrack: callbacks.next
      };

      Object.entries(actions).forEach(([action, handler]) => {
        if (typeof handler !== "function") return;
        try {
          mediaSession.setActionHandler(action, () => handler());
          registered.push(action);
        } catch (error) {
          // Media Session implementations may support only some actions.
        }
      });
      return registered;
    }

    function setMetadata(metadata) {
      active = Boolean(metadata);
      if (!supported || typeof MediaMetadataCtor !== "function" || !metadata) {
        syncPlaybackState();
        return false;
      }
      try {
        mediaSession.metadata = new MediaMetadataCtor({
          title: metadata.title || "Untitled Track",
          artist: metadata.artist || "",
          album: metadata.album || "",
          artwork: Array.isArray(metadata.artwork) ? metadata.artwork : []
        });
        syncPlaybackState();
        return true;
      } catch (error) {
        syncPlaybackState();
        return false;
      }
    }

    function clear() {
      active = false;
      if (!supported) return;
      try {
        mediaSession.metadata = null;
      } catch (error) {
        // Clearing metadata is optional when an implementation rejects it.
      }
      syncPlaybackState();
    }

    function syncPlaybackState() {
      if (!supported || !("playbackState" in mediaSession)) return;
      try {
        mediaSession.playbackState = active ? (audio && audio.paused ? "paused" : "playing") : "none";
      } catch (error) {
        // Playback continues normally if system state cannot be published.
      }
    }

    function syncPosition() {
      if (!supported || !active || typeof mediaSession.setPositionState !== "function" || !audio) return;
      const duration = Number(audio.duration);
      if (!Number.isFinite(duration) || duration <= 0) return;
      const position = Math.min(duration, Math.max(0, Number(audio.currentTime) || 0));
      const playbackRate = Number.isFinite(audio.playbackRate) && audio.playbackRate > 0 ? audio.playbackRate : 1;
      try {
        mediaSession.setPositionState({ duration, position, playbackRate });
      } catch (error) {
        // Position publishing is optional and varies by browser.
      }
    }

    return { supported, install, setMetadata, clear, syncPlaybackState, syncPosition };
  }

  return { createMediaSessionController };
});
