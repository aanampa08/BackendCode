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
        const titulo = document.createElement("h3");
        titulo.innerText=concierto.Nombre;
        const artista = document.createElement("h4");
        artista.innerText=`Artista: ${concierto.Artista}`;
        const imagen= document.createElement("img");
        imagen.src=concierto.Imagen;
        imagen.alt=`Imagen: ${concierto.Artista} : ${concierto.titulo}`;
        const descripcion=document.createElement("p");
        descripcion.innerText=`Descripción: ${concierto.Descripcion}`;
        const direccion = document.createElement("p");
        direccion.innerText=`Direccion: ${concierto.Direccion}`;
        const fecha=document.createElement("p");
        fecha.innerText=`Fecha: ${concierto.Fecha}`;

        //Agregamos el concierto en un div
        conciertoDiv.append(titulo);
        conciertoDiv.append(artista);
        conciertoDiv.append(imagen);
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