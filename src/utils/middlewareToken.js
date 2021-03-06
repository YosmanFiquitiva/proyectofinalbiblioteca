const express = require("express");
const router = express.Router();
const { verificarJwt } = require("./jwtAuth");

router.use(async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(400).json({
                message: "Debe enviar el token generado!",
                code: -1
            })
        }

        const token = authHeader.split(' ').pop();

        const payload = await verificarJwt(token);
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Hubo un error al intentar verificar token",
            code: -1
        })
    }
})

module.exports = router;