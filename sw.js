const BASE = location.protocol + "//" + location.host;
const PREFIX = 'V2';
const CACHED_FILES = [
  `${BASE}/css/style.css`,
  `${BASE}/js/main.js`,
];
const LAZY_CACHE = [`${BASE}/js/main.js`];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      await Promise.all(
        [...CACHED_FILES, "/offline.html"].map((path) => {
          return cache.add(new Request(path));
        })
      );
    })()
  );
  console.log(`${PREFIX} Install`)
});

self.addEventListener('activate', (event) => {
  clients.claim();
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.includes(PREFIX)) {
            return caches.delete(key);
          }
        })
      );
    })()
  );
  console.log(`${PREFIX} Active`)
});

self.addEventListener('fetch', (event) => {
  console.log(`${PREFIX} Fetching : ${event.request.url}, Mode : ${event.request.mode}`);
  
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse){
            return preloadResponse;
          }
          return await fetch(event.request);
        } catch(e){
          const cache = await caches.open(PREFIX);
          return await cache.match("/offline.html");
        }
        
      })()
    );
  } else if(CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  } else if(LAZY_CACHE.includes(event.request.url)) {
    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open(PREFIX);
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse){
            cache.put(event.request, preloadResponse.clone())
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch(e){
          return await caches.match(event.request);
        }
        
      })()
    );
  } 
});

//Notif push
const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const saveSubscription = async (subscription) => {
  const response = await fetch('http://localhost:3000/save-subscription', {
      method: 'post',
      headers: { 'Content-type': "application/json" },
      body: JSON.stringify(subscription)
  })

  return response.json()
}

self.addEventListener("activate", async (event) => {
  const subscription = await self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BBesPLMl_D2QE8Hlojk7RF8sK53ECyRUpXK5B4JpV_qDIgWGT9x-7HMkMi7FHr1HRTeLSSTx6GlWKQV36e23RP4")
  })
  const response = await saveSubscription(subscription)
  console.log(response)
});

self.addEventListener("push", event => {
  self.registration.showNotification("Wohoo!!", { body: event.data.text() })
})

self.addEventListener("notificationclick", event => {
  event.notification.close()
  event.waitUntil(
    openUrl('https://choixpipo.netlify.app/')
  )
})

async function openUrl (url) {
  const windowClients = await self.clients.matchAll({type: 'window',
    includeUncontrolled : true
  })
  for (let i = 0; i < windowClients.length; i++){
    const client = windowClients[i]
    if (client.url == url && 'focus' in client) {
      return client.focus()
    }
  }
  if (self.clients.openWindow) {
    return self.clients.openWindow('https://choixpipo.netlify.app/')
  }
  return null
}
// Public Key:
// BBesPLMl_D2QE8Hlojk7RF8sK53ECyRUpXK5B4JpV_qDIgWGT9x-7HMkMi7FHr1HRTeLSSTx6GlWKQV36e23RP4

// Private Key:
// 5c2NKOlBBvxOEWYgrweHbyxc6E93TGaVkBPw5wruzGk