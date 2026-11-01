// Santosh Kumar Systems Portfolio — Service Worker (PWA Offline Engine)
const CACHE_VERSION = "v2";

const PRECACHE_ASSETS = [
  "/index.html",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/og-image.png",
  "/assets/og-image.png",
  // Current JS & CSS bundles in /assets/
  "/assets/index-jNh6mCX3.js",
  "/assets/index-BXBCtKZk.css",
  // All 54 verified self-hosted @fontsource font files in /assets/
  "/assets/bricolage-grotesque-latin-600-normal-Bw0J83-2.woff",
  "/assets/bricolage-grotesque-latin-600-normal-nxTgbNFE.woff2",
  "/assets/bricolage-grotesque-latin-700-normal-DvJDmrLu.woff",
  "/assets/bricolage-grotesque-latin-700-normal-gtcctNPv.woff2",
  "/assets/bricolage-grotesque-latin-ext-600-normal-CN5JKkBm.woff2",
  "/assets/bricolage-grotesque-latin-ext-600-normal-DF26P3Q7.woff",
  "/assets/bricolage-grotesque-latin-ext-700-normal-BXpPFNFj.woff",
  "/assets/bricolage-grotesque-latin-ext-700-normal-fBkt-7fi.woff2",
  "/assets/bricolage-grotesque-vietnamese-600-normal-BppAn7jL.woff",
  "/assets/bricolage-grotesque-vietnamese-600-normal-Ipewt4hn.woff2",
  "/assets/bricolage-grotesque-vietnamese-700-normal-BLYPkJbo.woff2",
  "/assets/bricolage-grotesque-vietnamese-700-normal-CHrFuVHU.woff",
  "/assets/fraunces-latin-500-normal-BTR4KCeb.woff",
  "/assets/fraunces-latin-500-normal-DnGCNyPD.woff2",
  "/assets/fraunces-latin-ext-500-normal-BMcFk1Xs.woff",
  "/assets/fraunces-latin-ext-500-normal-Z5DV8IzT.woff2",
  "/assets/fraunces-vietnamese-500-normal-B-KbxExq.woff",
  "/assets/fraunces-vietnamese-500-normal-GOH_-EGq.woff2",
  "/assets/jetbrains-mono-cyrillic-400-normal-BEIGL1Tu.woff2",
  "/assets/jetbrains-mono-cyrillic-400-normal-ugxPyKxw.woff",
  "/assets/jetbrains-mono-cyrillic-600-normal-8K4wrrwR.woff",
  "/assets/jetbrains-mono-cyrillic-600-normal-EVf6-Yzo.woff2",
  "/assets/jetbrains-mono-greek-400-normal-B9oWc5Lo.woff",
  "/assets/jetbrains-mono-greek-400-normal-C190GLew.woff2",
  "/assets/jetbrains-mono-greek-600-normal-H7WoG9Et.woff2",
  "/assets/jetbrains-mono-greek-600-normal-mc2nkWzM.woff",
  "/assets/jetbrains-mono-latin-400-normal-6-qcROiO.woff",
  "/assets/jetbrains-mono-latin-400-normal-V6pRDFza.woff2",
  "/assets/jetbrains-mono-latin-600-normal-BfsvjouI.woff",
  "/assets/jetbrains-mono-latin-600-normal-C8RAYTDA.woff2",
  "/assets/jetbrains-mono-latin-ext-400-normal-Bc8Ftmh3.woff2",
  "/assets/jetbrains-mono-latin-ext-400-normal-fXTG6kC5.woff",
  "/assets/jetbrains-mono-latin-ext-600-normal-BfB_LPfz.woff2",
  "/assets/jetbrains-mono-latin-ext-600-normal-DObL3zCW.woff",
  "/assets/jetbrains-mono-vietnamese-400-normal-CqNFfHCs.woff",
  "/assets/jetbrains-mono-vietnamese-600-normal-OWROknRo.woff",
  "/assets/plus-jakarta-sans-latin-400-normal-BDKaGhyp.woff",
  "/assets/plus-jakarta-sans-latin-400-normal-Dhut76fR.woff2",
  "/assets/plus-jakarta-sans-latin-600-normal-BR_Ojra4.woff",
  "/assets/plus-jakarta-sans-latin-600-normal-DLTa1BUW.woff2",
  "/assets/plus-jakarta-sans-latin-700-normal-CfpNZvy6.woff2",
  "/assets/plus-jakarta-sans-latin-700-normal-DqEcQeE5.woff",
  "/assets/plus-jakarta-sans-latin-ext-400-normal-2ppkqaOR.woff",
  "/assets/plus-jakarta-sans-latin-ext-400-normal-D127hM_v.woff2",
  "/assets/plus-jakarta-sans-latin-ext-600-normal-B0WRRYJ1.woff",
  "/assets/plus-jakarta-sans-latin-ext-600-normal-DQgPU_Cg.woff2",
  "/assets/plus-jakarta-sans-latin-ext-700-normal-8-d-IyIQ.woff",
  "/assets/plus-jakarta-sans-latin-ext-700-normal-BajbvANd.woff2",
  "/assets/plus-jakarta-sans-vietnamese-400-normal-B8TCSmUq.woff",
  "/assets/plus-jakarta-sans-vietnamese-400-normal-Cg2kxhWu.woff2",
  "/assets/plus-jakarta-sans-vietnamese-600-normal-5YsyKbU1.woff",
  "/assets/plus-jakarta-sans-vietnamese-600-normal-Y4VTTRme.woff2",
  "/assets/plus-jakarta-sans-vietnamese-700-normal-BCh_uG_5.woff",
  "/assets/plus-jakarta-sans-vietnamese-700-normal-CV6qDkkj.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_VERSION) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests and non-HTTP protocols
  if (req.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Handle cross-origin requests with network-first
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Network-first strategy for HTML documents
  if (
    req.mode === "navigate" ||
    (req.headers.get("accept") && req.headers.get("accept").includes("text/html")) ||
    url.pathname === "/" ||
    url.pathname.endsWith(".html")
  ) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          return caches.match("/index.html");
        })
    );
    return;
  }

  // Cache-first strategy for fonts, images, and static assets
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".pdf")
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((networkRes) => {
            if (networkRes.status === 200) {
              const clone = networkRes.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
            }
            return networkRes;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // Default network-first fallback
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});

