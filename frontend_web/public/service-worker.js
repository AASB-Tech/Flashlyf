const cacheName = 'v1'

// // Caching assets for offline use
// const cacheClone = async (e) => {
//     const res = await fetch(e.request);
//     const resClone = res.clone();

//     const cache = await caches.open(cacheName);
//     await cache.put(e.request, resClone);
//     return res;
// };

// const installEvent = () => {
//     self.addEventListener('install', () => {
//         console.log('service worker installed');
//     });
// };
// installEvent();

// const activateEvent = () => {
//     self.addEventListener('activate', () => {
//         console.log('service worker activated');
//     });
// };
// activateEvent();

// // Fetch and cache pages
// const fetchEvent = () => {
//     self.addEventListener('fetch', (e) => {
//         e.respondWith(
//         cacheClone(e)
//             .catch(() => caches.match(e.request))
//             .then((res) => res)
//         );
//     });
// };
// fetchEvent();

// // Push notifications
// self.addEventListener('push', (event) => {
//     const data = event.data.json();
//     const title = data.title;
//     const body = data.message;
//     const icon = 'some-icon.png';
//     const notificationOptions = {
//         body: body,
//         tag: 'simple-push-notification-example',
//         icon: icon
//     };

//     return self.Notification.requestPermission().then((permission) => {
//         if (permission === 'granted') 
//         {
//             return new self.Notification(title, notificationOptions);
//         }
//     });
// });
