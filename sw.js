;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_patrones_software_2',
  urlsToCache = [
    './',
    'https://raw.githubusercontent.com/andreschapid-u/resumen-patrones-software/gh-pages/patrones.json',
    './manifest.json',
    './css/font-awesome/css/font-awesome.min.css',
    'http://localhost:8000/css/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
    'http://localhost:8000/css/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0',
    'http://localhost:8000/css/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0',
    'https://fonts.googleapis.com/css?family=Montserrat:400,700',
    'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
    './css/styles.min.css',
    './css/bootstrap.min.css',
    './js/script.js',
    './js/jquery/jquery.min.js',
    './js/bootstrap/js/bootstrap.min.js',
    './js/cargar.js',
    './img/patrones/favicon.png',
    './img/patrones/abstract_factory.svg',
    './img/patrones/abstract_factory_d_c.svg',
    './img/patrones/abstract_factory_d_s.svg',
    './img/patrones/abstract_factory_logo.svg',
    './img/patrones/adapter.svg',
    './img/patrones/adapter_d_c.svg',
    './img/patrones/adapter_d_s.svg',
    './img/patrones/adapter_logo.svg',
    './img/patrones/bridge.svg',
    './img/patrones/bridge_d_c.svg',
    './img/patrones/bridge_d_s.svg',
    './img/patrones/bridge_logo.svg',
    './img/patrones/builder.svg',
    './img/patrones/builder_d_c.svg',
    './img/patrones/builder_d_s.svg',
    './img/patrones/builder_logo.svg',
    './img/patrones/decorator.svg',
    './img/patrones/decorator_d_c.svg',
    './img/patrones/decorator_d_s.svg',
    './img/patrones/decorator_logo.svg',
    './img/patrones/factory.svg',
    './img/patrones/factory_d_c.svg',
    './img/patrones/factory_d_s.svg',
    './img/patrones/factory_logo.svg',
    './img/patrones/favicon.png',
    './img/patrones/favicon.svg',
    './img/patrones/prototype.svg',
    './img/patrones/prototype_d_c.svg',
    './img/patrones/prototype_d_s.svg',
    './img/patrones/prototype_logo.svg',
    './img/patrones/singleton.svg',
    './img/patrones/singleton_d_c.svg',
    './img/patrones/singleton_d_s.svg',
    './img/patrones/singleton_logo.svg'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsToCache)
        .then(() => self.skipWaiting())
    })
    .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          //Eliminamos lo que ya no se necesita en cache
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
    // Le indica al SW activar el cache actual
    .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        //recuperar del cache
        return res
      }
      //recuperar de la petición a la url
      return fetch(e.request)
    })
  )
})