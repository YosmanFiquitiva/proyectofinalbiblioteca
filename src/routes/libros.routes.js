const express = require("express");
const router = express.Router();
const { getAllLibros , getLibrosId , getLibrosAutor , getLibrosCalificacion , createLibro , updateLibro , deleteLibro , getSearchAutor , getSearchCalificacion , getSearchFecha , getSearchEstrella} = require("../controllers/libros.controller");

const cliente = require("../utils/middlewareCliente");
const biblio = require("../utils/middlewareBiblio");

/*
TODO  CODIGOS DONDE EL CLIENTE TIENE PERMISO
*/


router.get ("/buscar/autor/:palabra_buscar?", cliente , async ( req , res ) => {
    try {

        const palabra_buscar = req.params.palabra_buscar;        
        if (palabra_buscar === undefined) {
            return res.status(400).json({
                message: "NO ENCONTRAMOS NINGUNA PALABRA O NUMERO EL EL BUSCADOR",
                code : -1,
                
            })
        }

        const autores = await getSearchAutor( palabra_buscar );
       

        if(autores){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA PARA LOS AUTORES",
            code : 1,
            autores
            })
        }
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE AUTORES",
            code: -1
        })        
    }
})

router.get ("/buscar/calificacion/:palabra_buscar?", cliente , async ( req , res ) => {
    try {

        const palabra_buscar = req.params.palabra_buscar;        
        if (palabra_buscar === undefined) {
            return res.status(400).json({
                message: "NO ENCONTRAMOS NINGUNA PALABRA O NUMERO EL EL BUSCADOR",
                code : -1,
                
            })
        }

        const calificaciones = await getSearchCalificacion( palabra_buscar );
       

        if(calificaciones){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA PARA LAS CALIFICACIONES",
            code : 1,
            calificaciones
            })
        }
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE CALIFICACIONES",
            code: -1
        })        
    }
})

router.get ("/buscar/fecha/:palabra_buscar?", cliente , async ( req , res ) => {
    try {

        const palabra_buscar = req.params.palabra_buscar;        
        if (palabra_buscar === undefined) {
            return res.status(400).json({
                message: "NO ENCONTRAMOS UNA FECHA PARA BUSCAR",
                code : -1,
                
            })
        }

        const fecha_publicacion = await getSearchFecha( palabra_buscar );
       

        if(fecha_publicacion){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA PARA LAS FECHAS",
            code : 1,
            fecha_publicacion
            })
        }
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE FECHAS",
            code: -1
        })        
    }
})

router.get ("/buscar/estrellas/:palabra_buscar?", cliente , async ( req , res ) => {
    try {

        const palabra_buscar = req.params.palabra_buscar;        
        if (palabra_buscar === undefined) {
            return res.status(400).json({
                message: "NO ENCONTRAMOS UN NUMERO DE ESTRELLAS, PORFAVOR COLOCAR UN PARAMETRO",
                code : -1,
                
            })
        }
        if(isNaN(parseInt(palabra_buscar))){

            return res.status(400).json({
                message: `${ palabra_buscar } NO ES VALIDO, TIENE QUE SER NUMERICO`,
                code : -1
            });

        } 

        const estrellas = await getSearchEstrella(parseInt(palabra_buscar));
       

        if(estrellas){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA POR EL NUMERO DE ESTRELLAS",
            code : 1,
            estrellas
            })
        }
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE ESTRELLAS",
            code: -1
        })        
    }
})





/*
TODO  CODIGOS DONDE EL BIBLIOTECARIO TIENE PERMISO
*/

router.get("/" , biblio , async ( req , res ) =>{
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

router.get ("/:id_libro?", biblio , async ( req , res ) => {
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

router.get ("/autor/:id_autor?", biblio , async ( req , res ) => {
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

router.get ("/calificacion/:id_calificacion?", biblio , async ( req , res ) => {
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

router.post ("/createLibro", biblio , async ( req , res ) => {
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

router.put ("/updateLibro/:id_libro?", biblio , async ( req , res) => {
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

router.delete("/deleteLibro/:id_libro?", biblio , async ( req , res) => {
    
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