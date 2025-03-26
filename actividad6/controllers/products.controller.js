import { Producto } from '../db/models/producto.model.js'
import { BACKEND_URL } from '../config/config.js'

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
        console.error(`tuvimos un error en el try del producto`, err)
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

export const updateProductos = async (req, res, next) => {
    const {id} = req.params
    const {name, precio, tipo} = req.body

    try{
        const updateProducto = await Producto.findByIdAndUpdate(id, {
            name:name,
            precio:precio,
            //img: req.file.filename,
            tipo:tipo

        }, {new:true})

        if(!updateProducto){
            responseAPI.msg = `No se encontró el producto con ID ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }


        responseAPI.msg = "Producto encontrado";
        responseAPI.data = updateProducto;
        responseAPI.status = "ok";
        res.status(200).json(responseAPI);


    }catch(e){
        console.error(`tuvimos un error en el try del update del producto`, err)

        next(e)
    }

}

export const updateImage = async(req,res, next) =>{
    const {id} = req.params

    if(!req.file){
        return res.status(404).json({
            success:false,
            message: "No se ha proporcionado una img"
        })
    }

    console.log('Archivo recibido: ', req.file.filename);

    try{
        const updateImageProduct = await Producto.findByIdAndUpdate(id, {
            img: req.file.filename
        }, {new:true})


        if(!updateImageProduct){
            responseAPI.msg = `No se encontró el producto con ID ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        const imageUrl = `${BACKEND_URL}/uploads/${req.file.filename}`;
        // aseguramos q imageUrl forme parte de la respuesta
        updateImageProduct.imageUrl = imageUrl

        responseAPI.msg = "Img del producto actualizado";
        responseAPI.data = updateImageProduct;
        responseAPI.status = "ok";
        res.status(200).json(responseAPI);

    }catch(e){
        console.error(`tuvimos un error en el try del update del producto`, e)
        next(e)
    }
}