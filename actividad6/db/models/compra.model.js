import mongoose from "mongoose";

const options = {
    collection: "compras",
    strict: true,
    collation: {
        locale: "es",
        strength: 1,
    },
};

const compraSchema = new mongoose.Schema(
    {
        fecha: { type: Date, default: Date.now },

        mesa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mesa",
            required: true,
        },
        estado: { type: String, enum: ["pendiente", "pagado"], default: "pendiente" }
        ,
        productos: [
            {
                producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
                cantidad: { type: Number, default: 1 },
            },
        ],
        sesionId: { type: String } // un string único para cada "visita"

    },
    options
);

export const Compra = mongoose.model("Compra", compraSchema);
