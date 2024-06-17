// importamos el modulo de mysql
const mysql = require('mysql2');
//creamos la conexion
const connection = mysql.createConnection({
    host: 'localhost'
    ,user:'root'
    ,password:'123456'
    ,database:'TicketCode'
});

connection.connect((err)=>{
    if(err){
        console.error("db.js --> Error en la conexion con la base de datos");
    }
    console.log("db.js --> Conexion a la base exitosamente.");
});

//exporto db para poder ser usada por ticketCode.js
module.exports=connection;