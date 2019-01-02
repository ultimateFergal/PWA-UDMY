// El app shell es lo que la app necesita para qeu funcione, en este caso es todo el código

 // const CACHE_NAME = 'cache-1';

 const CACHE_STATIC_NAME = 'static-v1';
 const CACHE_DYNAMIC_NAME = 'dynamic-v1';

 const CACHE_INMUTABLE_NAME = 'inmutable-v1';

self.addEventListener('install', e => {

    const cacheProm = caches.open(CACHE_STATIC_NAME)// caches.open(CACHE_NAME)
        .then(cache => {

            // app shell de la app
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                'js/app.js'
            ]);
        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then( cache => cache.addAll(['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css']));

    //e.waitUntil( cacheProm );
    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );
});



self.addEventListener('fetch', e => {

    // 2. Extrategia CACHE with network fallback y graba en caché de nuevo
    // Si no encuentra nada en caché va al internet, en esta estretegia no está bien que el app shell se mezcle con recursos dinámicos
    caches.match(e.request)
        .then (res => {
            if ( res ) return res;

            // No existe el archivo, entonces tengo que ir a la web
            console.log('No existe', e.request.url);

            return fetch( e.request).then( newResp => {
                caches.open( CACHE_DYNAMIC_NAME )//caches.open( CACHE_NAME ) // PARA GUARDAR AQUÍ CONTENIDO DINAMICO QUE VA CAMBIANDO Y N OES ESTÁTICO DE LA APPLICACIÓN
                    .then( cache => {
                        cache.put( e.request, newResp);// pongo e.request como la llave y newResp como lo que contiene la respuesta en la posición de cache especificada, si no existe la url en la cache
                    });

                return newResp.clone(); // Se agrega clon para asegutrarnos de que devuelva bien la respuesta poniendo la url faltante
                // Se puedenm borrar todos los archivos menos el / y se regenerarán siempre en la caché
            });

        });

    // 1. Estrategia de Caché CACHE ONLY
    // No hay peticiones a la webkitCancelAnimationFrame, todo sale del caché
    //e.respondWith( caches.match(e.request));


});