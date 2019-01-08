

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('sw.js');
}

//#region introducción a CacheStorage

// El cache es del objeto window, no todos los navegaores lo soportan
// mirar en can i use, normalmente si soportan el SW soportan el cache
/* if (window.caches) {
    caches.open('prueba-1'); // crea espacio en la cache con nombre prueba-1, verifica si está creado, si no, lo crea

    caches.open('prueba-2');

    caches.has('prueba-2').then( existe => console.log(existe));// Todo lo del caches retorna promesa


    caches.has('prueba-3').then( existe => console.log(existe));// Todo lo del caches retorna promesa

    // Borrar de espacio en caché
    caches.delete('prueba-2');

    // Promesa que devuelve información del espacio cfreado en la caché y para trabajar sobre èl
    caches.open('cache-v1.1').then(cache => {
        //cache.add('/index.html');

        cache.addAll([
            'index.html',
            'css/style.css',
            'img/main.jpg'
        ]).then( () => {

            // Borrado de un archivo, se hace después de resuelta la promesa
            // cache.delete('/css/style.css');

            // Reemplazo un archivo en caché con otra respuesta
            cache.put('index.html', new Response('Hola Mundo'));
        });

        // Verificar si existe un archivo en caché
        cache.match('/index.html')
            .then( res => {
                if (res)
                    res.text().then(console.log);
                else    
                    console.log('no hay arfhivo index en caché todavía');
            });

    });

    console.log('Para retornar un arreglo de todos los cachés');
    // Para retornar un arreglo de todos los cachés
    caches.keys().then( keys => {
        console.log(keys);
    });
 

} */
//#endregion


