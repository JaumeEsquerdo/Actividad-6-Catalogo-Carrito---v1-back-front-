import mongoose from "mongoose"

const options = {
    collection: 'compras',
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
}

const compraSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    mesa: {
        type: String, // puedes usar "mesa-1", "mesa-12" o incluso códigos QR
        required: true
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }],
    estado: {
        type: String,
        enum: ['pendiente', 'en preparación', 'servido', 'cerrado'],
        default: 'pendiente'
    },
    total: {
        type: Number,
        required: true
    }
}, options)

export const Compra = mongoose.model("Compra", compraSchema)
