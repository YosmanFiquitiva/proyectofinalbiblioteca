const pool = require("../../database/dbConnection");
const bcrypt = require("bcrypt");

const loginUser = async ( correo , password ) => {
    try {
        let usuario = await pool.query(`SELECT * FROM usuarios WHERE correo = $1 `,[ correo ]);
        
        if(JSON.stringify(usuario.rows) === '[]') {
            
            usuario = null;                         
            return usuario;

        }else{ 
                      
            const coinciden = await bcrypt.compare( toString(password), usuario.rows[0].pass_user);
            
            if (coinciden) {
                
                usuario = usuario.rows[0];
                return usuario;    

            }else{
                
                usuario = null;
                return usuario;
                
            }
        }   

    } catch (error) {

        throw new Error(`Ocurrió un error: ${error}`);
    }

}

module.exports = { loginUser };