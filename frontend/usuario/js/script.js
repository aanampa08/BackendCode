document.getElementById('idFormulario').addEventListener('submit', function(event) {
    // Evitar el envío del formulario
    event.preventDefault(); 

    // Consigo los datos del formulario
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const dni = document.getElementById('dni').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const mail = document.getElementById('mail').value;
    const telefono = document.getElementById('telefono').value;
    const newUser = {
      usuario: usuario,
      contraseña: contraseña,
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      telefono: telefono
    };

    //debugueo de usuario
    console.log(newUser);

    // Configuración de la solicitud
    const method = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };

    // Hacer la solicitud POST
    fetch('http://localhost:3000/ticketCode/usuario', method)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo crear el usuario');
        }
        return response.json();
      })
      .then(newUser => {
        console.log('Respuesta:', newUser);
        //aca se puede mostrar desde el index que se creo el usuario
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

