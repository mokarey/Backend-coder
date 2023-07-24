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

    // obtener el array con los articulos--
    getCarritos = async () => {
        try{
        const file = await fs.readFile(this.path, "utf8");    
        const carritos =JSON.parse(file);
        return carritos;
        }catch(e){
            await this.#saveCart([]);
        }
    };

    // creacion del articulo--
    // la funcion pasa a ser asincrona--
    // reconstruccion del articulo, lo convertimos en objeto--
    async agregarArray(cart){
        
        try {
    // dependencia de ID  a traves del archivo json
        const carritos = await this.getCarritos();
        const lastCarritoId = carritos.length === 0 ? 0 : carritos[carritos.length - 1].id;

        const carrito = {
      id: lastCarritoId + 1,
      products: [
        {
          cid: cart.cid || 0,
          cantidad: cart.cantidad || 0,
        },
      ],
    };
        
        carritos.push(carrito);

        await this.#saveCart(carritos);
        return carrito;

    } catch(e){
        console.log(e);
    }
    };
    

    // FILTRAR el articulo mediante su id--
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

    // ELIMINAR el articulo mediante su id-- 
    async deleteCarritoById(id){
        const carritos = await this.getCarritos();
        const newCarritos = carritos.filter(carts => carts.id != id);
        await this.#saveCart(newCarritos);
    }
}

export default Carritos


const carritos = new Carritos("carritos");
await carritos.agregarArray({ cid: 1, cantidad: 5 });

// getArticulos async nos permite utilizar get con la info sin necesidad de hacer un llamado
console.log(await carritos.getCarritos());

