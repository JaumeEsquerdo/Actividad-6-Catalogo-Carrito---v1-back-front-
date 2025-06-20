import mongoose from "mongoose"

const options = {
    collection: 'productos',
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
}

const productoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    img: {
        type: String, // URL o path relativo
        default: "/img/imagen-no-encontrada.jpg"
    },
    tipo: {
        type: String, // ej. 'sushi', 'nigiri', 'bebida'
        required: true
    },
    descripcion: {
        type: String,
        default: "Delicioso plato para disfrutar en nuestro restaurante."
    },
    valoresNutricionales: {
        kcal: Number,
        grasas: Number,
        proteinas: Number,
        hidratos: Number
    },
    compras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compra'
    }]
}, options)

export const Producto = mongoose.model("Producto", productoSchema)
