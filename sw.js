const CACHE_NAME = '20y-v11110-fresh';
const urlsToCache = [
  '/20y-pulse-v11110/',
  '/20y-pulse-v11110/index.html',
  '/20y-pulse-v11110/manifest.json',
  '/20y-pulse-v11110/icon-192.png',
  '/20y-pulse-v11110/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});