// FUNCIONES ENCARGADAS DE FILTRAR LAS PETICIONES AL BACKEND
function response_received(response){
    //recibimos y enviamos la respuesta obtenida en formato json
    return response.json();
}
function parseData(content){
    //content: es el json que tiene todos los conciertos cargados en la base de datos
    const section=document.getElementById("conciertos");
    for(let i=0; i < content.length;i++){
        let concierto=content[i];

        //Filtramos la informacion del concierto y construimos CARD x CONCIERTO
        const conciertoDiv = document.createElement("div");
        conciertoDiv.classList.add("card-concierto");
        const artista = document.createElement("h3");
        artista.innerText=`${concierto.Artista}`;
        const imagen= document.createElement("img");
        imagen.src=concierto.Imagen;
        imagen.alt=`Imagen: ${concierto.Artista} : ${concierto.titulo}`;
        const descripcion=document.createElement("p");
        descripcion.innerText=`${concierto.Descripcion}`;
        const direccion = document.createElement("p");
        direccion.innerHTML=`<i class="fa-solid fa-location-dot"></i> <span>${concierto.Direccion}</span>`;
        const fecha=document.createElement("p");
        fecha.innerHTML=`<i class="fa-regular fa-calendar-days"></i> <span>${concierto.Fecha}</span>`;

        //Agregamos el concierto en un div
        conciertoDiv.append(imagen);
        conciertoDiv.append(artista);
        conciertoDiv.append(descripcion);
        conciertoDiv.append(direccion);
        conciertoDiv.append(fecha);

        //Agregamos el div del concierto en el section
        section.append(conciertoDiv);
    }
    
}

function request_error(error){
    console.log("Error capturado: ",error);
}

// PROGRAMA PRINCIPAL
fetch("http://localhost:3000/ticketCode")
.then(response_received)
.then(parseData)
.catch(request_error);