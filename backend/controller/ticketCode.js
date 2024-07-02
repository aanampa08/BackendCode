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
    console.log("llego al createUser");
    const {usuario,contraseña,dni,nombre,apellido,mail,telefono} = req.body;
    const sql = 'INSERT INTO cliente(Usuario,Contraseña,Dni,Nombre,Apellido,Mail,Telefono)VALUES(?,?,?,?,?,?,?)';
    db.query(sql,[usuario,contraseña,dni,nombre,apellido,mail,telefono],(err, result) => {
        if(err) throw err;
        res.json({message:'Usuario creado.'});
    });

}

// IMPORTANTE ENVIAR TODAS LAS PETICIONES QUE QUERRAMOS PROBAR
module.exports={
    getAllConcerts
    ,createUser
};