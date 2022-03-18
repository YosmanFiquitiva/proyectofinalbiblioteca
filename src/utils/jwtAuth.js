const jwt = require("jsonwebtoken");

//generar un token para el usuario
const generarJwt = async (payload) =>{
    try {
        
        const tokenGenerado = jwt.sign(
            payload,
            "" + process.env.SECRETPRIVATEKEY,
            { expiresIn: '5h' }
        )  

        return tokenGenerado;

    } catch (error) {
        
        throw new Error ( "ERROR AL GENERAR EL TOKEN " )
    }
   
}

//Autorizacion del token enviado
const verificarJwt = async ( token ) =>{
    try {

        const payload = jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);
        
        return payload;
        
    } catch (error) {

        throw new Error ( "ERROR AL GENERAR EL TOKEN " )
    }
    
}

const decodeJwt = async ( token ) =>{
    try {

        const payload = jwt.decode(token);    
        return payload;
        
    } catch (error) {

        throw new Error ( "ERROR AL GENERAR EL TOKEN " )
    }
    
}
module.exports = { generarJwt, verificarJwt , decodeJwt};