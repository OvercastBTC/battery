/* BATTERY service worker.
   Network-first with cache fallback. On every fetch the SW tries the network;
   on success it updates the cache and serves the fresh response. Only when the
   network is unreachable does it fall back to the cached copy (offline support).

   Cache name is bumped in lockstep with #ver-stamp on every release (see
   CLAUDE.md). Old caches are purged on activate. */
const CACHE = 'battery-v130';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const ks = await caches.keys();
  await Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(n => {
      if (n.ok) {
        const c = caches.open(CACHE).then(cache => {
          try { cache.put(e.request, n.clone()); } catch (x) {}
        });
      }
      return n;
    }).catch(() => caches.open(CACHE).then(c => c.match(e.request)))
  );
});
