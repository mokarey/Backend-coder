import mongoose from "mongoose"

const articuloSchema = new mongoose.Schema({
    titulo:{
        type : String,
        required : true,
    },

    descripcion:{
        type : String,
        required : true,
    },

    precio:{
        type : Number,
        required : true,
    },

    imagen:{
        type : String,
        required : false,
    },

    stock:{
        type : Number,
        required : true,
    },
});


const ArticuloModel = mongoose.model("articulos", articuloSchema);

// mongoose.connect(`mongodb://127.0.0.1:27017/articulos`)

// await ArticuloModel.insertMany(data);

export default ArticuloModel;