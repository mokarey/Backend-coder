import { Router } from "express";
import Articulos from "../articulos.js";
import io from "../articulosApp.js"

const articulosApp = new Articulos("articulos");
const articulosRout = Router();


// se obtienen todos los articulos--
// se le agrega un emit--
articulosRout.get("/", async (req, res) => {
    try {
        const articulos = await articulosApp.getArticulos();
        console.log("Articulos obtenidos:", articulos);
        res.send(articulos);
        io.emit('articulosList', articulos);
    } catch (e) {
        res.status(502).send({ error: true });
    }
});

// FILTRAR los articulos por ID--
articulosRout.get("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const articulo = await articulosApp.getArticuloById(id)
        res.send(articulo);
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// EDITAR los articulos--
articulosRout.put("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const articulo = req.body
        const result = await articulosApp.editArticuloById(id, articulo)
        res.send({update: true });
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// ELIMINAR los articulos--
// se le agrega un emit--
articulosRout.delete("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        await articulosApp.deleteArticuloById(id)
        res.send({delete : true});
        io.emit('deleteArticulo', id);
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// metodo POST AGREGAR articulo--
// se le agrega un emit--
articulosRout.post("/", async (req, res) => {
    const body = req.body;
    try{
        const result = await articulosApp.agregarArticulo(body);
        res.send(result);
        io.emit('nuevoArticulo', result)
    } catch (e){
        console.log(e);
        res.status(502).send({ error: true })   
    }    
})


export default articulosRout;