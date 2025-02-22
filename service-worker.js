importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Workbox.routing.registerRoute(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.NetworkFirst()
// )

if(workbox){
    workbox.routing.registerRoute(
        ({request}) => request.destination === 'image',
        // new workbox.strategies.NetworkFirst()
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 50, // Limit the number of cached images
                    maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
                }),
            ],
        })
    );

    workbox.setConfig({debug:true});
}else{
    alert('workbox failed to load')
}

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    clients.claim();
});

