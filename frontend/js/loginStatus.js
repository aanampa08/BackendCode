let inicioSesion = false;
let idDeUsuario;


document.addEventListener('DOMContentLoaded', () => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Si el token no está presente
    if (!token) {
        console.log('Usuario NO LOGUEADO');
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

            idDeUsuario = data[0].idCliente;

            cargarDatosUsuario(idDeUsuario);

        })
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });

});

function perfilOn() {
    if (inicioSesion == true) {
        window.location.href = "./perfil.html";
    } else {
        window.location.href = "./reglogin.html";
    }
}

function perfilOn2() {
    if (inicioSesion == true) {
        window.location.href = "./miscompras.html";
    } else {
        window.location.href = "./reglogin.html";
    }
}