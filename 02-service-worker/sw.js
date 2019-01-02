console.log('SW: Hola mundo'); // este mensaje sólo aparece la primera vez, cuando se instala el service worker

// Se hacen todas las peticiones de llamados de urls del index.html
self.addEventListener('fetch', event => {
    console.log(event.request.url);
    console.log(event.request.url.includes('.css'));
    console.log(event.request.url.includes('.jpg'));
    if ( event.request.url.includes('.jpg') ) {
        console.log('Hay URL con imagen');
        console.log(event.request.url);

        // let fotoReq = fetch('img/main.jpg');
        let fotoReq = fetch(event.request.url);

        // event.respondWith(null); // Restringe el consumo de la url de la imagen
        //event.respondWith(fotoReq); // lo deja pasar tanto como si no se hiciera esto
    } 
    // console.log( event ); 
 
    //Se demuestra que tiene el poder del service worker, bloqueando una url que detecta de la que se está haciendo una petición
/*     if (event.request.url.includes('style.css')){
        event.respondWith( fetch(null));
    } else {
        event.respondWith( fetch(event.request ));
    } */

    //#region Modificar envío de respuesta siendo una url 
    
/* 
    if ( event.request.url.includes('style.css') ) {
        // Response crea una respuesta de fetch
        // Se modificará el archivo css, se le dice que intercepte la petición y en lugar de devolver el archivo original envía la siguiente información
        let respuesta = new Response(`
        body {
            background-color: red !important;
            color: pink;
        }`, {
            headers: {
                'Content-Type': 'text/css'
            }
        });

        event.respondWith( respuesta );
    }
 */
    //#endregion

    //#region Modificar envío de respuesta siendo una url, imagen por otra
    if ( event.request.url.includes('main.jpg') ) {
        let imgJpg = fetch('img/main-patas-arriba.jpg');
        event.respondWith( imgJpg);
        // El navegador sigue mostrando que se llaman main.jpg
    }
    //#endregion   

    //#region usar imagen de na url al ver que no se encuentra la de la otra url
    event.respondWith(
        fetch(event.request)
            .then( resp => {

                return resp.ok ? resp : fetch('img/main.jpg');
                
            })
    );
    // si la url de la imagen no existe mirando el valor de su respuesta al ser error 404 se puede reemplazar
    // el catch no coge los errores 404, por eso hay que agregar un fetch al respondwith para tratarlo como promesa
    //#endregion
    
});