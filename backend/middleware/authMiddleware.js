const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Middleware de autenticacion
module.exports=(req,res,next) => {
    // obtiene el token del encabezado de autorizacion
    const authHeader= req.headers['authorization'];
    // si no hay un token en el encabezado
    if(!authHeader) return res.status(403).send({auth:false,message:'No se proveyo un token'});

    // extreamos el token del encabezado
    const token=authHeader.split(' ')[1];
    if(!token) return res.status(403).send({auth:false,message:'Token malformado'});

    // verifica el token usando la clave secreta
    jwt.verify(token,config.secretKey,(err,decoded) => {
        if(err) return res.status(500).send({auth:false, message:'Fallo la autenticacion del token'});


        // si el token es valido, almacena el id del usuario decodificado en la solicitud
        req.userId = decoded.id;
        // llama a la siguiente funcion de middleware o controlador
        next();
    });
};

