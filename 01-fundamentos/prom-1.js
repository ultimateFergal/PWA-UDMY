console.log('hey you prick');


//Problema de call backs
function sumarUno( numero, callback) {

    if (numero >= 7 ) {
        callback('Número muy alto');
        return;
    }

    setTimeout(() => {
        // return ++numero;
        callback(null, numero + 1); // El Null indica que no viene con error
    }, 800);
}

sumarUno(5, function(nuevoValor) {
    console.log( nuevoValor ); // a los 800 ms aparece 6
});

sumarUno(5, function(error, nuevoValor) {

    if (error) {
        console.log(error);
        return;
    }
    sumarUno(nuevoValor, function(error, nuevoValor2) {

        if (error) {
            console.log(error);
            return;
        }
        console.log( nuevoValor2 ); // a los 1600 ms aparece 7
    });
});

sumarUno(5, function(error, nuevoValor) {

    if (error) {
        console.log(error);
        return;
    }
    sumarUno(nuevoValor, function(error, nuevoValor2) {

        if (error) {
            console.log(error);
            return;
        }
        sumarUno(nuevoValor2, function(error, nuevoValor3) {

            if (error) {
                console.log(error);
                return;
            }
            console.log( nuevoValor3 ); // a los 2400 ms aparece 8
        });
    });
});


