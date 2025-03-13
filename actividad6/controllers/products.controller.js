import { Producto } from '../db/models/producto.model.js'

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const createProducto = async (req, res, next) => {
    const { name, precio, img, tipo, owner } = req.body

    try {
        const nuevoProducto = await Producto.create({
            name,
            precio,
            img,
            tipo,
            owner
        });

        responseAPI.msg = "Producto creado con exito";
        responseAPI.data = nuevoProducto;

        res.status(201).json(responseAPI)
    } catch (e) {
        console.error('error creando producto', e)
        next(e)
    }
}

export const getProducto = async (req, res, next) => {
    const { id } = req.params

    try {
        const producto = await Producto.findById(id)

        responseAPI.msg = "Producto encontrado";
        responseAPI.data = producto;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del usuario`, err)
        next(err);
    }
}

export const getProductos = async (req, res, next) => {

    try {
        const productos = await Producto.find()

        responseAPI.msg = "Productos encontrados";
        responseAPI.data = productos;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del usuario`, err)
        next(err);
    }
}