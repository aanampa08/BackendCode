//probando el fetch de put
const nuevoUsuario = 'aliianampa';
const idCliente=3;

const datosUsuario = {
    //respeta el nombre del campo nuevoUsuario
    nuevoUsuario:nuevoUsuario
};

fetch(`http://localhost:3000/ticketCode/usuario/${idCliente}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosUsuario)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log('Usuario actualizado:', data);
})
.catch(error => {
    console.error('Error:', error);
});

//----------------- fetch para delete ----------------------

fetch(`http://localhost:3000/ticketCode/compra/${idCompra}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosUsuario)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log('Resultado de compra:', data);
})
.catch(error => {
    console.error('Error:', error);
});
