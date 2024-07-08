let cantidad = 1;
let precioClickeado = 0;
let idTicketFinal;
let conciertoId;
// FUNCIONES ENCARGADAS DE FILTRAR LAS PETICIONES AL BACKEND
function response_received(response) {
    //recibimos y enviamos la respuesta obtenida en formato json
    return response.json();
}
function parseData(content) {
    let concierto = content[0];
    const section = document.getElementById("hola");
    const conciertoDiv = document.createElement("div");
    conciertoDiv.classList.add("card-concierto-adentro");
    const artista = document.createElement("h3");
    artista.innerText = `${concierto.Artista}`;
    const imagen = document.createElement("img");
    imagen.src = concierto.Imagen;
    imagen.alt = `Imagen: ${concierto.Artista} : ${concierto.titulo}`;
    const descripciones = document.createElement("div");
    descripciones.classList.add("descripciones");
    const direccion = document.createElement("p");
    direccion.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>${concierto.Direccion}</span>`;
    const fecha = document.createElement("p");
    const fechaa = concierto.Fecha.slice(8, 10) + "-" + concierto.Fecha.slice(5, 7) + "-" + concierto.Fecha.slice(0, 4);
    const hora = concierto.Fecha.slice(11, 16);
    fecha.innerHTML = `<i class="fa-regular fa-calendar-days"></i> <span>${fechaa}</span> <span>${hora}hs</span>`;

    //Agregamos el concierto en un div
    conciertoDiv.append(imagen);
    descripciones.append(artista);
    descripciones.append(direccion);
    descripciones.append(fecha);
    conciertoDiv.append(descripciones);

    //Agregamos el div del concierto en el section
    section.append(conciertoDiv);
}

function request_error(error) {
    console.log("Error capturado: ", error);
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
conciertoId = id;

if (id == null) {
    window.location.href = "/";
}


fetch(`http://localhost:3000/ticketCode/concierto/${id}`)
    .then(response_received)
    .then(parseData)
    .catch(request_error);



fetch(`http://localhost:3000/ticketCode/ticket`)
    .then(function (response) {
        return response.json();
    })
    .then(function (content) {
        const numberInput = document.getElementById('number-input');
        const decreaseButton = document.getElementById('decrease');
        const increaseButton = document.getElementById('increase');

        decreaseButton.addEventListener('click', () => {
            let currentValue = parseInt(numberInput.value);
            if (currentValue > parseInt(numberInput.min)) {
                numberInput.value = currentValue - 1;
            }
            calcularResultado();
        });

        increaseButton.addEventListener('click', () => {
            let currentValue = parseInt(numberInput.value);
            if (currentValue < parseInt(numberInput.max)) {
                numberInput.value = currentValue + 1;
            }
            calcularResultado();
        });

        numberInput.addEventListener('input', () => {
            let value = parseInt(numberInput.value);
            if (value < parseInt(numberInput.min)) {
                numberInput.value = numberInput.min;
            } else if (value > parseInt(numberInput.max)) {
                numberInput.value = numberInput.max;
            }
            calcularResultado();
        });

        const section = document.getElementById("chau");
        const seleccion = document.createElement("div");
        seleccion.classList.add("seleccionar");
        const saltoDeLinea = document.createElement("br");
        const tituloEstadio = document.createElement("h2");
        tituloEstadio.textContent = "Selección de lugar";
        const elegir = document.createElement("div");
        elegir.classList.add("elegir");
        const svg = document.createElement("img");
        svg.src = "./img/1.svg";
        svg.classList.add("estadio-img");
        const botones = document.createElement("div");
        botones.classList.add("botones");
        let imagenClickeada = "./img/1.svg";

        for (let i = 0; i < content.length; i++) {
            let ticket = content[i];
            const boton = document.createElement("input");
            boton.type = "radio";
            boton.name = "elegir-seccion";
            boton.required = true;
            boton.id = `idTicket${ticket.idTicket}`;
            const label = document.createElement("label");
            label.setAttribute('for', `idTicket${ticket.idTicket}`);
            label.textContent = `${ticket.Sector}: ${ticket.Precio}`;
            label.addEventListener('mouseenter', function () {
                svg.src = `./img/${i + 2}.svg`;

            });
            label.addEventListener('click', function () {
                svg.src = `./img/${i + 2}.svg`;
                imagenClickeada = `./img/${i + 2}.svg`;
                actualizarPrecio(ticket.idTicket, ticket.Precio);
            });
            label.addEventListener('mouseleave', function () {

                svg.src = imagenClickeada;
            });


            botones.append(boton);
            botones.append(label);
        }


        seleccion.append(saltoDeLinea);
        seleccion.append(tituloEstadio);
        elegir.append(svg);
        elegir.append(botones);
        seleccion.append(elegir);

        section.append(seleccion);
        const precioDiv = document.getElementById("precio");
        const precio = document.createElement("p");
        precio.textContent = `$${precioClickeado}`;

        function actualizarPrecio(id, valor) {
            idTicketFinal = id;
            precioClickeado = valor;
            calcularResultado();
        }

        function calcularResultado() {
            precio.textContent = `$${precioClickeado * parseInt(numberInput.value)}`;
            cantidad = parseInt(numberInput.value);
        }
        precioDiv.append(precio);
    })
    .catch(function (error) {
        console.log("Error capturado: ", error);
    })



document.getElementById('compraForm').addEventListener('submit', function (event) {
    // Evitar el envío del formulario
    event.preventDefault();
    
    // Consigo los datos del formulario
    const monto = precioClickeado * cantidad;
    const usuario_id = document.getElementById('idUser').value;
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const concierto_id = conciertoId;
    const ticketsid = [];
    const tickets_precio = [];

    for(let i = 0; i < cantidad; i++){
        ticketsid.push(idTicketFinal);
        tickets_precio.push(precioClickeado);
    }
    
    const nuevaCompra = {
        fecha: fecha,
        monto: monto,
        usuario_id: usuario_id,
        concierto_id: concierto_id,
        ticketsid: ticketsid,
        tickets_precio: tickets_precio
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
            if (nuevaCompra['estado'] == true) {
                console.log('Respuesta: la compra se realizo con exito');
            }
            else {
                console.log('Respuesta: compra no realizada');
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
});

