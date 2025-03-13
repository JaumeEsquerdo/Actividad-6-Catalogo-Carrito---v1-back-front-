import { Usuario } from "../db/models/usuario.model.js";


const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const getUsuario = async (req, res, next) => {

    const { id } = req.params

    try {
        const user = await Usuario.findById(id)

        responseAPI.msg = "Usuario encontrado";
        responseAPI.data = user;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del usuario`, err)
        next(err);
    }
}

export const updateUsuario = async (req,res,next) => {
    const {id} = req.params;
    const {nombre} = req.body;


    try {
        const updateUser = await Usuario.findByIdAndUpdate(id, { nombre }, { new: true })

        if (!updateUser) {
            responseAPI.msg = `No se encontró el usuario con ID ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }
        responseAPI.msg = `Usuarios actualizado ${updateUser.nombre}`;
        responseAPI.data = updateUser;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del usuario ${updateUser}`, err)
        next(err);
    }
}

export const createUsuario = async (req,res,next) => {


    const { nombre } = req.body

    try {
        const newUser = await Usuario.create( {nombre} )

        responseAPI.msg = `Usuario creado ${nombre}`;
        responseAPI.data = newUser;
        responseAPI.status = "ok";

        res.status(201).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del usuario`, err)
        next(err);
    }
}
