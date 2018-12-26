console.log('Hola mundo');

var request = new XMLHttpRequest();

request.open('GET', 'https://reqres.in/api/users', true); // Pongo true porque necesito que sea una petición asíncrona
request.send(null); // para indicar que no necesito mandar un argumento
request.onreadystatechange = function( state ) {
    console.log(request.response);

    if (request.readyState === 4 ) { // El request ya terminó y la data la tengo en el request
        var resp = request.response; // Devuelve un string de lo que es el objeto
        var respObj = JSON.parse(resp);

        console.log(resp); 
        console.log(respObj); 
        console.log(respObj.page); 

    } 
}; // Para estar pendiente de los cambios de estado del request
