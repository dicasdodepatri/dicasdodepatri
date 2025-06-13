const CACHE_NAME = 'dicas-do-depatri-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/logo-Cd8fcdgV.svg',
  '/assets/logo-180x180.png',
  '/assets/logo-192x192.png',
  '/assets/logo-512x512.png',
  '/assets/index-wGlIDkuX.js',
  '/assets/index-BNxLfcmu.css',
  '/styles.css',
  'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
  'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=keyboard_backspace'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
