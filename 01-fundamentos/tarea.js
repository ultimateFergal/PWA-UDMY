// Tarea sobre promesas y fetch
// Realice resolución de cada ejercicio,

// compruebe el resultado en la consola y posteriormente
// siga con el siguiente.

// Comente TODO el código del ejercicio anterior
// antes de continuar con el siguiente.

// ==============================================
// Ejercicio #1
// ==============================================
/*
 Realizar un llamado FETCH a la siguiente API
 https://swapi.co/api/people/1/
 Imprima en consola el nombre y género de la persona.
*/

// Resolución de la tarea #1

 var promFetch = {};
 fetch("https://swapi.co/api/people/1/")
  .then(resp => {
    console.log(resp);
    if ( resp.ok ) {
        // resp.json().then(console.log);
        return resp.json();
    } else {
        console.log('No existe el usuario 1000');
    }
    
  })
  .then(respObj => {
    // Concatenación de promesa
    console.log(respObj);
    console.log(respObj.name);
    console.log(respObj.gender);
    promFetch.name = respObj.name;
    promFetch.gender = respObj.gender;
  })
  .catch(error => {
    console.log("Error en la petición");
    console.log(error);
  });

console.log('promFetch');
console.log(promFetch);
// ==============================================
// Ejercicio #2
// ==============================================
/*
 Similar al ejercicio anterior... haga un llamado a la misma api
 (puede reutilizar el código )
 https://swapi.co/api/people/1/
 
 Pero con el nombre y el género, haga un posteo
 POST a: https://reqres.in/api/users

 Imprima en consola el objeto y asegúrese que tenga
 el ID y la fecha de creación del objeto
*/

// Resolución de la tarea #2
fetch( 'https://reqres.in/api/users', {
    method: 'POST', // PUT
    BODY: JSON.stringify( promFetch ), // data
    headers: {
        'Content-Type': 'application/json'
    }
})
.then( resp => resp.json() )
.then( console.log )
.catch (error => {
    console.log('Error en la aplicación');
    console.log(error);
}); 



// Otra forma más compacta
console.log('----------------------');
console.log('Otra forma más compacta');
function postData( persona ) {
    let data = {
        nombre: persona.name,
        genero: persona.gender
    };

    return fetch('https://reqres.in/api/users', {
        method: 'POST', // PUT
        BODY: JSON.stringify( data ), // data
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

fetch('https://swapi.co/api/people/1/')
    .then( resp => resp.json() )
    .then( postData )
    .then( resp => resp.json() )
    .then( console.log );
