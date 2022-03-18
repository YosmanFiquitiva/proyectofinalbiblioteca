const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/login.controller");
const { generarJwt } = require("../utils/jwtAuth");

router.post ('/', async ( req , res ) =>{
    try {
        const { correo , password } = req.body;

        const campos = [
            {
                nombre: "correo",
                valor: correo
            },
            {
                nombre: "password",
                valor: password
            }
        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(404).json({
                message : `No ingreso el campo ${campoVacio.nombre}`,
                code : -1
            });
        }
        
        const userlogued = await loginUser ( correo , password );

        if (userlogued) {

            const payload = {
                id_usuario : userlogued.id_usuario,
                nombre : userlogued.nombre,
                apellido : userlogued.apellido,
                correo : userlogued.correo,
                rol : userlogued.id_rol 
            }
            
            const token = await generarJwt(payload);
            
            if (userlogued.id_rol === 1) {
                return res.status(200).json({
                    message: "El usuario se logueó correctamente!  BIENVENIDO CLIENTE",
                    token,
                    code: 1
                })
            }else if(userlogued.id_rol === 2){
                return res.status(200).json({
                    message: "El usuario se logueó correctamente!  BIENVENIDO BIBLIOTECARIO",
                    token,
                    code: 1
                })
            }else{
                return res.status(500).json({
                    message: "El usuario no tiene un rol para ingresar ",                    
                    code: -1
                })
            }

        }
    } catch (error) {
        res.status(500).json({
            message : 'No se pudo ingresar el usuario',
            code: -1
        })
    }
})

module.exports = router;