import { Router } from "express";
import Carritos from "../carritos.js";
const carritosApp = new Carritos("carritos");
const carritosRout = Router();


// se obtienen todos los productos--
carritosRout.get("/", async (req, res) =>{
    try{
    const carritos = await carritosApp.getCarritos();
    res.send(carritos);
    } catch (e){
        res.status(502).send({error: true});
    }
});

// FILTRAR los carritos por ID--
carritosRout.get("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const carrito = await carritosApp.getCarritoById(id)
        res.send(carrito);
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// EDITAR los productos--
carritosRout.put("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const carrito = req.body
        const result = await articulosApp.editCarritoById(id, carrito)
        res.send({update: true });
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// ELIMINAR los productos--
carritosRout.delete("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        await carritosApp.deleteCarritoById(id)
        res.send({delete : true});
        } catch (e){
            console.log(e);
            res.status(502).send({ error: true });
        }
});

// metodo POST AGREGAR producto--
carritosRout.post("/", async (req, res) => {
    const body = req.body;
    try{
        const result = await carritosApp.agregarArray(body);
        res.send(result);
    } catch (e){
        console.log(e);
        res.status(502).send({ error: true })   
    }    
})



carritosRout.post('/:id/product/:id', async (req, res) => {
    const products = req.products;
    try{
        const result = await carritosApp.agregarArray(products);
        res.send(result);
    } catch (e){
        console.log(e);
        res.status(502).send({ error: true })   
    }    
  });

export default carritosRout;