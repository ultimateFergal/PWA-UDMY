console.log('hey you prick');


function sumarUno(numero) {

    var promesa = new Promise(function (resolve, reject) {

        console.log(numero);
        if (numero >= 7) {
            reject('El número es muy alto');
        } // Genera error que hay que hacerle catch

        setTimeout(() => {
            resolve(numero + 1);
        }, 800);
    });

    return promesa;
}


sumarUno(8)
    .then(nuevoValor => {
        console.log(nuevoValor);
    })
    .catch(error => { // Catch el error, la parte del reject
        console.log('ERROR EN PROMESA');
        console.log.apply(error);
    });

sumarUno(5).then((nuevoNumero) => (
    console.log(nuevoNumero)
)
);

sumarUno(5).then((nuevoNumero) => {
    console.log('largo: ' + nuevoNumero);
    return sumarUno(nuevoNumero); // Retorna una promesa
}).then((nuevoNumero) => {
    console.log('largo: ' + nuevoNumero);
});

sumarUno(5).then((nuevoNumero) => {
    console.log('largoo: ' + nuevoNumero);
    return sumarUno(nuevoNumero); // Retorna una promesa
}).then((nuevoNumero) => {
    console.log('largoo: ' + nuevoNumero);
    return sumarUno(nuevoNumero);
}).then((nuevoNumero) => {
    console.log('largoo: ' + nuevoNumero);
}).catch(error => { // Catch el error, la parte del reject
    console.log('ERROR EN PROMESA');
    console.log.apply(error);
});

// Forma compacta
console.log('narrow');
sumarUno(5).then((nuevoNumero) => sumarUno(nuevoNumero))
    .then((nuevoNumero) => sumarUno(nuevoNumero))
    .then((nuevoNumero) => console.log('largooo: ' + nuevoNumero))
    .catch(error => { // Catch el error, la parte del reject
        console.log('ERROR EN PROMESA');
        console.log.apply(error);
    });


// Forma más compacta
console.log('narrower');
sumarUno(5)
    .then(sumarUno) // Si la respuesta es también el argumento 
    .then(sumarUno) // que quiero mandar en la funcion, no es necesario definir función flecha
    .then(nuevoNumero => {
        console.log('largoooo: ' + nuevoNumero);
    })
    .catch(error => { // Catch el error, la parte del reject
        console.log('ERROR EN PROMESA');
        console.log.apply(error);
    });
