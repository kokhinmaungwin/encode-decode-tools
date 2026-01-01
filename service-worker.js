const CACHE_NAME = "encoder-pwa-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>{
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(
        keys.map(k=>{
          if(k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp=>{
      return resp || fetch(event.request);
    })
  );
});
