const VERSION = "20260719-3";
const CACHE_NAME = `quiet-draft-${VERSION}`;
const APP_SHELL = [
  "./",
  `./index.html?v=${VERSION}`,
  `./styles.css?v=${VERSION}`,
  `./app.js?v=${VERSION}`,
  `./manifest.webmanifest?v=${VERSION}`,
  `./icon.svg?v=${VERSION}`,
  "./data/facts.json",
  "./data/encouragement.json",
  "./data/gallery.json",
  "./data/albums.json",
  "./backgrounds/forest-desk.jpg",
  "./backgrounds/night-sky.jpg",
  "./backgrounds/rainy-window.jpg",
  "./backgrounds/warm-paper.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === "navigate") {
          const shell = await caches.match(`./index.html?v=${VERSION}`);
          return shell || caches.match("./");
        }
        return new Response("Offline", { status: 503, statusText: "Offline" });
      })
  );
});
