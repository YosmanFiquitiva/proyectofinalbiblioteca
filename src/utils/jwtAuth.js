const jwt = require("jsonwebtoken");

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
    
    const payload = jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);

    return payload;
}

module.exports = { generarJwt, verificarJwt};