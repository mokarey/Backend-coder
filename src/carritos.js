import fs from "fs/promises";
import Articulos from "./articulos.js"
const articulosApp = new Articulos

class Carritos{

    // array vacio--
    constructor(path){

        // con path enviamos hacia la ubicacion correcta la creacion del archivo json--
     this.path = `./db/${path}.json`;
     this.carritos = [];
    }

    // nos permite guardar en la base sin usar writeFile--
        // al crear la funcion con # esta se vuelve privada--
    async #saveCart(carts){
        await fs.writeFile(this.path, JSON.stringify(carts))
        this.carts = carts; 
        return carts;
    }

    // obtener el array de carritos--
    getCarritos = async () => {
        try{
        const file = await fs.readFile(this.path, "utf8");    
        const carritos =JSON.parse(file);
        return carritos;
        }catch(e){
            await this.#saveCart([]);
        }
    };

    agregarCarrito = async () => {

        // nos aseguramos de mantener la informacion del carrito anterior--
        let cartsOld = await this.getCarritos();
        let id = 1;

        // incremeneto del ID en +1--
        if (cartsOld.length > 0) {
        const maxId = cartsOld.reduce((max, cartsOld) => (cartsOld.id > max ? cartsOld.id : max), 0);
        id = maxId + 1;
        }

        // creamos el nuevo carrito con el array vacio para los productos--
        let carritoFull = [{id : id, products : []}, ...cartsOld];
        await this.#saveCart(carritoFull);
        return "Agregado correctamente!";
    };
    

    // FILTRAR carritos mediante su id--
    async getCarritoById( id ) {
        const carritos = await this.getCarritos();
        const carrito = carritos.find((carritoFull) => carritoFull.id == id );
        return carrito;
      }

    // ELIMINAR carrito mediante su id-- 
    async deleteCarritoById(id){
        const carritos = await this.getCarritos();
        const newCarritos = carritos.filter(carritoFull => carritoFull.id != id);
        await this.#saveCart(newCarritos);
    }

    // Comprobacion si existe el carrito-- 
    async exist(id) {
        const carritos = await this.getCarritos();
        return carritos.some((carts) => carts.id === id);
    }

    async getArticuloById(id) {
        return await articulosApp.getArticuloById(id);
      }


    // AGREGAR productos----- 
    agregarArticuloCarrito = async (cid, pid) =>{

        // Se obtienen los carritos y los filtramos mediante su id para accederlos----- 
        let carritos = await this.getCarritos()
        let filtrarCarritos = carritos.filter(carts => carts.id != cid) 

        // Se obtienen los carritos y los filtramos mediante su id para accederlos----- 
        let carrito = await this.getCarritoById(cid);

        // accedemos a los carritos, luego al array products, si el CID coincide con el producto, se incrementa la canridad en +1-- 
        if (carrito && carrito.products.some((artic) => artic.id === pid)) {
        let articleCarrito = carrito.products.find((artic) => artic.id === pid);
        articleCarrito.cantidad++;
        let carritoFull = [carrito, ...filtrarCarritos];
        await this.#saveCart(carritoFull);
        return "Producto sumado correctamente";
        }

        // finalmente guardamos el producto en el array-- 
        let carritoFull = [{id:cid, products : [{id:pid, cantidad: 1 }]}, ...filtrarCarritos]
        await this.#saveCart(carritoFull)
        return "Producto agregado exitosamente"
    }
}

export default Carritos

