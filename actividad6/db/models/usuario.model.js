import mongoose from "mongoose"

const options = {
    collection: 'usuarios',
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
}

const usuarioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin'
    }
    // Solo se usaría para logins administrativos
}, options)

export const Usuario = mongoose.model("Usuario", usuarioSchema)
