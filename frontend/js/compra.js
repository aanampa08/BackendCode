// FUNCIONES ENCARGADAS DE FILTRAR LAS PETICIONES AL BACKEND
function response_received(response){
    //recibimos y enviamos la respuesta obtenida en formato json
    return response.json();
}
function parseData(content){
   console.log(content);
    
}

function request_error(error){
    console.log("Error capturado: ",error);
}

// PROGRAMA PRINCIPAL
fetch(`http://localhost:3000/ticketCode/compras/${1}`)
.then(response_received)
.then(parseData)
.catch(request_error);