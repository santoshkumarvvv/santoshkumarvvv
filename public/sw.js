/**
 * Service Worker (sw.js) — Offline-First App Shell & Asset Precache
 * Santosh Kumar Systems & Search Engine Engineering Portfolio
 */

const CACHE_NAME = 'santosh-systems-hub-v4';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/assets/og-image.png',
  '/assets/Santosh_Kumar_Resume.pdf',
  '/embed.js',
  '/404.html',
  '/assets/index-Bd82sn1W.js',
  '/assets/index-BOKtjCBh.css',
  '/assets/bricolage-grotesque-latin-600-normal-Bw0J83-2.woff',
  '/assets/bricolage-grotesque-latin-600-normal-nxTgbNFE.woff2',
  '/assets/bricolage-grotesque-latin-700-normal-DvJDmrLu.woff',
  '/assets/bricolage-grotesque-latin-700-normal-gtcctNPv.woff2',
  '/assets/fraunces-latin-500-normal-BTR4KCeb.woff',
  '/assets/fraunces-latin-500-normal-DnGCNyPD.woff2',
  '/assets/jetbrains-mono-latin-400-normal-6-qcROiO.woff',
  '/assets/jetbrains-mono-latin-400-normal-V6pRDFza.woff2',
  '/assets/jetbrains-mono-latin-600-normal-BfsvjouI.woff',
  '/assets/jetbrains-mono-latin-600-normal-C8RAYTDA.woff2',
  '/assets/plus-jakarta-sans-latin-400-normal-BDKaGhyp.woff',
  '/assets/plus-jakarta-sans-latin-400-normal-Dhut76fR.woff2',
  '/assets/plus-jakarta-sans-latin-600-normal-BR_Ojra4.woff',
  '/assets/plus-jakarta-sans-latin-600-normal-DLTa1BUW.woff2',
  '/assets/plus-jakarta-sans-latin-700-normal-CfpNZvy6.woff2',
  '/assets/plus-jakarta-sans-latin-700-normal-DqEcQeE5.woff'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[SW] Precache skipped for:', url, err);
          })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkRes) => {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return networkRes;
        })
        .catch(() => {
          return caches.match('/index.html').then((cached) => cached || caches.match('/'));
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
