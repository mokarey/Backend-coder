import express from "express";
import Articulos from "./articulos.js";
const articulosApp = new Articulos("articulos");

const app = express();

// transforma la informacion-- 
app.use(express.json())

// transforma la informacion en objetos--
app.use(express.urlencoded({ extended: true }))

// se obtienen todos los articulos--
app.get('/api/articulo', async (req, res) =>{
    try{
    const articulos = await articulosApp.getArticulos();
    res.send(articulos);
    } catch (e){
        res.status(502).send({error: true});
    }
});

// FILTRAR los articulos por ID--
app.get('/api/articulo/:id', async (req, res) =>{
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
app.put('/api/articulo/:id', async (req, res) =>{
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
app.delete('/api/articulo/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        await articulosApp.deleteArticuloById(id)
        res.send({delete : true});
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// metodo POST AGREGAR articulo--
app.post("/api/articulo", async (req, res) => {
    const body = req.body;
    try{
        const result = await articulosApp.agregarArticulo(body);
        res.send(result);
    } catch (e){
        console.log(e);
        res.status(502).send({ error: true })   
    }    
})

// servidor corriendo--
app.listen(8080, () => {
    console.log("Servidor corriendo.");
});
