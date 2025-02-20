const CACHE_NAME = 'cache-pwa-ifb';
const urlsToCache = [
  "./",
  "./index.html",
  "./noticias.html",
  "./post.html",
  "./style.css",
  "./styleposts.css",
  "./script.js",
  "./posts.json",
  "./img/1.1.jpg",
  "./img/1.png",
  "./img/10.png",
  "./img/2.1.jpg",
  "./img/2.png",
  "./img/3.1.jpg",
  "./img/3.png",
  "./img/4.png",
  "./img/5.png",
  "./img/6.png",
  "./img/7.png",
  "./img/8.png",
  "./img/9.png",
  "./img/android-chrome-192x192.png",
  "./img/android-chrome-512x512.png",
  "./img/fundo_index.png",
  "./img/IFB-footer.png",
  "./img/imgDestaques1.png",
  "./img/imgDestaques2.png",
  "./img/imgPrincipal1.png",
  "./img/imgPrincipal2.png",
  "./img/imgPrincipal3.png",
  "./img/imgs-campus/C-Brasilia.jpg",
  "./img/imgs-campus/C-Ceilandia.jpg",
  "./img/imgs-campus/C-Estrutural.jpg",
  "./img/imgs-campus/C-Gama.jpg",
  "./img/imgs-campus/C-Planaltina.jpg",
  "./img/imgs-campus/C-Recanto.jpg",
  "./img/imgs-campus/C-riachofundo2.jpg",
  "./img/imgs-campus/C-Samambaia.jpg",
  "./img/imgs-campus/C-Sao_sebastiao.jpg",
  "./img/imgs-campus/C-Taguatinga.jpg",
  "./img/logoGPTCode.jpg",
  "./img/logoPrincipal.png",
  "./img/p-ass-estudantil.png",
  "./img/p-aux-emergencial.png",
  "./img/p-biblioteca.png",
  "./img/p-campus-brasilia.png",
  "./img/p-convite.png",
  "./img/p-edital.png",
  "./img/p-fique-ligado.png",
  "./img/p-ifmaker.png",
  "./img/p-insc-abertas.png",
  "./img/p-oportunidade.png",
  "./img/p-res-final.png",
  "./img/redesSociais/instagram (2).png",
  "./img/redesSociais/twitter (1).png",
  "./img/redesSociais/youtube (1).png"
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
self.addEventListener('install', event => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Opened cache, adding files:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('SW: All files cached, skipping waiting');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('SW: Install failed:', err);
        throw err;
      })
  );
});