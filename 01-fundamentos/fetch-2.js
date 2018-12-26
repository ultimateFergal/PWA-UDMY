// Petición GET
// https://reqres.in/api/users

fetch('https://reqres.in/api/users')
    .then( resp => {
        console.log(resp); // trae respuesta del request

        resp.json().then(console.log); // Me trae el objeto json de la info que requiero
    });

