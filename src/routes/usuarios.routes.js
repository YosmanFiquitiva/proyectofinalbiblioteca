const express = require("express");
const router = express.Router();
const { getAllUsers , getUsersRol , getUsersId , createUser , updateUser , deleteUser } = require("../controllers/usuarios.controller");



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

router.get ("/users/rol/:id_rol?", async ( req , res ) => {
    try {

        const id_rol = req.params.id_rol;        
        
        if(isNaN(parseInt(id_rol))){

            return res.status(400).json({
                message: `${ id_rol } no es valido, debe ser NUMERICO`,
                code : -1
            });

        }  
        const usuarios = await getUsersRol(id_rol);  

        if(usuarios){

            return res.status(200).json({
            message: "Consulta exitosa por el id_rol",
            code: 1,
            usuarios

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE USUARIOS",
            code: -1
        })        
    }
})

router.get ("/users/:id_usuario?", async ( req , res ) => {
    try {

        const id_usuario = req.params.id_usuario;        
        
        if(isNaN(parseInt(id_usuario))){

            return res.status(400).json({
                message: `${ id_usuario } NO SE ENCUENTRA EN NINGUNA DE LAS RUTAS EXISTENTES`,
                code: -1
            });

        }  
        const usuarios = await getUsersId(id_usuario);  

        if(usuarios){

            return res.status(200).json({
            message: "Consulta exitosa por el id_rol",
            code : 1,
            usuarios

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE USUARIOS",
            code: -1
        })        
    }
})

router.post ("/users/createUser", async ( req , res ) => {
    try {
        
        const { nombre , apellido , correo , num_cedula , pass_user , id_rol } = req.body;

        const campos = [
            {
                nombre: "nombre",
                valor: nombre
            },
            {
                nombre: "apellido",
                valor: apellido
            },
            {
                nombre: "correo",
                valor: correo
            },
            {
                nombre: "num_cedula",
                valor: num_cedula
            },
            {
                nombre: "pass_user",
                valor: pass_user
            },
            {
                nombre: "id_rol",
                valor: id_rol
            }

        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(400).json({
                message : `No ingreso el campo ${campoVacio.nombre}`,
                code : -1
            });
        }
        
        const usuarios = await createUser(req);
        
        if(usuarios){

            return res.status(200).json({
                message: "CREACION DE USUARIO EN LA BASE DE DATOS A SIDO EXITOSO",
                code: 1
            });

        }

    } catch (error) {

        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE USUARIOS",
            code: -1
        })  

    }
})

router.put ("/users/updateUser/:id_usuario?", async ( req , res) => {
    try {
        
        const { nombre , apellido , correo , num_cedula , pass_user , id_rol } = req.body;

        const campos = [
            {
                nombre: "nombre",
                valor: nombre
            },
            {
                nombre: "apellido",
                valor: apellido
            },
            {
                nombre: "correo",
                valor: correo
            },
            {
                nombre: "num_cedula",
                valor: num_cedula
            },
            {
                nombre: "pass_user",
                valor: pass_user
            },
            {
                nombre: "id_rol",
                valor: id_rol
            }

        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(404).json({
                message : `No ingreso el campo ${campoVacio.nombre}`,
                code : -1
            });
        }

        const id_usuario = req.params.id_usuario;        
        
        if(isNaN(parseInt(id_usuario))){

            return res.status(400).json({
                message: `${ id_usuario } NO SE ENCUENTRA EN NINGUNA DE LAS RUTAS EXISTENTES`,
                code: -1
            });
        } 

        const usuarios = updateUser( req , id_usuario );

        if (usuarios) {

            return res.status(200).json({
                message: "EL USUARIO HA SIDO ACTUALIZADO CORRECTAMENTE",
                code: 1,
                usuarios
            });
        }
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE USUARIOS",
            code: -1
        })  

    }
})

router.delete("/users/deleteUser/:id_usuario?", async ( req , res) => {
    
    try {

        const id_usuario = req.params.id_usuario;        
        
        if(isNaN(parseInt(id_usuario))){

            return res.status(400).json({
                message: `${ id_usuario } NO ES VALIDO, DEBE SER NUMERICO`,
                code: -1
            });
        } 

        const usuarios = await deleteUser(id_usuario);

        if (usuarios) {

            return res.status(200).json({
                message: "EL USUARIO HA SIDO ELIMINADO CORRECTAMENTE",
                code: 1,
                usuarios
            });
        } 
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE USUARIOS",
            code: -1
        }) 

    }
})


module.exports = router;