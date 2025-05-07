const version = 'V0.13';
const staticCacheName = 'JohnnyCache' + version;
const imagesCacheName = 'ImagesCache';
const pagesCacheName = 'PagesCache';
const cacheList = [
    staticCacheName,
    imagesCacheName,
    pagesCacheName
];

async function storeFreshInCache(request, cacheName) {
    const fetchResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    return await cache.put(request, fetchResponse);
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
    .then( cache => {
        cache.keys()
        .then(keys => {
            if (keys.length > maxItems) {
                // Delete the oldest item in the cache
                cache.delete(keys[0])
                .then( () => {
                    // Recursive call to continue trimming down to maxItems
                    trimCache(cacheName, maxItems)
                });
            }
        });
    });
}

addEventListener('install', installEvent => {
    skipWaiting(); // Make new service worker take control immediately

    installEvent.waitUntil(
        caches.open(staticCacheName)
            .then(staticCache => {
                // Precache
                // "Nice to have" cache, failure will not prevent service worker from installing
                staticCache.addAll([
                    '/fonts/RioGrande.woff2',
                    '/img/johnny-cache.jpg',
                    '/img/tumbleweed.gif',
                    '/fun-facts.html'
                ]);

                // "Must have" cache; if any urls are bad, nothing will be cached because it will return false
                return staticCache.addAll([
                    '/css/styles.css',
                    '/js/scripts.js',
                    '/offline.html',
                    '/img/fallback.jpg'
                ]);
            })
    );
});

addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        // Delete old caches
        caches.keys()
        .then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (!cacheList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
        // Make all clients use new service worker
        .then( () => {
            return clients.claim();
        })
    )
});

addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;

    // When the user requests an HTML file
    if (request.headers.get('Accept').includes('text/html')) {
        fetchEvent.respondWith(
            async function() {
                try {
                    const fetchResponse = await fetch(request);

                    // Cache page
                    const copy = fetchResponse.clone();
                    fetchResponse.waitUntil(
                        async function() {
                            const pagesCache = await caches.open(pagesCacheName);
                            return pagesCache.put(request, copy);
                        }
                    );
                    return fetchResponse;
                }
                catch (error) {
                    console.error(error);

                    const cacheResponse = await caches.match(request);
                    return cacheResponse || caches.match('/offline.html');
                }
            }
        );

        return;
    }

    // When the user requests an image
    if (request.headers.get('Accept').includes('image')) {
        fetchEvent.respondWith(
            // Look for the image in cache
            caches.match(request)
            .then(cacheResponse => {
                if (cacheResponse) {
                    // Fetch image from network
                    fetchEvent.waitUntil(
                        storeFreshInCache(request, imagesCacheName)
                    )

                    return cacheResponse;
                }

                // Not cached, fetching from network
                return fetch(request)
                .then( fetchResponse => {
                    // Cache the image
                    // Make a copy because fetchResponse is a stream, can only be streamed once
                    const copy = fetchResponse.clone();
                    fetchEvent.waitUntil(
                        caches.open(imagesCacheName)
                        .then( imageCache => {
                            return imageCache.put(request, copy);
                        })
                    );
                    return fetchResponse;
                })
                .catch( error => {
                    // Display fallback image
                    console.error(error);
                    return caches.match('/img/fallback.jpg');
                });
            })
        );
        return;
    }

    // For all other files
    fetchEvent.respondWith(
        // Look for the file in cache
        caches.match(request)
        .then(cacheResponse => {
            if (cacheResponse) {
                return cacheResponse;
            }

            return fetch(request);
        })
    );
});

addEventListener('message', messageEvent => {
    if (messageEvent.data == 'clean up caches') {
        trimCache(pagesCacheName, 5);
        trimCache(imagesCacheName, 10);
    }
});