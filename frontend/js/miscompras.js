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
    const contenido = content.resultado_detalle_compra;
    const divCompras = document.getElementById("contenedor-de-cards");
    for(let i=0; i<contenido.length; i++){
    
    const cards = document.createElement("div");
    cards.classList.add("card-compras");
    cards.id = `compraNumero${i}`;
    const imagen= document.createElement("img");
        imagen.src= contenido[i].Imagen;
        const divTexto = document.createElement("div");
        divTexto.classList.add("divTextoCompras");
        const titulo = document.createElement("h2");
        titulo.textContent = `${contenido[i].Nombre}`;
        const precioLugar = document.createElement("div");
        precioLugar.classList.add("precioLugar");
        const precio = document.createElement("span");
        const lugar = document.createElement("span");
        precio.textContent = `$${contenido[i].precio_unitario}`;
        lugar.textContent = `Ubicación: ${contenido[i].sector}`;
        const borrar = document.createElement("a");
        borrar.setAttribute("onclick", `borrarCompra(${i})`)
        borrar.setAttribute("href", `#`);
        borrar.classList.add("borrar-compra");
        borrar.innerHTML = '<i class="fa-solid fa-trash fa-2x" style="color: #292929;"></i>';

        precioLugar.append(lugar);
        precioLugar.append(precio);
        divTexto.append(titulo);
        divTexto.append(precioLugar);
        cards.append(imagen);
        cards.append(divTexto);
        cards.append(borrar);
        divCompras.append(cards);

       
    }
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

function borrarCompra(numCompra){
    const divABorrar = document.getElementById(`compraNumero${numCompra}`);
    divABorrar.remove();
}
