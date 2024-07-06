// -------------- FETCH POST PARA CREAR UN NUEVO USUARIO -----------------------------------------
document.getElementById('compraForm').addEventListener('submit', function (event) {
    // Evitar el envío del formulario
    event.preventDefault();

    // Consigo los datos del formulario
    const monto = document.getElementById('idMonto').value;
    const usuario_id = document.getElementById('idUser').value;
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const concierto_id=1;
    const ticketsid=[1,1];
    const tickets_precio=[50000,50000];

    const nuevaCompra = {
        fecha: fecha,
        monto: monto,
        usuario_id: usuario_id,
        concierto_id:concierto_id,
        ticketsid:ticketsid,
        tickets_precio:tickets_precio
    };

    // Configuración de la solicitud
    const method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaCompra)
    };

    // Hacer la solicitud POST
    fetch('http://localhost:3000/ticketCode/compra', method)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo generar la compra');
            }
            return response.json();
        })
        .then(nuevaCompra => {
            if(nuevaCompra['estado']==true){
                console.log('Respuesta: la compra se realizo con exito');
            }
            else{
                console.log('Respuesta: compra no realizada');
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
});




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