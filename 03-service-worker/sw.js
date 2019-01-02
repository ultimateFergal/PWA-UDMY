
// Ciclo de vida del SW

self.addEventListener('install', event => {

    // Descarar assets
    // Crear cache
    // El evento install del service worker se disparará cuando haya cualuqier cambio en el service worker
    // pero no necesatiamente quiere decir que el serivce workier se activa
    console.log(event);
    console.log('SW: Instalando SW');

    // self.skipWaiting(); // Para que se haga la actualización inmediata del service worker sin tener que cerrar pestañas o click en skipwating 
    // Pero es más recomendable que el cliente se le refresque la info de la app al cerrar en ingresar nuevamente par ano perder una info con la q
    // estuviera trabajando en ese momento


    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
        //}, 1000);
        }, 1);

        self.skipWaiting();

        resolve();
    });

    event.waitUntil( instalacion);
});


// Cuando el service worker se activa y toma el control de la aplicación
self.addEventListener('activate', event => {

    // Borrar cache vieja, elimina los caches del service worker anterior
    console.log('SW2: Activo y listo para controlar la aplicación')
});


// FETCH Manejo de peticiones http
self.addEventListener('fetch', event => {

    // Aplicar estrategias del caché
    console.log('SW: ', event.request.url);// Mostrará todas las peticiones cuando se haga fetch

    if ( event.request.url.includes('https://reqres.in/')) {
        const resp = new Response(`{ ok: false, mensaje: 'jajaja}`);

        event.respondWith( resp ); // Poderoso y útila cuando se está trabajando sin conexión
    }
});

// Evento SYNC: Recuperamos la conexión a internet, no todos los navegadores tienen syncmanager
self.addEventListener('sync', event => { // Este cñodigo se dispara al recuperar la conexión a internet
    console.log('Tenemos conexión');
    console.log(event);
    console.log(event.tag);// El tag dirá 'posteo-gatitos' registrado para el evento del sync an dl app.js
});

// PUSH: Manejar las push notifications, push server que mandará notificaciones a todos los usuarios que se requiera
self.addEventListener('push', event => {
    console.log('Notificacion recibida');
});
