// El app shell es lo que la app necesita para qeu funcione, en este caso es todo el código

 // const CACHE_NAME = 'cache-1';

 const CACHE_STATIC_NAME = 'static-v1';
 const CACHE_DYNAMIC_NAME = 'dynamic-v1';
 const CACHE_INMUTABLE_NAME = 'inmutable-v1';

 const CACHE_DYNAMIC_LIMIT = 50;

 
 function limpiarCache(cacheName, numeroItems){
     caches.open(cacheName)
        .then( cache => {
            return cache.keys()
                .then(keys => {
                    console.log(keys);

                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then( limpiarCache(cacheName, numeroItems));
                    }
                });
        });
 } 
self.addEventListener('install', e => {
    
    const cacheProm = caches.open(CACHE_STATIC_NAME)// caches.open(CACHE_NAME)
        .then(cache => {

            // app shell de la app
            return cache.addAll([
                '/',
                'index.html',
                'css/style.css',
                'img/main.jpg',
                'js/app.js',
                'img/no-img.jpg'
            ]);
        });
        
    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then( cache => cache.addAll(['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css']));
        
    //e.waitUntil( cacheProm );
    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );
});



self.addEventListener('fetch', e => {

    // 5. Estrategia CACHE & NETWORK RACE
    // Compentencia para ver cuàl de los dos responde primero, si el la red o la caché del dispositivo

    const respuesta = new Promise((resolve, reject) => {
        let rechazada = false;
        
        const falloUnaVez = () => {
            // revisar que sin conexión no me pasa a las otras url
            if ( rechazada ) {
                // No existe ni en el caché ni hay una petición válida que sirva
                if (/\.(png|jpg)$/i.test(e.request.url)) { // No importa lo que venga antes, necesito evaluar que sea un jpg o un png y no importa el case sensitiv
                    resolve(caches.match('img/no-img.jpg'));
                } else {
                    reject('No se encontró respuesta');
                }
                
            } else {
                rechazada = true;
            }
        };


        fetch( e.request ).then(res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch ( falloUnaVez);

        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnaVez();
        }).catch ( falloUnaVez);


    });


    e.respondWith(respuesta);





    // 4. Estrategia CACHE WITH NETWORK UPDATE
    // Rendimiento es crítico
    // Actualizaciòñnes siempre estarñan un paso atrás

/*     if( e.request.url.includes('bootstrap')){ // Como no coge el bootstraop por ser de la cache inmutab le, se agrega esto
        return e.respondWith(cache.match(e.request));
    }

    // como el rendimiento es crìtico la app va a funcionar sólo con info en la caché estática
    // Regresa del cache estático lo que coincida con la petición que se está haciendo
    // Al mismo tiempo se hace el fetch para obtener la ultima versión que esté en el hosting a donde se haga la petición
    // y se almacena en el cache estático, pero la que se manda es la versión que esté originalmente en el caché
    const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {
        fetch(e.request).then( newRes => {
            cache.put( e.request, newRes);

        });

        return cache.match(e.request);
    });


    e.respondWith(respuesta); */

    // 3. Estrategia NETWORK WITH CACHE FALLBACK
    // Busca en internet y si no encuentra mira en la caché
    // Cuando se usa desde un dispositivo movil siempre traerá la info más actualizada 
    // Siempre hará fetch recurriendo a la conexión de ingternet y eso lo puede hacer demorado
 /*    const respuesta = fetch(e.request).then(res => {

        // console.log('Fetch', res);
        if (!res) return caches.match(e.request);

        caches.open(CACHE_DYNAMIC_NAME)
            .then(cache => {
                cache.put( e.request, res);
                limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
            });

            return res.clone();
    }).catch( err => {
        return caches.match(e.request);
    });

    e.respondWith(respuesta); */

    // 2. Extrategia CACHE with network fallback y graba en caché de nuevo
    // Si no encuentra nada en caché va al internet, en esta estretegia no está bien que el app shell se mezcle con recursos dinámicos
    /* caches.match(e.request)
        .then (res => {
            console.log(res);
            if ( res ) return res;

            // No existe el archivo, entonces tengo que ir a la web
            console.log('No existe', e.request.url);

            return fetch( e.request).then( newResp => {
                caches.open( CACHE_DYNAMIC_NAME )//caches.open( CACHE_NAME ) // PARA GUARDAR AQUÍ CONTENIDO DINAMICO QUE VA CAMBIANDO Y N OES ESTÁTICO DE LA APPLICACIÓN
                    .then( cache => {
                        cache.put( e.request, newResp);// pongo e.request como la llave y newResp como lo que contiene la respuesta en la posición de cache especificada, si no existe la url en la cache
                        limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT); // Cada vez que se graba el cache con un nuevo elemento se limpia el caché dinámico
                    });

                return newResp.clone(); // Se agrega clon para asegutrarnos de que devuelva bien la respuesta poniendo la url faltante
                // Se puedenm borrar todos los archivos menos el / y se regenerarán siempre en la caché
            });

        }); */

    // 1. Estrategia de Caché CACHE ONLY
    // No hay peticiones a la webkitCancelAnimationFrame, todo sale del caché
    //e.respondWith( caches.match(e.request));


});