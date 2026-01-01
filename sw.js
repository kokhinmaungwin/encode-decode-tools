const VERSION = 'v1::20261201';
const CACHE_NAME = VERSION;
const OFFLINE_URL = './';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icons/icon-192.png',
        './icons/icon-512.png',
      ]);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      const resClone = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, resClone).catch(() => {});
      });
      return response;
    }).catch(() => caches.match(event.request).then(r => r || caches.match(OFFLINE_URL)))
  );
});
