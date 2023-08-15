import express from "express";
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

const io = new SocketServer(appServer);

io.on("connection", (socket) => {
    console.log(socket)

    socket.emit("articulosList")
})

export default io