const express = require('express');
const router = express.Router();
const ticketCode = require('../controller/ticketCode');


//Generamos las rutas, y llamamos el desarrollo que va a realizar la peticion
router.get('/conciertos',ticketCode.getAllConcerts);
router.post('/usuario',ticketCode.createUser);
router.post('/login',ticketCode.loginUser);
router.get('/infoUser',ticketCode.getInfoUser);
router.put('/usuario/:id',ticketCode.updateUser);
router.get('/concierto/:id',ticketCode.getConcertById);
router.post('/compra',ticketCode.createCompra);
router.get('/compras/:id',ticketCode.getAllcompras);
router.delete('/compra/:idCompra',ticketCode.deleteCompra);
router.get('/ticket',ticketCode.getAlltickets);
module.exports=router;