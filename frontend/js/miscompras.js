function cargarDatosUsuario(idDeUsuario) {
    fetch(`http://localhost:3000/ticketCode/compras/${idDeUsuario}`)
    .then(response_received)
    .then(parseData)
    .catch(request_error);

    
};

function response_received(response) {
    //recibimos y enviamos la respuesta obtenida en formato json
    return response.json();
}
function parseData(content) {
    console.log(content);
}

function request_error(error) {
    console.log("Error capturado: ", error);
}

// const params = new URLSearchParams(window.location.search);
// const id = params.get("id");
// conciertoId = id;

// if (id == null) {
//     window.location.href = "./reglogin.html";
// }


