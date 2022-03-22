const pool = require("../../database/dbConnection");


/*
TODO  CODIGOS DONDE EL CLIENTE TIENE PERMISO
*/


const getPrestamoUser = async (id_cliente) => {
    try {

        const comentario = await pool.query(`SELECT * FROM prestamos WHERE id_usuario = $1`,[id_cliente]);
        
        return comentario.rows;

    } catch (error) {

        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const createPrestamo = async ( req , id_cliente) =>{
    try {
        
        const {  id_libro , des_prestamo } = req.body;            
        
        let prestamos = await pool.query(`SELECT * FROM f_create_prestamos($1, $2, $3);`,[ id_cliente , id_libro , des_prestamo ]);
        console.log(prestamos.rows);
        return prestamos.rows;

    } catch (error) {
        
        throw new error(console.log(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`));

    }
}

const deletePrestamo = async ( id_prestamo , id_cliente) => {
    try {
        
        const prestamo = await pool.query(`SELECT * FROM f_delete_prestamos($1, $2);`,[ id_prestamo , id_cliente ]);
        
        if(JSON.stringify(prestamo.rows) === '[]') {

            prestamo = null;                                   
            return prestamo;

        }else{
            
            return prestamo.rows[0];   
        } 
    } catch (error) {

        throw new Error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}


/*
TODO  CODIGOS DONDE EL BIBLIOTECARIO TIENE PERMISO
*/

const updatePrestamo = async ( req , id_prestamo , id_usuario , rol) => {
    try {
        if (rol == 1) {
            
            const {  id_libro , des_prestamo } = req.body;        
            const pre_aprobado = false;
            
            const prestamo = await pool.query(`SELECT * FROM f_update_prestamos($1, $2, $3, $4, $5, $6);`,
                [id_prestamo , id_usuario , id_libro , rol , des_prestamo , pre_aprobado ]);
            
            if(JSON.stringify(prestamo.rows) === '[]') {

                prestamo = null;                                   
                return prestamo;

            }else{
                
                return prestamo.rows[0];   
            }   
        }
        if (rol == 2) {
            const {  id_libro , des_prestamo , pre_aprobado } = req.body;
            
            const prestamo = await pool.query(`SELECT * FROM f_update_prestamos($1, $2, $3, $4, $5, $6);`,
                [id_prestamo , id_usuario , id_libro , rol , des_prestamo , pre_aprobado ]);
                
            if(JSON.stringify(prestamo.rows) === '[]') {

                prestamo = null;                                   
                return prestamo;

            }else{
                
                return prestamo.rows[0];   
            }   
        }
        
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }   
}

module.exports = { createPrestamo , getPrestamoUser , deletePrestamo , updatePrestamo };