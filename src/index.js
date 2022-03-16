const express = require("express");
require ("dotenv").config({path: ".env"});
const app = express();

app.use(express.json());

app.use('/',require("./routes/login.routes"));
app.use('/',require("./routes/usuarios.routes"));

app.listen(process.env.PORT,() => {
    console.log("EL SERVIDOR SE CONECTO AL PUERTO " + process.env.PORT);
});