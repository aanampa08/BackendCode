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

// IMPORTANTE ENVIAR TODAS LAS PETICIONES QUE QUERRAMOS PROBAR
module.exports={
    getAllConcerts
};