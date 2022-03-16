const pool = require("../../database/dbConnection");
const bcrypt = require("bcrypt");

const loginUser = async ( correo , password ) => {
    try {
        let usuario = await pool.query(`SELECT * FROM usuarios WHERE correo = $1 and pass_user = $2`,[ correo , password]);

        if(JSON.stringify(usuario.rows) === '[]') {
            
            usuario = null;                        
            return usuario;

        }else{
            //const coinciden = await bcrypt.compare( password , usuario.rows[0].password);
            return usuario.rows[0];   
        }   

    } catch (error) {
        throw new Error(`Ocurrió un error: ${error}`);
    }

}

module.exports = { loginUser };