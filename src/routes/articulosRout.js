import { Router } from "express";
import ArticulosManager from "../dao/mongo/articulosManager.js";
import ArticuloModel from "../dao/model/articulosModel.js";
import io from "../articulosApp.js"

const articulosMan = new ArticulosManager("articulos");
const articulosRout = Router();


// se obtienen todos los articulos--
// se le agrega un emit--
articulosRout.get("/", async (req, res) => {
    try {
        const articulos = await articulosMan.getArticulos();
        res.send({articulos});
    } catch (e) {
        res.status(502).send({ error: true });
    }
});

// FILTRAR los articulos por ID--
articulosRout.get("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const articulo = await articulosMan.getArticuloById(id)
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
        const result = await articulosMan.editArticuloById(id, articulo)
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
        await articulosMan.deleteArticuloById(id)
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
        const result = await articulosMan.agregarArticulo(body);
        res.send(result);
        io.emit('nuevoArticulo', result)
    } catch (e){
        console.log(e);
        res.status(502).send({ error: true })   
    }    
})


export default articulosRout;