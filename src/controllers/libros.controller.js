const pool = require("../../database/dbConnection");

/*
TODO  CODIGOS DONDE EL CLIENTE TIENE PERMISO
*/


const getSearchAutor = async ( palabra_buscar ) => {
    try {
        const palabra = '%' + palabra_buscar + '%';
        const buscarAutor = await pool.query(`SELECT * FROM f_search_autor ($1)`,[ palabra ]);  
        if(JSON.stringify(buscarAutor.rows) === '[]') {
            
            buscarAutor = null; 
                                   
            return buscarAutor;

        }else{
            
            return buscarAutor.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getSearchCalificacion = async ( palabra_buscar ) => {
    try {
        const palabra = '%' + palabra_buscar + '%';
        const buscarCalificacion = await pool.query(`SELECT * FROM f_search_calificacion ($1)`,[ palabra ]);  
        if(JSON.stringify(buscarCalificacion.rows) === '[]') {
            
            buscarCalificacion = null; 
                                   
            return buscarCalificacion;

        }else{
            
            return buscarCalificacion.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getSearchFecha = async ( palabra_buscar ) => {
    try {
        
        const buscarFecha = await pool.query(`SELECT * FROM f_search_fecha ($1)`,[ palabra_buscar ]);  
        if(JSON.stringify(buscarFecha.rows) === '[]') {
            
            buscarFecha = null; 
                                   
            return buscarFecha;

        }else{
            
            return buscarFecha.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getSearchEstrella = async ( palabra_buscar ) => {
    try {
        
        const buscarEstrella = await pool.query(`SELECT * FROM f_search_estrella ($1)`,[ palabra_buscar ]);  
        if(JSON.stringify(buscarEstrella.rows) === '[]') {
            
            buscarEstrella = null; 
                                   
            return buscarEstrella;

        }else{
            
            return buscarEstrella.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

/*
TODO  CODIGOS DONDE EL BIBLIOTECARIO TIENE PERMISO
*/

const getAllLibros = async ( ) => {
    try {

        const libro = await pool.query("SELECT * FROM libros");
        
        return libro.rows;

    } catch (error) {

        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getLibrosId = async ( id_libro ) => {
    try {

        const libro = await pool.query(`SELECT * FROM libros WHERE id_libro = $1`,[id_libro]);  
        if(JSON.stringify(libro.rows) === '[]') {
            
            libro = null; 
                                   
            return libro;

        }else{
            
            return libro.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getLibrosAutor = async ( id_autor ) => {
    try {

        const libro = await pool.query(`SELECT * FROM lib_aut WHERE  id_autor = $1`,[id_autor]);  
        if(JSON.stringify(libro.rows) === '[]') {
            
            libro = null; 
                                  
            return libro;

        }else{
            
            return libro.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getLibrosCalificacion = async ( id_calificacion ) => {
    try {
       
        const libro = await pool.query(`SELECT * FROM lib_cat WHERE id_calificacion = $1`,[id_calificacion]);  
        if(JSON.stringify(libro.rows) === '[]') {
            
            libro = null; 
                                  
            return libro;

        }else{
             
            return libro.rows; 
              
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const createLibro = async ( req ) => {
    try {
        
        const { titulo , id_autor , edicion , codigo_isbn , n_paginas , fecha_publicacion , id_calificacion } = req.body;              
        
        let usuarios = await pool.query(`SELECT * FROM f_create_libro($1, $2, $3, $4, $5, $6, $7);`,[ titulo , id_autor , edicion , codigo_isbn , n_paginas , fecha_publicacion , id_calificacion ]);
        return usuarios;

    } catch (error) {
        
        throw new error(console.log(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`));

    }
}

const updateLibro = async ( req , id_libro ) => {
    try {
        const { titulo , id_autor , edicion , codigo_isbn , n_paginas , fecha_publicacion , id_calificacion } = req.body;        
            
        const libro = await pool.query(`SELECT * FROM f_update_libro($1, $2, $3, $4, $5, $6, $7, $8);`,
            [ id_libro , titulo , id_autor , edicion , codigo_isbn , n_paginas , fecha_publicacion , id_calificacion ]);
            
        if(JSON.stringify(libro.rows) === '[]') {

            libro = null;                                   
            return libro;

        }else{
            
            return libro.rows[0];   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }   
}

const deleteLibro = async ( id_libro ) => {
    try {
        
        const libro = await pool.query(`SELECT * FROM f_delete_libro($1);`,[ id_libro ]);
       
        if(JSON.stringify(libro.rows) === '[]') {

            libro = null;                                   
            return libro;

        }else{
            
            return libro.rows[0];   
        } 
    } catch (error) {

        throw new Error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

module.exports = { getAllLibros,  getLibrosId , getLibrosAutor , getLibrosCalificacion , createLibro , updateLibro , deleteLibro ,
     getSearchAutor , getSearchCalificacion , getSearchFecha , getSearchEstrella };