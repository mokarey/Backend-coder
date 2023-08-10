import fs from "fs/promises";

class Articulos {

    // con path enviamos hacia la ubicacion correcta la creacion del archivo json--
    constructor(path) {
        this.path = `./db/${path}.json`;
        this.articulos = [];
        }

    // nos permite guardar en la base sin usar writeFile--
    // al crear la funcion con # esta se vuelve privada--
    async #saveArticle(articles) {
        await fs.writeFile(this.path, JSON.stringify(articles));
        this.articulos = articles;
        return articles;
        }

    // obtener el array con los articulos--
    getArticulos = async () => {
        try {
        const file = await fs.readFile(this.path, "utf8");
        const articulos = JSON.parse(file);
        return articulos;
        } catch (e) {
        await this.#saveArticle([]);
        return [];
        }
    };

    // AGREGAR articulo
    agregarArticulo = async (artic) => {
        const articulos = await this.getArticulos();
        const id = articulos.length === 0 ? 1 : articulos[articulos.length - 1].id + 1;

        const nuevoArticulo = { ...artic, id };
        articulos.push(nuevoArticulo);

        await this.#saveArticle(articulos);
        return nuevoArticulo;
    };

    // OBTENER articulo mediante id
    async getArticuloById(id) {
        const articulos = await this.getArticulos();
        const articulo = articulos.find((articles) => articles.id == id);
        return articulo;
    };

    // EDITAR articulo mediante id
    async editArticuloById(id, articulo) {
        const articulos = await this.getArticulos();
        const articuloIndex = articulos.findIndex((art) => art.id == id);

        if (articuloIndex === -1) return false;
        articulos[articuloIndex] = { ...articulos[articuloIndex], ...articulo };

        await this.#saveArticle(articulos);
        return true;
    };

    // ELIMIMAR articulo mediante id
    async deleteArticuloById(id) {
        const articulos = await this.getArticulos();
        const newArticulos = articulos.filter((articles) => articles.id != id);
        await this.#saveArticle(newArticulos);
    }};

export default Articulos;

const articulos = new Articulos("articulos");

(async () => {
    await articulos.agregarArticulo({
        titulo: "Botines Nike",
        descripcion: "Los mejores del mercado",
        precio: 2499,
        imagen: "imagen-1.jpg",
        stock: 13,
    });

    await articulos.agregarArticulo({
        titulo: "Botines Puma",
        descripcion: "Cómodos y resistentes",
        precio: 1299,
        imagen: "imagen-2.jpg",
        stock: 7,
    });

    console.log(await articulos.getArticulos());
    })();
