function retornaTrue() {
    return true;
}

function sumarLento(numero) {

    var promesa = new Promise( function(resolve, reject) {
         
        setTimeout(() => {
            //resolve(numero + 1);
            // reject('sumarLento falló');
        }, 800);
    });

    return promesa;

}

let sumarRapido = (numero) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
             resolve(numero + 1);
             // reject('Error en sumar rápido');
        }, 300); 
    });
};

// // Promesas al tiempo
// // sumarRapido(10).then(console.log);
// // sumarLento(5).then(console.log);

// // Manejar promesas simultáneamente
// console.log("Manejar promesas simultáneamente");
// Promise.all([sumarLento(5), sumarRapido(10)])
//     .then(respuestas => {
//         console.log(respuestas); // Imprime array [6, 11]
//     })
//     .catch(console.log);

// // Enviando arreglo de cosas

// let cosas = [sumarLento(5), sumarRapido(10), true, 'hola mundo', retornaTrue()];
// console.log("Enviando arreglo de cosas");
// Promise.all(cosas)
//     .then(respuestas => {
//         console.log(respuestas); // Imprime array [6, 11]
//     })
//     .catch(console.log);

// Promise.race
// pone acompetir a todas las promesas
// su única respuesta será la que responda primero
// si ambas responden simultánemante, se mostrará la del lado izquierdo
console.log("Promise.race");
Promise.race([sumarLento(5), sumarRapido(10)])
    .then(respuesta => {
        console.log(respuesta); // Imprime array [6, 11]
    })
    .catch(console.log);
