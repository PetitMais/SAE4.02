const PREFIX = 'V4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      cache.add(new Request("/offline.html"));
    })
  )
  console.log(`${PREFIX} Install`)
})

self.addEventListener('activate', () => {
  clients.claims();
  console.log(`${PREFIX} Active`)
})

self.addEventListener('fetch', (event) => {
  console.log(`${PREFIX} Fetching : ${event.request.url}, Mode : ${event.request.mode}`);
  
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse
          if (preloadResponse){
            return preloadResponse
          }
          return await fetch(event.request)
        } catch(e){
          return new Response('Bonjour les gens')
        }
        
      })()
    );
  }
});