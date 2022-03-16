const jwt = require("jsonwebtoken");

const generarJwt = async (payload) =>{
    
    const tokenGenerado = jwt.sign(
        payload,
        "" + process.env.SECRETPRIVATEKEY,
        { expiresIn: '5h' }
    )

    return tokenGenerado;
}

//Autorizacion del token enviado
const verificarJwt = async (token) =>{

    const payload = jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);

    return payload;
}

module.exports = { generarJwt, verificarJwt};