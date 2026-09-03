/* BATTERY service worker.
   Registered from a real URL (this file), NOT a blob: URL. Browsers reject
   blob: as a service-worker script origin, which is why this never actually
   registered from 26.06 through .116 -- the register() call and its promise
   were both wrapped in silent catches, so the failure was invisible: no
   offline capability shipped despite the app advertising it, and every
   release bumped a cache version nothing ever read.

   Cache name is bumped in lockstep with #ver-stamp on every release (see
   CLAUDE.md), same discipline as the icon files -- this is a real file, not
   a template literal computed at runtime, so the string below must be
   edited by hand or script on each deploy. */
const CACHE = 'battery-v117';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const ks = await caches.keys();
  await Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(c =>
      c.match(e.request).then(r =>
        r || fetch(e.request).then(n => {
          try { c.put(e.request, n.clone()); } catch (x) {}
          return n;
        }).catch(() => r)
      )
    )
  );
});
