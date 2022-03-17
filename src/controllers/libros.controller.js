const pool = require("../../database/dbConnection");


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

const createLibro = async ( req ) =>{
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
        console.log("aqui");
        const libro = await pool.query(`SELECT * FROM f_delete_libro($1);`,[ id_libro ]);
        console.log ("aqui");
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

module.exports = { getAllLibros,  getLibrosId , getLibrosAutor , getLibrosCalificacion , createLibro , updateLibro , deleteLibro};