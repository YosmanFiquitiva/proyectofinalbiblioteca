const express = require("express");

const router = express.Router();
const { getAllUsers } = require("../controllers/usuarios.controller");



router.get("/users" , async ( req , res ) =>{
    try {

        const usuarios = await getAllUsers();
        return res.status(200).json({
            message : "SE HA CONSULTADO CON EXITO EN LA TABLA DE USUARIOS",
            usuarios,
            code : 1
        })

    } catch (error) {

        return res.status(500).json({
            message : 'No se pudo ingresar el usuario',
            code: -1
        })
    }
})

module.exports = router;