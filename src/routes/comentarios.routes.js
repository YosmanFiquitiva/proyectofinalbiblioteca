const express = require("express");
const router = express.Router();
const permissionClient = require("../utils/middlewareCliente");
const { decodeJwt } = require("../utils/jwtAuth")
const { getComentarioUser , createComentario , updateComentario , deleteComentario} = require("../controllers/comentarios.controller")

router.get ("/misComentarios", async ( req , res ) => {
    try {

        const token = req.headers.authorization.split(' ').pop();
        
        const payload = await decodeJwt(token); 
        
       
        const clientes = await getComentarioUser( payload.id_usuario );  
        
        if(clientes){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA DE COMENTARIOS",
            code : 1,
            clientes

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE CLIENTES",
            code: -1
        })        
    }
})

router.post ("/createComentario", async ( req , res ) => {
    try {
        
        const {  id_libro , num_estrellas , des_comentario } = req.body;

        const campos = [
            {
                nombre: "id_libro",
                valor: id_libro
            },
            {
                nombre: "num_estrellas",
                valor: num_estrellas
            },
            {
                nombre: "des_comentario",
                valor: des_comentario
            }
        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(400).json({
                message : `NO INGRESO EL CAMPO :  ${campoVacio.nombre} `,
                code : -1
            });
        }
        const token = req.headers.authorization.split(' ').pop();        
        const payload = await decodeJwt(token);         
        console.log(payload);
        const comentarios = await createComentario(req, payload.id_usuario);
        
        if(comentarios){

            return res.status(200).json({
                message: "CREACION DEL LIBRO EN LA BASE DE DATOS A SIDO EXITOSO",
                code: 1
            });

        }

    } catch (error) {

        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE LIBROS",
            code: -1
        })  

    }
})

router.put ("/updateComentario/:id_comentario?", async ( req , res) => {
    try {
        
        const {  id_libro , num_estrellas , des_comentario } = req.body;

        const campos = [
            {
                nombre: "id_libro",
                valor: id_libro
            },
            {
                nombre: "num_estrellas",
                valor: num_estrellas
            },
            {
                nombre: "des_comentario",
                valor: des_comentario
            }
        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(400).json({
                message : `NO INGRESO EL CAMPO :  ${campoVacio.nombre} `,
                code : -1
            });
        }

        const id_comentario = req.params.id_comentario;        
        
        if(isNaN(parseInt(id_comentario))){

            return res.status(400).json({
                message: `${ id_comentario } NO SE ENCUENTRA EN NINGUNA DE LAS RUTAS EXISTENTES`,
                code: -1
            });
        } 
        const token = req.headers.authorization.split(' ').pop();        
        const payload = await decodeJwt(token);         
        
       
        const comentarios = await updateComentario( req , payload.id_usuario ,id_comentario );
        
        if (comentarios) {

            return res.status(200).json({
                message: "EL COMENTARIO HA SIDO ACTUALIZADO CORRECTAMENTE",
                code: 1,
                comentarios
            });
        }
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE COMENTARIOS",
            code: -1
        })  

    }
})

router.delete("/deleteComentario/:id_comentario?", async ( req , res) => {
    
    try {

        const id_comentario = req.params.id_comentario;        
        
        if(isNaN(parseInt(id_comentario))){

            return res.status(400).json({
                message: `${ id_comentario } NO ES VALIDO, DEBE SER NUMERICO`,
                code: -1
            });
        } 
       
        const token = req.headers.authorization.split(' ').pop();        
        const payload = await decodeJwt(token);    
        
        const comentarios = await deleteComentario(id_comentario , payload.id_usuario);
        
        if (comentarios) {

            return res.status(200).json({
                message: "EL COMENTARIO HA SIDO ELIMINADO CORRECTAMENTE",
                code: 1,
                comentarios
            });
        } 
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE COMENTARIOS",
            code: -1
        }) 

    }
})

module.exports = router;