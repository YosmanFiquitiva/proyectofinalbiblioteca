const express = require('express');
const router = express.Router();
const { decodeJwt } = require("./jwtAuth");


router.use(async (req,res,next) => {
    try {

        const token = req.headers.authorization.split(' ').pop();      
        const payload = await decodeJwt(token);    
        if(payload.rol == 1){

            next();

        }else{

            return res.status(400).json({
                message: "NO TIENE NINGUN PERMISO PARA ENTRAR A ESTA PAGINA",
                code: -1
            })
        }

    }catch (error) {
       
        return res.status(400).json({
            message: "OCURRIO UN ERROR EN LA TRAIDA DE LOS DATOS",
            code: -1
        })
    }
    
})
module.exports = router;