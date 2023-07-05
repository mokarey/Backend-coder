import fs from "fs/promises"
class Articulos{

    // array vacio--
    constructor(){

        // con path enviamos hacia la ubicacion correcta la creacion del archivo json--
     this.path = './db/${path}.json'
     this.articulos = [];
    }

    // nos permite guardar en la base sin usar writeFile--
        // al crear la funcion con # esta se vuelve privada--
    async #saveArticle(articles){
        await fs.writeFile(this.path, JSON.stringify(articles))
        this.articles = articles; 
        return articles;
    }

    // obtener el array con los articulos--
    getArticulos = async () => {
        try{
        const file = await fs.readFile(this.path, "utf8");    
        const articulos =JSON.parse(file);
        return articulos;
        }catch(e){
            await this.#saveArticle([])
        }
    };

    // creacion del articulo--
    // la funcion pasa a ser asincrona--
    agregarArticulo = async (titulo, descripcion, precio, imagen, stock,) =>{
        try {

    // dependencia de ID  a traves del archivo json
        const articulos = await this.getArticulos();    
        const articulo = {
            id: articulos.length == 0 ? 1 : articulos[articulos.length - 1].id +1,
            titulo,
            descripcion,
            precio,
            imagen,
            stock,
        
        };
        
        this.articulos = articulos;
        articulos.push(articulo);

        await this.#saveArticle(articulos);
        return articulo;

    } catch(e){
        console.log(e);
    }
    };

    // obtener el articulo mediante su id--
    async getArticuloById(idArticulo) {
        const articulos = await this.getArticulos();
        const articulo = articulos.find((articles) => articles.id === idArticulo)
        return articulo;
      }
}

export default Articulos


const articulos = new Articulos("articulos");
await articulos.agregarArticulo("Botines Nike", "Los mejores del mercado", 2499, "imagen-1.jpg", 13,);
await articulos.agregarArticulo("Botines Puma", "Cómodos y resistentes", 1299, "imagen-2.jpg", 7,);

// getArticulos async nos permite utilizar get con la info sin necesidad de hacer un llamado
console.log(await articulos.getArticulos());
