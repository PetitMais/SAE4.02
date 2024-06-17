function main () {
    const permission = document.getElementById('push_permission');
    if (
        (!permission &&
        !('Notification' in window) &&
        !('serviceWorker' in navigator)) 
        // || (Notification.permission !== 'default')
    ) {
        return;
    }
    const button = document.createElement('button')
    button.innerText = 'Recevoir les notifications'
    permission.appendChild(button)
    button.addEventListener('click', askPermission)
}

async function askPermission () {
    const permission = await Notification.requestPermission();
    if (permission == 'granted') {
        registerServiceWorker()
    }
    console.log(permission)
}

async function registerServiceWorker () {
    const registration = await navigator.serviceWorker.register('/sw.js')
    const subscription = await registration.pushManager.getSubscription();
    console.log(subscription)
}

navigator.serviceWorker.ready.then((reg) => {
    reg.pushManager.getSubscription().then((subscription) => {
      const options = subscription.options;
      console.log(options.applicationServerKey); // the public key
    });
  });

main()