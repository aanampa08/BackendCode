// -------------- FETCH POST PARA CREAR UN NUEVO USUARIO -----------------------------------------
document.getElementById('formRegistro').addEventListener('submit', function (event) {
  // Evitar el envío del formulario
  event.preventDefault();

  const realizado = document.getElementById("registroExitoso");
  realizado.textContent = "*Usuario registrado con exito";
  setTimeout(() => {
    realizado.textContent = "";
  }, "4000");
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


// --------------------------- FETCH POST PARA EL LOGIN DEL USUARIO

document.getElementById('formInicio').addEventListener('submit', function (event) {
  // Evitar el envío del formulario
  event.preventDefault();

  // Consigo los datos del formulario
  const usuario = document.getElementById('usuarioID').value;
  const contraseña = document.getElementById('contraseñaID').value;
  const dataUser = {
    usuario: usuario,
    contraseña: contraseña,
  };

  // Configuración de la solicitud
  const method = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataUser)
  };

  // Hacer la solicitud POST
  fetch('http://localhost:3000/ticketCode/login', method)
    .then(response => {
      if (!response.ok) {
        throw new Error('front POST: no se pudo encontrar la ruta');
      }
      return response.json();
    })
    .then(resultado => {
      const inicioError = document.getElementById("usuarioInvalido");
      if (resultado.auth && resultado.token) {
        //guardamos el token en el storage
        localStorage.setItem('token', resultado.token);
        window.location.href = "./index.html";
        console.log("se hizo el loguin");
      }
      else {
        console.error('error de inicio de sesion: ', resultado);
        inicioError.textContent = "*Usuario y/o contraseña invalida";
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });
});
