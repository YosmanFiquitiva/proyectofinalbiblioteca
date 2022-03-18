const pool = require("../../database/dbConnection");


const getAllclasificacion = async ( ) => {
    try {
        console.log ("hola");
        const clasificacion = await pool.query("SELECT * FROM clasificaciones");
        
        return clasificacion.rows;

    } catch (error) {

        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getclasificacionId = async ( id_clasificacion ) => {
    try {
        
        const clasificacion = await pool.query(`SELECT * FROM clasificaciones WHERE id_clasificacion = $1`,[id_clasificacion]);  
        
        if(JSON.stringify(clasificacion.rows) === '[]') {
            
            clasificacion = null;
            return clasificacion;

        }else{
            
            return clasificacion.rows;   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

module.exports = { getAllclasificacion , getclasificacionId };