const PREFIX = 'V2';

self.addEventListener('install', () => {
  console.log(`${PREFIX} Install`)
})

self.addEventListener('activate', () => {
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