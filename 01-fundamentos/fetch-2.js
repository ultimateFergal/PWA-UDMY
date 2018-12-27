// Petición GET
// https://reqres.in/api/users

fetch('https://reqres.in/api/users')
    .then( resp => {
        console.log(resp); // trae respuesta del request
        resp.json().then(console.log); // Me trae el objeto json de la info que requiero
    });

fetch('https://reqres.in/api/users')
    .then( resp => resp.json())
    .then( respObj => {// Concatenación de promesa
        console.log(respObj);
        console.log(respObj.page);
        console.log(respObj.per_page);
    });

/* // No hacer, problema de CORS, cross domain origin, de mi dominio a otro dominio que no tiene habilitado el Cross Domain Origina
fetch('https://www.wikipedia.org') // se usa extensión en chrome para que lo habilite
    .then( resp => resp.text )
    .then( html => {
        document.open();
        document.write(html);
        document.close();
    }); */