let inicioSesion = false;

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');


    
    // Si el token no está presente
    if (!token) {
        console.error('Token no encontrado en el localStorage.');
        return;
    }

    // Configurar la solicitud GET para obtener información del usuario
    const method = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    // Hacer la solicitud GET para obtener datos del usuario
    fetch('http://localhost:3000/ticketCode/infoUser', method)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener datos del usuario');
            }
            return response.json();
        })
        .then(data => {
            // Se puede agregar lo que se necesita a la pagina con la informacion del usuario
            console.log('Datos del usuario:', data);
            const perfilDiv = document.getElementById("perfilDiv");
            const styleSheet = document.styleSheets[0];
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                if (styleSheet.cssRules[i].selectorText === '#loginbutton::before') {
                    styleSheet.cssRules[i].style.setProperty('content', `"${data[0].Nombre}"`);
                }
            }
            if (data != null) {
                inicioSesion = true;
            } else {
                inicioSesion = false;
            }

            const divCambiarUsuario = document.createElement("div");
            divCambiarUsuario.classList.add("divCambiarUsuario");
            const titulo = document.createElement("h2");
            titulo.textContent = "Datos de la cuenta";
            const textoUsuario = document.createElement("p");
            textoUsuario.textContent = "Nombre de usuario:";
            const displayText = document.createElement("span");
            displayText.setAttribute("id","displayText");
            displayText.textContent = `${data[0].Usuario}`;
            const editText = document.createElement("input");
            editText.type = "text";
            editText.id = "editText";
            editText.style.display = "none";
            const editButton = document.createElement("button");
            editButton.setAttribute("id","editButton");
            editButton.textContent = "Editar";
            const saveButton = document.createElement("button");
            saveButton.setAttribute("id","saveButton");
            saveButton.style.display = "none";
            saveButton.textContent = "Guardar";
            const cancelButton = document.createElement("button");
            cancelButton.setAttribute("id","cancelButton");
            cancelButton.style.display = "none";
            cancelButton.textContent = "Cancelar";
            
            const logout = document.createElement("button");
            logout.classList.add("logout");
            logout.textContent = "Cerrar sesión";
            logout.setAttribute("onclick", "deslogin()")

            const nombre = document.createElement("p");
            nombre.textContent = `Nombre: ${data[0].Nombre}`;

            const apellido = document.createElement("p");
            apellido.textContent = `Apellido: ${data[0].Apellido}`;
            const email = document.createElement("p");
            email.textContent = `E-Mail: ${data[0].Mail}`;
            const dni = document.createElement("p");
            dni.textContent = `D.N.I.: ${data[0].Dni}`;
            const telefono = document.createElement("p");
            telefono.textContent = `Numero de telefono: ${data[0].Telefono}`;
            
            divCambiarUsuario.append(textoUsuario);
            divCambiarUsuario.append(displayText);
            divCambiarUsuario.append(editText);
            divCambiarUsuario.append(editButton);
            divCambiarUsuario.append(saveButton);
            divCambiarUsuario.append(cancelButton);
            perfilDiv.append(titulo);
            perfilDiv.append(divCambiarUsuario);
            perfilDiv.append(nombre);
            perfilDiv.append(apellido);
            perfilDiv.append(dni);
            perfilDiv.append(email);
            perfilDiv.append(telefono);
            perfilDiv.append(logout);
            

    editButton.addEventListener('click', () => {
        editText.value = displayText.textContent;
        displayText.style.display = 'none';
        editText.style.display = 'inline';
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
        cancelButton.style.display = 'inline';
    });

    saveButton.addEventListener('click', () => {
        displayText.textContent = editText.value;
        displayText.style.display = 'inline';
        editText.style.display = 'none';
        editButton.style.display = 'inline';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        const idCliente = data[0].idCliente;
        const nombreCambiado = editText.value;
        cambioUsuario(idCliente, nombreCambiado);
    });

    cancelButton.addEventListener('click', () => {
        displayText.style.display = 'inline';
        editText.style.display = 'none';
        editButton.style.display = 'inline';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
    });
        })
        
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });

        
});

function perfilOn() {
    if (inicioSesion == true) {
        window.location.href = "./perfil.html";
    } else {
    window.location.href = "./reglogin.html"
    }
}

function perfilOn2() {
    if (inicioSesion == true) {
        window.location.href = "./miscompras.html";
    } else {
        window.location.href = "./reglogin.html";
    }
}

function cambioUsuario(idCliente, nuevoUsuario){
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
}

function deslogin(){
    const token = localStorage.getItem('token');
        console.log("Token para cerrar sesión:", token);
        
        fetch('http://localhost:3000/ticketCode/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(respuesta => respuesta.json())  // Aquí cambiamos "respuesta" a "response"
        .then(data => {  // Cambiamos "dato" a "data"
          console.log(data.message);
            if (data.message== true) {  // Aquí cambiamos "respuesta.ok" a "data.ok"
                console.log(data.message);
                localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
                window.location.href = "./reglogin.html";
                
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
}