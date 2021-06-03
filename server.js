const express = require("express");
const path = require("path");
const objDiscos = require("./discos.json");
const expHbs = require("express-handlebars");

const PORT = 3001;
const app = express();
const home = path.join(__dirname, "client", "index.html");

/*** Configuración de Handlebars para Express ***/
app.engine(
    "handlebars",
    expHbs({
        defaultLayout: "main-layout",
        layoutsDir: "views/layouts",
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
/************************************************/

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(path.join(__dirname, "client")));


app.get("/", (req, res) => {
    res.render("bienvenida", {
        titulo : "Inicio"
    });
});

app.get("/discos", (req, res) => {
    const titulo = req.query.titulo;
    const artista = req.query.artista;
    const lanzamiento = parseInt(req.query.lanzamiento);
    let resultado = objDiscos.discos;


    if (titulo) {
        resultado = resultado.filter(elemento => elemento.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }

    if (artista) {
        resultado = resultado.filter(elemento => elemento.artista.toLowerCase().includes(artista.toLowerCase()));
    }

    if (lanzamiento) {
        resultado = resultado.filter(elemento => elemento.lanzamiento === lanzamiento);
    }

    res.render("grilla", {
        discos: resultado,
        titulo : 'Resultados',
    });

});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})