import express from "express";
import fs from "fs/promises"; 
import { engine } from "express-handlebars";
import articulosRout from "./routes/articulosRout.js";
import articulosViewsRout from "./routes/articulosViewsRout.js";
import carritosRout from "./routes/carritosRout.js";
import __dirname from "./dirname.js";
import * as path from "path";
import { Server as SocketServer } from "socket.io";

const app = express();
app.use(express.static(`${__dirname}/public`));


// seteamos el motor de vistas-- 
app.engine("handlebars", engine());
app.set("views", path.resolve(__dirname + "/views"));
app.set("view engine", "handlebars");

// transforma la informacion-- 
app.use(express.json());

// transforma la informacion en objetos--
app.use(express.urlencoded({ extended: true }));

// URLS
app.use("/api/articulo", articulosRout);
app.use("/articulo", articulosViewsRout);
app.use("/api/carrito", carritosRout);


// servidor corriendo--
//app.listen(8080, () => {
//    console.log("Servidor corriendo.");
//});


app.get("/", (req, res) => {
    res.render("index");
})

const appServer = app.listen(8080, () => console.log(`Conectado.`));


// relaciones socket servidor/cliente
const io = new SocketServer(appServer);

io.on("connection", async (socket) => {
    console.log(socket)

    // Llamada para listar los articulos--
    const articulos = await getArticulosFromDatabase();
    socket.emit("articulosList", articulos);

    // Llamada para eliminar articulo--
    socket.on("deleteArticulo", async (id) => {
        try {
            await eliminarArticulo(id);
            io.emit("articuloEliminado", id);
        } catch (error) {
            res.status(502).send({ error: true });
        }
    });

    // Llamada para agregar articulo--
    socket.on("nuevoArticulo", async (articulo) => {
        try {
            const nuevoArticulo = await agregarArticulo(articulo);
            io.emit("nuevoArticulo", nuevoArticulo);
        } catch (error) {
            res.status(502).send({ error: true });
        }
    });
});

// Se lee el archivo .json para obtener los articulos los articulos---
async function getArticulosFromDatabase() {
    try {
        const jsonData = await fs.readFile("./db/articulos.json", "utf8");
        const articulos = JSON.parse(jsonData);
        return articulos;
    } catch (error) {
        res.status(502).send({ error: true });
        return [];
    }
}

// Se lee el archivo .json y se filtran los articulos por ID---
async function eliminarArticulo(id) {
    try {
        const articulos = await fs.readFile("./db/articulos.json", "utf-8");
        const articulosJson = JSON.parse(articulos);
        const nuevosArticulos = articulosJson.filter((articulo) => articulo.id !== id);
        await fs.writeFile("./db/articulos.json", JSON.stringify(nuevosArticulos));
        console.log(`Articulo eliminado!`);
    } catch (error) {
        res.status(502).send({ error: true });
    }
}

export default io