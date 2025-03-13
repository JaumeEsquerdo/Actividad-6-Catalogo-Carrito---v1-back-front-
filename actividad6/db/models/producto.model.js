import mongoose from "mongoose"

const options = {
    collection: 'productos', //nombre de la colección en MongoDB
    strict: true, // solo permite guardar los campos definidos en el esquema
    collation: {
        locale: "es", // config para el idioma que sea español
        strength: 1 //nivel de comparación de strings( 1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const productoSchema = new mongoose.Schema({
    name: String,
    precio: Number,
    img: String,
    tipo: String,
    compras: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Compra'
    }]
    // todas las compras que tiene este producto
}, options)

export const Producto = mongoose.model("Producto", productoSchema)  //se suele exportar al archivo donde está