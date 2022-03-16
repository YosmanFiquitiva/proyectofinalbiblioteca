const pool = require("../../database/dbConnection");
const bcrypt = require("bcrypt");

 
const getAllUsers = async ( ) => {
    try {

        const usuario = await pool.query("SELECT * FROM usuarios");
        
        return usuario.rows;

    } catch (error) {

        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const getUsersRol = async ( id_rol ) => {
    try {

        const usuario = await pool.query(`SELECT * FROM usuarios WHERE id_rol = $1`,[id_rol]);  
        if(JSON.stringify(usuario.rows) === '[]') {
            
            usuario = null; 
                                  
            return usuario;

        }else{
             //const coinciden = await bcrypt.compare( password , usuario.rows[0].password);
            return usuario.rows[0];   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const createUser = async ( req ) =>{
    try {
        
        const { nombre , apellido , correo , num_cedula , pass_user , id_rol } = req.body;              
        const passwordHash = await bcrypt.hash(toString(pass_user) , 10 );
        let usuarios = await pool.query(`SELECT * FROM f_create_usuario($1, $2, $3, $4, $5, $6);`,[ nombre , apellido , correo , num_cedula , passwordHash , id_rol ]);
        return usuarios;

    } catch (error) {
        
        throw new error(console.log(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`));

    }
}

const getUsersId = async ( id_usuario ) => {
    try {

        const usuario = await pool.query(`SELECT * FROM usuarios WHERE id_usuario = $1`,[id_usuario]);  
        if(JSON.stringify(usuario.rows) === '[]') {
            
            usuario = null; 
                                   
            return usuario;

        }else{
            
            return usuario.rows[0];   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

const updateUser = async ( req , id_usuario ) => {
    try {
        const { nombre , apellido , correo , num_cedula , pass_user , id_rol } = req.body;        
        const passwordHash = await bcrypt.hash(toString(pass_user) , 10 );
        
        const usuario = await pool.query(`SELECT * FROM f_update_usuario($1, $2, $3, $4, $5, $6, $7);`,
            [ id_usuario , nombre , apellido , correo , num_cedula , passwordHash , id_rol ]);
            
        if(JSON.stringify(usuario.rows) === '[]') {

            usuario = null;                                   
            return usuario;

        }else{
            
            return usuario.rows[0];   
        }   
    } catch (error) {
        
        throw new error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }   
}

const deleteUser = async ( id_usuario ) => {
    try {
        
        const usuario = await pool.query(`SELECT * FROM f_delete_usuario($1);`,[ id_usuario ]);

        if(JSON.stringify(usuario.rows) === '[]') {

            usuario = null;                                   
            return usuario;

        }else{
            
            return usuario.rows[0];   
        } 
    } catch (error) {

        throw new Error(`OCURRIO UN ERROR GRAVE EN LA BASE DE DATOS ${error}`);

    }
}

module.exports = { getAllUsers , getUsersRol , getUsersId , createUser , updateUser , deleteUser};