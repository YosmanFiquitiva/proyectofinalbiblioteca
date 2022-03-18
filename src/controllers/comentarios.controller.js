const pool = require("../../database/dbConnection");


const getComentarioUser = async (id_cliente) => {
    try {

        const comentario = await pool.query(`SELECT * FROM comentarios WHERE id_cliente = $1`,[id_cliente]);
        
        return comentario.rows;

    } catch (error) {

        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const createComentario = async ( req , id_cliente) =>{
    try {
        
        const {  id_libro , num_estrellas , des_comentario } = req.body;              
        
        let comentarios = await pool.query(`SELECT * FROM f_create_comentarios($1, $2, $3, $4);`,[ id_cliente , id_libro , num_estrellas , des_comentario ]);
        console.log(comentarios.rows);
        return comentarios;

    } catch (error) {
        
        throw new error(console.log(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`));

    }
}

const updateComentario = async ( req , id_cliente , id_comentario ) => {
    try {
        const {  id_libro , num_estrellas , des_comentario } = req.body;        
            
        const comentario = await pool.query(`SELECT * FROM f_update_comentarios($1, $2, $3, $4, $5);`,
            [ id_comentario , id_cliente ,id_libro , num_estrellas , des_comentario ]);
            
        if(JSON.stringify(comentario.rows) === '[]') {

            comentario = null;                                   
            return comentario;

        }else{
            
            return comentario.rows[0];   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }   
}

const deleteComentario = async ( id_comentario, id_cliente) => {
    try {
        
        const comentario = await pool.query(`SELECT * FROM f_delete_comentarios($1, $2);`,[ id_comentario , id_cliente ]);
        
        if(JSON.stringify(comentario.rows) === '[]') {

            comentario = null;                                   
            return comentario;

        }else{
            
            return comentario.rows[0];   
        } 
    } catch (error) {

        throw new Error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

module.exports = { getComentarioUser , createComentario , updateComentario , deleteComentario};