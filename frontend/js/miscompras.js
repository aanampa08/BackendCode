const divCompras = document.getElementById("contenedor-de-cards");
const noEncontrado = document.getElementById("noEncontrado");
let cantidadDeCompras;

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

    if (content['mensaje'] == false) {
        noEncontrado.textContent = "El usuario no tiene realizada ninguna compra.";
    }
    else {
        const vectorCompras = content['resultado_compra'];
        noEncontrado.textContent = "";
        cantidadDeCompras = vectorCompras.length;
        console.log(cantidadDeCompras);
        for (let i = 0; i < vectorCompras.length; i++) {
            let compraIndividual = vectorCompras[i];
            const cards = document.createElement("div");
            cards.classList.add("card-compras");
            cards.id = `compraNumero${compraIndividual.idCompra}`;
            const imagen = document.createElement("img");
            imagen.src = compraIndividual.Imagen;
            const divTexto = document.createElement("div");
            divTexto.classList.add("divTextoCompras");
            const titulo = document.createElement("h2");
            titulo.textContent = `${compraIndividual.Nombre}`;
            const artista = document.createElement("h3");
            artista.textContent = `${compraIndividual.Artista}`;
            const fechaExactaCompra = compraIndividual.FechaCompra.slice(8, 10) + "-" + compraIndividual.FechaCompra.slice(5, 7) + "-" + compraIndividual.FechaCompra.slice(0, 4);
            const horaExactaCompra = compraIndividual.FechaCompra.slice(11, 16);
            const fechaDeCompra = document.createElement("p");
            fechaDeCompra.innerHTML = `<b>Fecha de compra:</b> ${fechaExactaCompra} ${horaExactaCompra}`;
            const fechaExactaConcierto = compraIndividual.FechaConcierto.slice(8, 10) + "-" + compraIndividual.FechaConcierto.slice(5, 7) + "-" + compraIndividual.FechaConcierto.slice(0, 4);
            const horaExactaConcierto = compraIndividual.FechaConcierto.slice(11, 16);

            const fechaDeConcierto = document.createElement("p");
            fechaDeConcierto.innerHTML = `<b>Fecha del concierto:</b> ${fechaExactaConcierto} ${horaExactaConcierto}`;
            const debajoArtista = document.createElement("div");
            debajoArtista.classList.add("debajoArtista");
            const precio = document.createElement("span");
            const lugar = document.createElement("p");
            const precioIndividual = document.createElement("p");
            precioIndividual.textContent = `${compraIndividual.cantidadTicket}x$${compraIndividual.precio_unitario}`;
            precio.innerHTML = `<b>Total:</b> $${compraIndividual.Monto}`;
            lugar.innerHTML = `<b>Ubicación:</b> ${compraIndividual.sector}`;
            const borrar = document.createElement("a");
            borrar.setAttribute("onclick", `borrarCompra(${compraIndividual.idCompra})`)
            borrar.setAttribute("href", `#`);
            borrar.classList.add("borrar-compra");
            borrar.innerHTML = '<i class="fa-solid fa-trash fa-2x" style="color: #292929;"></i>';
            const divPrecio = document.createElement("div");
            divPrecio.classList.add("precioCompras");
            const divFechaUbi = document.createElement("div");
            const divTitulo = document.createElement("div");




            divFechaUbi.append(fechaDeConcierto);
            divFechaUbi.append(lugar);
            divFechaUbi.append(fechaDeCompra);
            divPrecio.append(precioIndividual);
            divPrecio.append(precio);
            debajoArtista.append(divFechaUbi);
            debajoArtista.append(divPrecio);
            divTitulo.append(titulo);
            divTitulo.append(artista);
            divTexto.append(divTitulo);
            divTexto.append(debajoArtista);

            cards.append(imagen);
            cards.append(divTexto);
            cards.append(borrar);

            divCompras.append(cards);

        }
    }
}



function request_error(error) {
    console.log("Error capturado: ", error);
}

function borrarCompra(numCompra) {
    const divABorrar = document.getElementById(`compraNumero${numCompra}`);
    divABorrar.remove();
    cantidadDeCompras = cantidadDeCompras - 1;
    if (cantidadDeCompras < 1) {
        noEncontrado.textContent = "El usuario no tiene realizada ninguna compra.";
    }
    fetch(`http://localhost:3000/ticketCode/compra/${numCompra}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
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

}
