const express = require("express");
const router = express.Router();
const { getAllLibros , getLibrosId , getLibrosAutor , getLibrosCalificacion , createLibro , updateLibro , deleteLibro} = require("../controllers/libros.controller");

router.get("/" , async ( req , res ) =>{
    try {

        const libros = await getAllLibros();
        return res.status(200).json({
            message : "SE HA CONSULTADO CON EXITO EN LA TABLA DE LIBROS",
            libros,
            code : 1
        })

    } catch (error) {

        return res.status(500).json({
            message : 'NO SE HA PODIDO INGRESAR A LA TABLA DE LIBROS',
            code: -1
        })
    }
})

router.get ("/:id_libro?", async ( req , res ) => {
    try {

        const id_libro = req.params.id_libro;        
        
        if(isNaN(parseInt(id_libro))){

            return res.status(400).json({
                message: `${ id_libro } NO SE ENCUENTRA EN NINGUNA DE LAS RUTAS EXISTENTES`,
                code: -1
            });

        }  
        const libros = await getLibrosId( id_libro );  
        console.log(libros);
        if(libros){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA POR ID_LIBRO",
            code : 1,
            libros

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE LIBROS",
            code: -1
        })        
    }
})

router.get ("/autor/:id_autor?", async ( req , res ) => {
    try {

        const id_autor = req.params.id_autor;        
        
        if(isNaN(parseInt(id_autor))){

            return res.status(400).json({
                message: `${ id_autor } NO ES VALIDO, TIENE QUE SER NUMERICO`,
                code : -1
            });

        }  
        const libros = await getLibrosAutor(id_autor);  

        if(libros){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA POR ID_AUTOR",
            code: 1,
            libros

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE LIBROS",
            code: -1
        })        
    }
})

router.get ("/calificacion/:id_calificacion?", async ( req , res ) => {
    try {
       
        const id_calificacion = req.params.id_calificacion;        
        
        if(isNaN(parseInt(id_calificacion))){

            return res.status(400).json({
                message: `${ id_calificacion } NO ES VALIDO, TIENE QUE SER NUMERICO`,
                code : -1
            });

        }  
        
        const libros = await getLibrosCalificacion(id_calificacion);  

        if(libros){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA POR ID_CALIFICACION",
            code: 1,
            libros

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE LIBROS",
            code: -1
        })        
    }
})

router.post ("/createLibro", async ( req , res ) => {
    try {
        
        const { titulo , id_autor , edicion , codigo_isbn , n_paginas , fecha_publicacion , id_calificacion } = req.body;

        const campos = [
            {
                nombre: "titulo",
                valor: titulo
            },
            {
                nombre: "id_autor",
                valor: id_autor
            },
            {
                nombre: "edicion",
                valor: edicion
            },
            {
                nombre: "codigo_isbn",
                valor: codigo_isbn
            },
            {
                nombre: "n_paginas",
                valor: n_paginas
            },
            {
                nombre: "fecha_publicacion",
                valor: fecha_publicacion
            },
            {
                nombre: "id_calificacion",
                valor: id_calificacion
            }

        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(400).json({
                message : `NO INGRESO EL CAMPO :  ${campoVacio.nombre} `,
                code : -1
            });
        }
        
        const libros = await createLibro(req);
        
        if(libros){

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

router.put ("/updateLibro/:id_libro?", async ( req , res) => {
    try {
        
        const { titulo , id_autor , edicion , codigo_isbn , n_paginas , fecha_publicacion , id_calificacion } = req.body;

        const campos = [
            {
                nombre: "titulo",
                valor: titulo
            },
            {
                nombre: "id_autor",
                valor: id_autor
            },
            {
                nombre: "edicion",
                valor: edicion
            },
            {
                nombre: "codigo_isbn",
                valor: codigo_isbn
            },
            {
                nombre: "n_paginas",
                valor: n_paginas
            },
            {
                nombre: "fecha_publicacion",
                valor: fecha_publicacion
            },
            {
                nombre: "id_calificacion",
                valor: id_calificacion
            }

        ];

        const campoVacio = campos.find(i => !i.valor);

        if (campoVacio) {
            
            return res.status(404).json({
                message : `NO INGRESO EL CAMPO : " ${campoVacio.nombre} "`,
                code : -1
            });
        }

        const id_libro = req.params.id_libro;        
        
        if(isNaN(parseInt(id_libro))){

            return res.status(400).json({
                message: `${ id_libro } NO SE ENCUENTRA EN NINGUNA DE LAS RUTAS EXISTENTES`,
                code: -1
            });
        } 

        const libros = updateLibro( req , id_libro );

        if (libros) {

            return res.status(200).json({
                message: "EL LIBRO HA SIDO ACTUALIZADO CORRECTAMENTE",
                code: 1,
                libros
            });
        }
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE lIBROS",
            code: -1
        })  

    }
})

router.delete("/deleteLibro/:id_libro?", async ( req , res) => {
    
    try {

        const id_libro = req.params.id_libro;        
        
        if(isNaN(parseInt(id_libro))){

            return res.status(400).json({
                message: `${ id_libro } NO ES VALIDO, DEBE SER NUMERICO`,
                code: -1
            });
        } 
       
        const libros = await deleteLibro(id_libro);
        
        if (libros) {

            return res.status(200).json({
                message: "EL Libro HA SIDO ELIMINADO CORRECTAMENTE",
                code: 1,
                libros
            });
        } 
        
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE LIBROS",
            code: -1
        }) 

    }
})
module.exports = router;