fetch('https://reqres.in/api/users/1')
    .then(resp => resp.json())
    .then(usuario => {
        console.log(usuario);
        console.log(usuario.data);
    });

// Integrándolo de la otra forma
fetch('https://reqres.in/api/users/1')
    .then(resp => {
        resp.clone().json().then( usuario => { // el clone es para que funcionen ambas peticiones. si se remuee sale error de que ya se ha leído la respuesta d ela promesa
            console.log(usuario.data);
        });

        resp.json().then( usuario => {
            console.log(usuario.data);
        });

    })
    .catch( error => {
        console.log('Error en la petición');
        console.log(error);
    });

    console.log('Con catch error e Integrándolo de la otra forma');
// Con catch error e Integrándolo de la otra forma
// COn user 1000 da error porque no existe pero el catch no coge el error, entonces...
fetch('https://reqres.in/api/users/1000')
    .then(resp => {

        console.log(resp);
        // Se verifica la propiedad ok de la respuesta
        if ( resp.ok ) {
            resp.json().then(console.log);
            // return resp.json();
        } else {
            console.log('No existe el usuario 1000');
        }

        resp.json().then( usuario => {
            console.log(usuario);
        });

    })
    .catch( error => {
        console.log('Error en la petición');
        console.log(error);
    });