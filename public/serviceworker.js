const CACHE_VERSION = '1'

const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Installation
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                return cache.addAll(urlsToCache)
            })
    )
})

// Listers
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(() => {
                return fetch(e.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

// Activation
self.addEventListener('activate', (e) => {
    const cacheWhitelist = []

    cacheWhitelist.push(CACHE_VERSION);

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            }) 
        ))
    )

})