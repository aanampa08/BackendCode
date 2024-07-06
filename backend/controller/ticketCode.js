const db = require('../db/db');

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
    const sql = 'INSERT INTO cliente(Usuario,Contraseña,Dni,Nombre,Apellido,Mail,Telefono)VALUES(?,?,?,?,?,?,?)';
    db.query(sql,[usuario,contraseña,dni,nombre,apellido,mail,telefono],(err, result) => {
        if(err) throw err;
        res.json({message:'Usuario creado.'});
    });

}

const searchUser = (req, res) => {
   const {usuario,contraseña}=req.body;
   const sql = 'SELECT usuario,contraseña from cliente where usuario=? and contraseña=?';
   db.query(sql,[usuario,contraseña],(err,results) => {
    if(err) throw err;
    if(results.length > 0){
        res.json({estado:true});
    }
    else{
        res.json({estado:false});
    }
   })
};

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
    ,searchUser
    ,getConcertById
    ,createCompra
    ,getAlltickets
    ,getAllcompras
};