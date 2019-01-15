
// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

// Se acrtualiza cuando se crea o se sube de versión de la base de datos
request.onupgradeneeded = event => {

    console.log('Actualzación de BD');

    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

};

// Manejo de errores
request.onerror = event => {
    console.log('DB error:', event.target.error);
};

// insertar datos
request.onsuccess = event => {

    // Referencia a la base de datos y lo que quiero grabar en la base de datos
    let db = event.target.result;

    let heroesData = [
        { id: '1111', heroe: 'Spiderman', mensaje: 'Aquí su amigo spiderman'},
        { id: '2222', heroe: 'Ironman', mensaje: 'Aquí en mi nuevo MArk 50'},
    ];

    // Transacción para grabar lo anterior, degermino lugar donde voy a grabar y decir si la transacción es de lectura o lectura y escritura
    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('Error guardadndo', event.target.error);
    };

    // Informa sobre el éxito de la transcacción
    heroesTransaction.oncomplete = event => {
        console.log('Transacción hecha', event);
    };

    // Objeto de la tansacción
    let heroesStore = heroesTransaction.objectStore('heroes');

    // Barrer arreglo pra insertar registro uno por uno
    for (let heroe of heroesData) {
        heroesStore.add( heroe);
    };

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado a la base de datos');
    };


};





