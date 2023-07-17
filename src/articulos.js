import fs from "fs/promises"
class Articulos{

    // array vacio--
    constructor(path){

        // con path enviamos hacia la ubicacion correcta la creacion del archivo json--
     this.path = `./db/${path}.json`;
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
            await this.#saveArticle([]);
        }
    };

    // creacion del articulo--
    // la funcion pasa a ser asincrona--
    // reconstruccion del articulo, lo convertimos en objeto--
    agregarArticulo = async (artic) =>{
        const { 
            titulo,
            descripcion,
            precio,
            imagen,
            stock,      
        } = artic
        
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

    // FILTRAR el articulo mediante su id--
    async getArticuloById( id ) {
        const articulos = await this.getArticulos();
        const articulo = articulos.find((articles) => articles.id == id );
        return articulo;
      }

    // EDITAR el articulo mediante su id-- 
    async editArticuloById(id, articulo){
        const articulos = await this.getArticulos();
        const articuloIndex = articulos.find((articulo) => articulo.id == id);
        if (articuloIndex == -1) return false;

        articulos[articuloIndex] = {...articulos[articuloIndex], ...articulo};

        await this.#saveArticle(articulos);
    }

    // ELIMINAR el articulo mediante su id-- 
    async deleteArticuloById(id){
        const articulos = await this.getArticulos();
        const newArticulos = articulos.filter(articles => articles.id != id);
        await this.#saveArticle(newArticulos);
    }
}

export default Articulos


const articulos = new Articulos("articulos");
await articulos.agregarArticulo("Botines Nike", "Los mejores del mercado", 2499, "imagen-1.jpg", 13,);
await articulos.agregarArticulo("Botines Puma", "Cómodos y resistentes", 1299, "imagen-2.jpg", 7,);

// getArticulos async nos permite utilizar get con la info sin necesidad de hacer un llamado
console.log(await articulos.getArticulos());
