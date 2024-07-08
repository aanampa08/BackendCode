const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

//Desarrollamos acciones del sistema de la pagina
const getAllConcerts = (req,res) =>{
    const sql = 'SELECT * FROM Concierto';
    db.query(sql, (err,results)=>{
        if (err){
            console.log(`ticketCode.js --> error encontrado: ${err}`);
        };
        console.log("Estas accediendo los conciertos");
        res.json(results);
    });
}

const createUser = (req,res) => {
    const {usuario,contraseña,dni,nombre,apellido,mail,telefono} = req.body;
    const hashcontraseña = bcrypt.hashSync(contraseña,8);
    const sql = 'INSERT INTO cliente(Usuario,Contraseña,Dni,Nombre,Apellido,Mail,Telefono)VALUES(?,?,?,?,?,?,?)';
    db.query(sql,[usuario,hashcontraseña,dni,nombre,apellido,mail,telefono],(err, result) => {
        if(err) throw err;
        //genera un token para el nuevo usuario
        const token = jwt.sign({ id: result.insertId}, config.secretKey, { expiresIn: config.tokenExpiresIn });
        console.log(result.insertId);
        // res.json({message:'Usuario creado.'});
        console.log("Usuario creado");
        res.status(201).send({ auth: true, token });
    });

}

const loginUser = (req, res) => {
   const {usuario,contraseña}=req.body;
   const sql = 'SELECT * from cliente where usuario=?';
   db.query(sql,[usuario,contraseña],(err,results) => {
    if(err) throw err;
    if (results.length > 0) {
        const esValidacontraseña = bcrypt.compareSync(contraseña, results[0].Contraseña);
        if (!esValidacontraseña) return res.status(401).send({ auth: false, token: null });
        const token = jwt.sign({ id: results[0].idCliente,username: results[0].Usuario}, config.secretKey, { expiresIn: config.tokenExpiresIn });
        res.status(200).send({ auth: true, token });
    }
    else {
        res.json({ estado: false });
    }
   });
};

const getInfoUser = (req,res) => {
    // Obtener el token de la cabecera Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    // Si no se proporciona el token
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado.' });
    }
  
    // Verificar y decodificar el token
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido.' });
      }
  
      // Aquí puedo realizar consultas a la base de datos y obtener información del usuario
      // Por ahora, devolvemos la información decodificada del token
      const demo = jwt.decode(token);
      console.log(demo); // Aquí debería estar la información del usuario
      // Ejemplo: Actualizar el DOM con el nombre de usuario
      res.json(decoded);
    });
}

const getConcertById=(req,res)=>{
    const {id} = req.params;
    const sql='SELECT * FROM concierto WHERE idConcierto=?';
    db.query(sql, [id], (err, results) => {
        if (err){
            console.log(`ticketCode.js --> error encontrado: ${err}`);
        };
        console.log("Concierto encontrado.");
        res.json(results);
    });
}
const createCompra = (req,res) => {
    const {fecha,monto,usuario_id,concierto_id,ticketsid,tickets_precio} = req.body;
    const sql = 'INSERT INTO compra(Fecha,Monto,usuario_id) VALUES (?,?,?)';
    db.query(sql,[fecha,monto,usuario_id],(err, result) => {
        if(err) throw err;
        
        const compra_id = result.insertId;
        for(let i=0; i < ticketsid.length; i++){
            const sql1='INSERT INTO detalle_compra(compra_id,concierto_id,ticket_id,precio_unitario) VALUES(?,?,?,?)';
            db.query(sql1,[compra_id,concierto_id,ticketsid[i],tickets_precio[i]],(err, result) => {
                if(err) throw err;
            });
        }
        res.json({estado:true});

       
    });
}

const getAlltickets = (req,res) => {
    const sql = 'SELECT * FROM ticket';
    db.query(sql, (err,results)=>{
        if (err){
            console.log(`ticketCode.js --> error encontrado: ${err}`);
        };
        console.log("Estas accediendo a todos los tickets");
        res.json(results);
    });
}

const getAllcompras = (req,res) => {
    const {id} = req.params; 
    const sql = 'select * from cliente,compra where cliente.idCliente=? and compra.usuario_id=?';
    db.query(sql, [id,id], (err, resultado_compra) => {
        if (err)throw err;
        if(resultado_compra.length > 0){
            const idCompra=resultado_compra[0].idCompra;
            const monto=resultado_compra[0].Monto;
            const fecha=resultado_compra[0].Fecha;
            const sql_detalle='select compra_id,Nombre,sector,precio_unitario from ticket,detalle_compra,concierto where compra_id=? and ticket_id=idTicket and concierto.idConcierto=detalle_compra.concierto_id;';
            
            db.query(sql_detalle, [idCompra], (err, resultado_detalle_compra) => {
                if (err)throw err;
                
                res.json({idCompra,monto,fecha,resultado_detalle_compra});


                console.log("Compra encontrada.");
            });
        }
        else{
            res.json({mensaje:'No hay compras realizadas por el usuario'});
        }
       
    });
}

// IMPORTANTE ENVIAR TODAS LAS PETICIONES QUE QUERRAMOS PROBAR
module.exports={
    getAllConcerts
    ,createUser
    ,loginUser
    ,getInfoUser
    ,getConcertById
    ,createCompra
    ,getAlltickets
    ,getAllcompras
};