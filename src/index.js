require ("dotenv").config({path: ".env"});

const express = require("express");
const app = express();
const cliente = require("./utils/middlewareCliente");
const biblio = require("./utils/middlewareBiblio");


app.use(express.json());


app.use('/login',require("./routes/login.routes"));
app.use('/users',require("./routes/usuarios.routes"));

app.use (require("./utils/middlewareToken"));
app.use('/books',require("./routes/libros.routes"));
app.use('/clasificacion', biblio ,require("./routes/clasificacion.routes"));
app.use('/comentarios', cliente , require("./routes/comentarios.routes"));
app.use('/prestamos', require("./routes/prestamos.routes"));

app.listen(process.env.PORT,() => {
    console.log("EL SERVIDOR SE CONECTO AL PUERTO " + process.env.PORT);
});