const express = require('express');
const router = express.Router();
const { verificarJwt } = require("./jwtAuth");


router.use(async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();          
        const payload = await verificarJwt(token);
        if(payload.rol == 2){

            next();

            }else{

                return res.status(400).json({
                    message: "NO TIENE NINGUN PERMISO PARA ENTRAR A ESTA PAGINA",
                    code: -1
                })
            }

        }catch (error) {
            throw new Error("hola")
        }
    
})
module.exports = router;