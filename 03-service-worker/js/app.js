

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    // navigator.serviceWorker.register('sw.js');

    
    navigator.serviceWorker.register('sw.js')
        .then( reg => { // Para simular sincronización por desconexión y conexión a internet
            
            // SYNC event
            setTimeout(() => {
                reg.sync.register('posteo-gatitos'); // no todos los navegadores tienen syncmanager
                console.log('Se enviaron fotos de gatitos al servidor'); // Cuando se ejecuta la app sin conexión a internet sólo se mostrará esto
            }, 300);
            

            // PUSH Notifications
            Notification.requestPermission()
                .then( result => {
                    console.log(result);
                    reg.showNotification('Hola Mundo!');
                });
    
        });
    
}



// Disparando fetch con petición que mostrará el service worker en 
// su evento de fetch
fetch('https://reqres.in/api/users')
    .then( resp => resp.text())
    .then(console.log);