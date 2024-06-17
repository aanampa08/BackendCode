/*Puntos a tener en cuenta:
instalar desde cmd: npm init -y
                    npm install express
                    npm install nodemon
                    npm install mysql2 --> solo va a funcionar si tenemos mysql

podemos ejecutar con: npm start --> esta configurado el script
para cerrar la conexion: ctrl + c (2 veces)
IMPORTANTE: el backend debe estar corriendo antes de ejecutar el frontend con el live server
*/  
// creamos dependencia con express
const express = require('express');
const rutasTicket= require('../routes/rutasTicketCode');

const app = express();

// Creacion de un proxy para evitar problemas con CORS Policity
// + info: basicamente, al tener al cliente y servidor en distintos puertos se generan algunos inconvenientes
// con este codigo creamos un Proxy el cual interactua como intermediario entre ambos.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//creamos dependencia para usar json
app.use(express.json());
//creamos middleare para gestionar las rutas que tengan
app.use('/ticketCode',rutasTicket);

//declaramos el puerto donde vamos a correr el back
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo exitosamente en el puerto: ${PORT}`);
})