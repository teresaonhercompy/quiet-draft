(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.QuietDraftTheater = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const YOUTUBE_HOSTS = new Set([
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "music.youtube.com",
    "youtu.be",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com"
  ]);

  function titleFromFilename(filename) {
    return String(filename || "")
      .replace(/\.[^.]+$/, "")
      .replace(/[_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Untitled Video";
  }

  function isCompatibleVideoFile(file) {
    if (!file || typeof file.name !== "string") return false;
    const type = String(file.type || "").toLowerCase();
    return type === "video/mp4" || /\.mp4$/i.test(file.name);
  }

  function videoIdentity(file) {
    return [
      String(file && file.name || "").toLocaleLowerCase(),
      Number(file && file.size) || 0,
      Number(file && file.lastModified) || 0
    ].join("|");
  }

  function safeYoutubeUrl(value) {
    try {
      const url = new URL(String(value || "").trim());
      return url.protocol === "https:" && YOUTUBE_HOSTS.has(url.hostname.toLowerCase()) ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function formatBytes(bytes) {
    const value = Number(bytes);
    if (!Number.isFinite(value) || value <= 0) return "0 bytes";
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    const index = Math.min(units.length - 1, Math.floor(Math.log(value) / Math.log(1024)));
    const amount = value / (1024 ** index);
    const digits = index === 0 || amount >= 100 ? 0 : amount >= 10 ? 1 : 2;
    return `${amount.toFixed(digits)} ${units[index]}`;
  }

  function normalizeState(value) {
    const source = value && typeof value === "object" ? value : {};
    const positions = {};
    if (source.positions && typeof source.positions === "object") {
      Object.entries(source.positions).slice(0, 1000).forEach(([id, position]) => {
        const seconds = Number(position);
        if (id && Number.isFinite(seconds) && seconds >= 0) positions[id] = seconds;
      });
    }
    return {
      selectedVideoId: typeof source.selectedVideoId === "string" ? source.selectedVideoId : "",
      positions
    };
  }

  return {
    formatBytes,
    isCompatibleVideoFile,
    normalizeState,
    safeYoutubeUrl,
    titleFromFilename,
    videoIdentity
  };
});
