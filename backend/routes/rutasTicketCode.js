const express = require('express');
const router = express.Router();
const ticketCode = require('../controller/ticketCode');


//Generamos las rutas, y llamamos el desarrollo que va a realizar la peticion
router.get('/',ticketCode.getAllConcerts);
router.post('/usuario',ticketCode.createUser);
console.log("HOLLAAAAA");
router.get('/:usuario/:contraseña',ticketCode.searchUser);
module.exports=router;