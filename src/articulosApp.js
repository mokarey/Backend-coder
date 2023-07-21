import express from "express";
import articulosRout from "./routes/articulosRout.js";
import carritosRout from "./routes/carritosRout.js";

const app = express();

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
