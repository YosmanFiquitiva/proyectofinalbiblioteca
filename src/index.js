const express = require("express");
const app = express();
require ("dotenv").config({path: ".env"});


app.use(express.json());


app.use('/login',require("./routes/login.routes"));
//app.use (require("./utils/middlewareToken"));
app.use('/users', require("./routes/usuarios.routes"));
app.use('/books', require("./routes/libros.routes"));


app.listen(process.env.PORT,() => {
    console.log("EL SERVIDOR SE CONECTO AL PUERTO " + process.env.PORT);
});