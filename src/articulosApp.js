import express from "express";
import Articulos from "./articulos.js";
const articulosApp = new Articulos("articulos");

const app = express();

// transforma la informacion en objetos
app.use(express.urlencoded({ extended: true }))

// se obtienen todos los articulos--
app.get('/articulos', async (req, res) =>{
    try{
    const articulos = await articulosApp.getArticulos();
    res.send(articulos);
    } catch (e){
        res.status(502).send({error: true});
    }
});

// se filtran los articulos--
app.get('/articulos/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const articulo = await articulosApp.getArticuloById( id );
        res.send(articulo);
        } catch (e){
            res.status(502).send({ error: true })
        }
});

// servidor corriendo--
app.listen(8080, () => {
    console.log("Servidor corriendo.");
});
