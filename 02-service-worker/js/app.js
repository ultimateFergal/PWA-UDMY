// Confirmar si podemos usar el service worker

// if ('serviceWorker' in navigator ) {
if (navigator.serviceWorker) {
    console.log('Podemos usar SW');

    navigator.serviceWorker.register('/02-service-worker/sw.js');// El service worker debe esgtar en la raiz de la app, en el mismo niveo que el index.html para que
    // Esté con control total y absoluto del sitio web, si se deja en una carpeta va a controlar sólo lo que esté en esa carpeta
} 

