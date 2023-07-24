import fs from "fs/promises"
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
        const carrito = carritos.find((carts) => carts.id == id );
        return carrito;
      }

    // EDITAR el articulo mediante su id-- 
    //async editArticuloById(id, articulo){
      //  const articulos = await this.getArticulos();
        //const articuloIndex = articulos.find((articulo) => articulo.id == id);
        //if (articuloIndex == -1) return false;

        //articulos[articuloIndex] = {...articulos[articuloIndex], ...articulo};

      //  await this.#saveArticle(articulos);
    //}

    // ELIMINAR carrito mediante su id-- 
    async deleteCarritoById(id){
        const carritos = await this.getCarritos();
        const newCarritos = carritos.filter(carts => carts.id != id);
        await this.#saveCart(newCarritos);
    }
}

export default Carritos

// getArticulos async nos permite utilizar get con la info sin necesidad de hacer un llamado

