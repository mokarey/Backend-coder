import ArticuloModel from "../model/articulosModel.js";


export default class ArticulosManager{

    constructor() {};

    // obtener el array con los articulos--
    getArticulos = async () => ArticuloModel.find();

    // AGREGAR articulo
    agregarArticulo = async ({
        titulo,
        descripcion,
        precio,
        imagen,
        stock,
        }) => { 
        const articulo = await ArticuloModel.create({
            titulo,
            descripcion,
            precio,
            imagen,
            stock,
        });
     return articulo
    };

    // OBTENER articulo mediante id
    getArticuloById = async(id) => ArticuloModel.findById(id);

    // EDITAR articulo mediante id
    editArticuloById = async (id, {titulo, descripcion, precio, imagen, stock}) => {
        const artic = await ArticuloModel.findById(id);
        if(!artic) throw new Error('ID inexistente');

        artic.titulo = titulo;
        artic.descripcion = descripcion;
        artic.precio = precio;
        artic.imagen = imagen;
        artic.stock = stock;

        await artic.save();
        return artic;

    };

    // ELIMIMAR articulo mediante id
    deleteArticuloById = async (id) => ArticuloModel.deleteOne({_id: id});
}


