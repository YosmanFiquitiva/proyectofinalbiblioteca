const express = require("express");
const router = express.Router();
const { decodeJwt } = require("../utils/jwtAuth");
const { createPrestamo, getPrestamoUser, deletePrestamo, updatePrestamo } = require("../controllers/prestamos.controller");
const { SendEmail } = require("../utils/nodemailer");

const cliente = require("../utils/middlewareCliente");

router.get ("/misPrestamos", cliente , async ( req , res ) => {
    try {

        const token = req.headers.authorization.split(' ').pop();
        
        const payload = await decodeJwt(token); 
        
       
        const prestamos = await getPrestamoUser( payload.id_usuario );  
        
        if(prestamos){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA DE COMENTARIOS",
            code : 1,
            prestamos

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE CLIENTES",
            code: -1
        })        
    }
})

router.post ("/createprestamo", cliente , async ( req , res ) => {
    try {

        const {  id_libro , des_prestamo } = req.body;

        const campos = [
            {
                nombre: "id_libro",
                valor: id_libro
            },
            {
                nombre: "des_prestamo",
                valor: des_prestamo
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

        const prestamos = await createPrestamo( req , payload.id_usuario );

        if(prestamos){

            return res.status(200).json({
                message: "CREACION DEL PRESTAMO EN LA BASE DE DATOS A SIDO EXITOSO",
                code: 1,
                prestamos
            });

        }

    } catch (error) {

        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE LIBROS",
            code: -1
        })  
    }
})

router.put ("/updateprestamo/:id_prestamo?", async ( req , res ) => {
    try {

        const token = req.headers.authorization.split(' ').pop();        
        const payload = await decodeJwt(token);  
        const id_prestamo = req.params.id_prestamo;

        if (payload.rol == 1) {

            const {  id_libro , des_prestamo } = req.body;

            const campos = [
                {
                    nombre : "id_libro",
                    valor : id_libro
                },
                {
                    nombre : "des_prestamo",
                    valor : des_prestamo
                }
            ];

            const campoVacio = campos.find(i => !i.valor);

            if (campoVacio) {
                
                return res.status(400).json({
                    message : `NO INGRESO EL CAMPO :  ${campoVacio.nombre} `,
                    code : -1
                });
            }
        }

        if (payload.rol == 2) {

            const {  id_libro , des_prestamo , pre_aprobado } = req.body;

            const campos = [
                {
                    nombre : "id_libro",
                    valor : id_libro
                },
                {
                    nombre : "des_prestamo",
                    valor : des_prestamo
                },
                {
                    nombre : "pre_aprobado",
                    valor : pre_aprobado
                }
            ];

            const campoVacio = campos.find(i => !i.valor);

            if (campoVacio) {
                
                return res.status(400).json({
                    message : `NO INGRESO EL CAMPO :  ${campoVacio.nombre} `,
                    code : -1
                });
            }
        }
        
        const prestamos = await updatePrestamo ( req , id_prestamo , payload.id_usuario , payload.rol );
        
        if (prestamos.pre_aprobado = true) {
            
            await SendEmail(payload.correo , prestamos.id_usuario , res);
        }

        if (prestamos) {

            return res.status(200).json({
                message: "EL PRESTAMO HA SIDO ACTUALIZADO CORRECTAMENTE",
                code: 1,
                prestamos
            })
        }
        
    } catch (error) {

        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE COMENTARIOS",
            code: -1
        });
    }
})

router.delete("/deleteprestamo/:id_prestamo?", cliente , async ( req , res) => {
    
    try {

        const id_prestamo = req.params.id_prestamo;        
        
        if(isNaN(parseInt(id_prestamo))){

            return res.status(400).json({
                message: `${ id_prestamo } NO ES VALIDO, DEBE SER NUMERICO`,
                code: -1
            });
        } 
       
        const token = req.headers.authorization.split(' ').pop();        
        const payload = await decodeJwt(token);    
        
        const prestamos = await deletePrestamo ( id_prestamo , payload.id_usuario );
        
        if (prestamos) {

            return res.status(200).json({
                message: "EL PRESTAMO HA SIDO ELIMINADO CORRECTAMENTE",
                code: 1,
                prestamos
            });
        } 
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE PRESTAMOS",
            code: -1
        }) 

    }
})

module.exports = router;