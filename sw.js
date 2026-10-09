/* Offline support. Pages are fetched from the network first, so an update
   shows up on the next load as before; the copy kept here is used only
   when there is no connection. On install it stores the page, the files
   the page loads (with the ?v= stamps the deploy adds), the barcode
   reader and the icons.

   The deploy replaces "dev" in the cache name with the commit, so each
   deploy installs a fresh cache and deletes the last one. */
const CACHE = 'implant-selector-dev';

self.addEventListener('install', event=>{
  event.waitUntil((async ()=>{
    const cache = await caches.open(CACHE);
    const res = await fetch('./', {cache:'no-store'});
    const html = await res.clone().text();
    await cache.put('./', res);
    const srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
    await cache.addAll([...srcs, 'manifest.webmanifest', 'icons/icon-192.png', 'icons/apple-touch-icon.png',
      'vendor/zxing-wasm-3.1.5/zxing-reader.js', 'vendor/zxing-wasm-3.1.5/zxing_reader.wasm']);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event=>{
  event.waitUntil((async ()=>{
    for(const key of await caches.keys()) if(key!==CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event=>{
  const req = event.request;
  if(req.method!=='GET' || new URL(req.url).origin!==location.origin) return;
  event.respondWith((async ()=>{
    const cache = await caches.open(CACHE);
    try{
      const res = await fetch(req);
      if(res.ok){
        await cache.put(req.mode==='navigate' ? './' : req, res.clone());
        // Drop copies of the same file from earlier deploys (other ?v= stamps).
        const url = new URL(req.url);
        if(url.search) for(const k of await cache.keys()){
          const ku = new URL(k.url);
          if(ku.pathname===url.pathname && ku.search!==url.search) await cache.delete(k);
        }
      }
      return res;
    }catch(e){
      const hit = await cache.match(req.mode==='navigate' ? './' : req);
      if(hit) return hit;
      throw e;
    }
  })());
});
