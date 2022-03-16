const pool = require("../../database/dbConnection");
 
const getAllUsers = async ( ) => {
    try {

        const usuario = await pool.query("SELECT * FROM usuarios");
        console.log(usuario.rows);
        return usuario.rows;

    } catch (error) {
        throw new error(`OCURRIO UN ERROR GRAVE ${error}`);
    }
}

module.exports = {getAllUsers};