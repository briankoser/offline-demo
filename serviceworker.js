const version = 'V0.01';
const staticCacheName = 'JohnnyCache' + version;

addEventListener('install', e => {
    const request = e.request;
    console.log('The service worker is installing');
    console.log(request);

    // New service worker takes control immediately
    skipWaiting();
    e.waitUntil(
        caches.open(staticCacheName)
            .then(staticCache => {
                // "nice to have" cache, failure will not prevent service worker from installing
                staticCache.addAll([
                    '/fonts/font.woff2',
                    '/img/icon.svg'
                ]);

                // if any urls are bad, nothing will be cached because it will return false: these are "must have"
                return staticCache.addAll([
                    '/css/styles.css',
                    '/js/scripts.js'
                ]);
            })
    );
});

addEventListener('activate', e => {
    const request = e.request;
    console.log('The service worker is activating');
    console.log(request);
    
    e.waitUntil(
        caches.keys()
        // delete old caches
        .then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName != staticCacheName) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
        // make all clients use new service worker
        .then( () => {
            return clients.claim();
        })
    )
});

addEventListener('fetch', e => {
    const request = e.request;
    console.log('The service worker is listening');
    console.log(request);

    e.respondWith(
        caches.match(request)
        .then(response => {
            if (response) {
                return response;
            }

            return fetch(request);
        })
    );
});