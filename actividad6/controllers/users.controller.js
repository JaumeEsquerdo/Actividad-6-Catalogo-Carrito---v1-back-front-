import { Usuario } from "../db/models/usuario.model.js";

const responseAPI = {
    msg: "",
    data: [],
    status: "ok",
    cant: null,
};

// Obtener un usuario por ID (por si necesitas mostrar los datos del admin)
export const getUsuario = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await Usuario.findById(id).select("-password"); // importante: sin la password

        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
                status: "error"
            });
        }

        responseAPI.msg = "Usuario encontrado";
        responseAPI.data = user;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`Error al buscar usuario`, err);
        next(err);
    }
};

// Actualizar nombre o email del admin (si algún día se necesita modificar)
export const updateUsuario = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updateUser = await Usuario.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );

        if (!updateUser) {
            responseAPI.msg = `No se encontró el usuario con ID ${id}`;
            responseAPI.status = "error";
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = `Usuario actualizado`;
        responseAPI.data = updateUser;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`Error al actualizar usuario`, err);
        next(err);
    }
};

// Crear usuario admin (normalmente solo para hacer una vez)
export const createUsuario = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await Usuario.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "Ya existe un usuario con ese email",
                status: "error"
            });
        }

        const newUser = await Usuario.create({ name, email, password });

        responseAPI.msg = `Usuario creado: ${name}`;
        responseAPI.data = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };
        responseAPI.status = "ok";

        res.status(201).json(responseAPI);
    } catch (err) {
        console.error(`Error al crear usuario`, err);
        next(err);
    }
};
