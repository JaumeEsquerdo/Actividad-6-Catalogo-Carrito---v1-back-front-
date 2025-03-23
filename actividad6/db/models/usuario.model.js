import mongoose from "mongoose"

const options = {
    collection: 'usuarios', //nombre de la colección en MongoDB
    strict: true, // solo permite guardar los campos definidos en el esquema
    collation: {
        locale: "es", // config para el idioma que sea español
        strength: 1 //nivel de comparación de strings( 1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const usuarioSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }],
    compras: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Compra'
    }]
    //usuario tiene su lista de compras

}, options)

export const Usuario = mongoose.model("USUARIO", usuarioSchema)  //se suele exportar al archivo donde está