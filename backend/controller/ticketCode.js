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
    const usuario = req.params.usuario;
    const contraseña = req.params.contraseña;
    const sql = 'SELECT usuario, contraseña FROM cliente WHERE usuario = ? AND contraseña = ?';
    console.log(usuario);
    db.query(sql, [usuario, contraseña], (err, result) => {
        if (err) {
            // Manejar el error, por ejemplo:
            console.error('Error al buscar usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Si no hay error y se encontró un usuario
        if (result.length > 0) {
            res.json({ message: 'Usuario encontrado', usuario: result[0].usuario, contraseña: result[0].contraseña });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
};

// IMPORTANTE ENVIAR TODAS LAS PETICIONES QUE QUERRAMOS PROBAR
module.exports={
    getAllConcerts
    ,createUser
    ,searchUser
};