const express = require("express");
const router = express.Router();
const { getAllclasificacion , getclasificacionId } = require("../controllers/clasificacion.controller");

router.get("/" , async ( req , res ) =>{
    try {

        const clasificacion = await getAllclasificacion();
        return res.status(200).json({
            message : "SE HA CONSULTADO CON EXITO EN LA TABLA DE CLASIFICACION",
            clasificacion,
            code : 1
        })

    } catch (error) {

        return res.status(500).json({
            message : 'NO SE HA PODIDO INGRESAR A LA TABLA DE CLASIFICACION',
            code: -1
        })
    }
})

router.get ("/:id_clasificacion?", async ( req , res ) => {
    try {

        const id_clasificacion = req.params.id_clasificacion;        
        
        if(isNaN(parseInt(id_clasificacion))){

            return res.status(400).json({
                message: `${ id_clasificacion } NO SE ENCUENTRA EN NINGUNA DE LAS RUTAS EXISTENTES`,
                code: -1
            });

        }  
        const clasificaciones = await getclasificacionId( id_clasificacion );  
        console.log(clasificaciones);
        if(clasificaciones){

            return res.status(200).json({
            message: "CONSULTA EXITOSA EN LA TABLA POR ID_CLASIFICACION",
            code : 1,
            clasificaciones

        })}
    } catch (error) {
        
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE CLASIFICACION",
            code: -1
        })        
    }
})

module.exports = router;