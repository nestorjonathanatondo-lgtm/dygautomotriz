const CACHE = 'dg-taller-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './dg_app_icon_round_vino_192.png',
  './dg_app_icon_round_vino_512.png',
  './dg_logo_transparent.png',
  './dg_favicon_48.png',
  './dg_favicon_180.png',
  './dg_favicon_512.png',
  './android-chrome-192.png',
  './android-chrome-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((network) => {
          if (network.ok && e.request.method === 'GET') {
            caches.open(CACHE).then((cache) => cache.put(e.request, network.clone()));
          }
          return network;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
