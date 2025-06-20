import mongoose from "mongoose";

const options = {
    collection: 'mesas',
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
};

const mesaSchema = new mongoose.Schema({
    numero: { type: Number, required: true, unique: true }, // número de la mesa visible
    estado: {
        type: String,
        enum: ["libre", "ocupada"],
        default: "libre"
    },
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compra' }],
    creadaEn: { type: Date, default: Date.now }
}, options);

export const Mesa = mongoose.model("Mesa", mesaSchema);
