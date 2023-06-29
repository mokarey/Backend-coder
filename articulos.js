import fs from "fs/promises"

class Articulos{

// array vacio--
    constructor(){
    this.articulos = [];
    fs.readFile('articulos.json', 'utf8')

    }

// obtener el array con los articulos--
    getArticulos = async () => {
        const file = await fs.readFile("articulos.json", "utf8");    
        const articulos =JSON.parse(file)
        return articulos;
    }

// creacion del articulo--
// la funcion pasa a ser asincrona--
    agregarArticulo = async (titulo, descripcion, precio, imagen, stock,) =>{
        try {

// dependencia de ID  a traves del archivo json
// se hace un parse al articulo para enviar  al archivo json
        const file = await fs.readFile("articulos.json", "utf8");    
        const articulos =JSON.parse(file)

        const articulo = {
            id: this.articulos.length+1,
            titulo,
            descripcion,
            precio,
            imagen,
            stock,
        
        };
        
        this.articulos = articulos;
        articulos.push(articulo)

        await fs.writeFile('articulos.json', JSON.stringify(articulos))
        return articulo;

    } catch(e){
        console.log(e)
    }
    }

// obtener el articulo mediante su id--
    getArticuloById(id) {
        return this.articulos.find((articulo) => articulo.id === id);
      }
}

const articulos = new Articulos();
//await articulos.agregarArticulo("Botines Nike", "Los mejores del mercado", 2499, "imagen-1.jpg", 13,);
//await articulos.agregarArticulo("Botines Puma", "Cómodos y resistentes", 1299, "imagen-2.jpg", 7,);

// getArticulos async nos permite utilizar get con la info sin necesidad de hacer un llamado
console.log(await articulos.getArticulos());
