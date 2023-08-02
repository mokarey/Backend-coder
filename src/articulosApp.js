import express from "express";
import handlebars from "express-handlebars";
import articulosRout from "./routes/articulosRout.js";
import carritosRout from "./routes/carritosRout.js";
import __dirname from "./dirname.js"

const app = express();

app.engine("handlebars", handlebars.engine());

// seteamos el motor de vistas-- 
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    const { nombre } = req.query;
    res.render("index", {nombre: nombre});
})


// transforma la informacion-- 
app.use(express.json());

// transforma la informacion en objetos--
app.use(express.urlencoded({ extended: true }));

app.use("/api/articulo", articulosRout);
app.use("/api/carrito", carritosRout);

// servidor corriendo--
app.listen(8080, () => {
    console.log("Servidor corriendo.");
});
