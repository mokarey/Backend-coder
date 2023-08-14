import { Router } from "express";
import Articulos from "../articulos.js";
const articulosViewApp = new Articulos("articulos");
const articulosViewsRout = Router();


// se obtienen todos los articulos--
articulosViewsRout.get("/", async (req, res) =>{
    try{
    const articulos = await articulosViewApp.getArticulos();
    res.render("home", { articles : articulos });
    } catch (e){
        res.status(502).send({error: true});
    }
});

// FILTRAR los articulos por ID--
articulosViewsRout.get("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const articulo = await articulosViewApp.getArticuloById(id)
        res.render("artic", {articles: articulo});
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// EDITAR los articulos--
articulosViewsRout.put("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const articulo = req.body
        const result = await articulosViewApp.editArticuloById(id, articulo)
        res.send({update: true });
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// ELIMINAR los articulos--
articulosViewsRout.delete("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        await articulosViewApp.deleteArticuloById(id)
        res.send({delete : true});
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// metodo POST AGREGAR articulo--
articulosViewsRout.post("/", async (req, res) => {
    const body = req.body;
    try{
        const result = await articulosViewApp.agregarArticulo(body);
        res.send(result);
    } catch (e){
        console.log(e);
        res.status(502).send({ error: true })   
    }    
})


export default articulosViewsRout;