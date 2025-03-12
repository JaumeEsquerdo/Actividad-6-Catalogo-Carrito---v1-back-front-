import mongoose from "mongoose"

const options = {
    collection: 'compras', //nombre de la colección en MongoDB
    strict: true, // solo permite guardar los campos definidos en el esquema
    collation: {
        locale: "es", // config para el idioma que sea español
        strength: 1 //nivel de comparación de strings( 1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const compraSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }]

    // recibe fecha compra, el usuario, y los productos comprados

}, options)

export const Compra = mongoose.model("Compra", compraSchema)  //se suele exportar al archivo donde está