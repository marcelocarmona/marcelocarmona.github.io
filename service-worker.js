---
---

const cacheName = 'siteCache';
self.addEventListener('install', e => {
 e.waitUntil(
   caches.open(cacheName).then(function(cache) {
     return cache.addAll([
       {% for static_file in site.static_files %}'{{ static_file.path }}',
       {% endfor %}
       {% for page in site.pages %}'{{ page.url }}',
       {% endfor %}
       {% for post in site.posts %}'{{ post.url }}',
       {% endfor %}
     ]).then(() => self.skipWaiting());;
   })
 );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
