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

        })
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });
});