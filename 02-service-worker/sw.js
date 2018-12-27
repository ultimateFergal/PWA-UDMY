console.log('SW: Hola mundo'); // este mensaje sólo aparece la primera vez, cuando se instala el service worker

// Se hacen todas las peticiones de llamados de urls del index.html
self.addEventListener('fetch', event => {
    console.log( event );
 
    //Se demuestra que tiene el poder del service worker, bloqueando una url que detecta de la que se está haciendo una petición
    if (event.request.url.includes('style.css')){
        event.respondWith( fetch(null));
    } else {
        event.respondWith( fetch(event.request ));
    }

    
});