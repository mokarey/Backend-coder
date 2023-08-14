import express from "express";
import { engine } from "express-handlebars";
import articulosRout from "./routes/articulosRout.js";
import articulosViewsRout from "./routes/articulosViewsRout.js";
import carritosRout from "./routes/carritosRout.js";
import __dirname from "./dirname.js";
import * as path from "path"

const app = express();

// seteamos el motor de vistas-- 
app.engine("handlebars", engine());
app.set("views", path.resolve(__dirname + "/views"));
app.set("view engine", "handlebars");

// transforma la informacion-- 
app.use(express.json());

// transforma la informacion en objetos--
app.use(express.urlencoded({ extended: true }));

app.use("/api/articulo", articulosRout);
app.use("/articulo", articulosViewsRout);
app.use("/api/carrito", carritosRout);

// servidor corriendo--
app.listen(8080, () => {
    console.log("Servidor corriendo.");
});
