
class Articulos{

// array vacio--
    constructor(){
    this.articulos = [];

    }
// obtener el array con los articulos--
    getArticulos = () => {
        return this.articulos;
    }

// creacion del articulo--
    agregarArticulo = (titulo, descripcion, precio, imagen, stock,) =>{
        const articulo = {
            id: this.articulos.length+1,
            titulo,
            descripcion,
            precio,
            imagen,
            stock,
        
        }

        this.articulos.push(articulo)
        return articulo;
    }
// obtener el articulo mediante su id--
    getArticuloById(id) {
        return this.articulos.find((articulo) => articulo.id === id);
      }
}

const articulos = new Articulos();
articulos.agregarArticulo("Botines Nike", "Los mejores del mercado", 2499, "imagen-1.jpg", 13,);
articulos.agregarArticulo("Botines Puma", "Cómodos y resistentes", 1299, "imagen-2.jpg", 7,);

console.log(articulos.getArticulos());


//const articulo1 = articulos.getArticuloById(1);
//console.log(articulo1);

//articulo2 = articulos.getArticuloById(2);
//console.log(articulo2);