const cacheName = 'v1';
const cacheFiles = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/images/logo.ico',
  '/assets/images/logo.ico'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
