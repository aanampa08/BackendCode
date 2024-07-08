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
const cors = require('cors');
const rutasTicket= require('../routes/rutasTicketCode');
const app = express();

app.use(cors());
//creamos dependencia para usar json
app.use(express.json());
//creamos middleare para gestionar las rutas que tengan
app.use('/ticketCode',rutasTicket);

//declaramos el puerto donde vamos a correr el back
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo exitosamente en el puerto: ${PORT}`);
});