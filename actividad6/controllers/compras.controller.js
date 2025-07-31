import { Compra } from '../db/models/compra.model.js';
import { Producto } from '../db/models/producto.model.js';

const responseAPI = {
    msg: '',
    data: [],
    status: 'ok',
    cant: null,
};

// POST /compras → crear una nueva compra (estado: "pendiente")
export const crearCompra = async (req, res, next) => {
    const { mesa, productos, sesionId  } = req.body;

    try {
        // Validación rápida
        if (!mesa || !productos || productos.length === 0 || !sesionId) {
            return res.status(400).json({
                msg: 'Debes enviar una mesa y al menos un producto',
                status: 'error',
            });
        }

        // Validamos que los productos existan
        for (const item of productos) {
            const productoValido = await Producto.findById(item.producto);
            if (!productoValido) {
                return res.status(404).json({
                    msg: `Producto con ID ${item.producto} no encontrado`,
                    status: 'error',
                });
            }
        }

        // Creamos la compra
        const nuevaCompra = await Compra.create({
            mesa,
            productos,
            estado: 'pendiente', // por defecto
            sesionId,
        });

        responseAPI.msg = 'Compra registrada correctamente';
        responseAPI.data = nuevaCompra;

        res.status(201).json(responseAPI);
    } catch (err) {
        console.error('Error al crear la compra:', err);
        next(err);
    }
};

/*
en Compra.find().sort({ fecha: -1 })
- { fecha: -1 } significa orden descendente por fecha (las más recientes primero).
- { fecha: 1 } sería orden ascendente (las más antiguas primero).
 */

// ✅ 2. GET /compras → listar todas (útil para admin/camarero)

export const getCompras = async (req, res, next) => {
    try {
        const compras = await Compra.find()
            .populate('mesa')
            .populate('productos.producto')
            .sort({ fecha: -1 });

        responseAPI.msg = 'Compras encontradas';
        responseAPI.data = compras;

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error al obtener compras:', err);
        next(err);
    }
};

/* GET historial de compras por sesion! */
export const obtenerHistorialPorSesion = async (req, res, next) => {
    const { sesionId } = req.params;

    const responseAPI = {
        msg: '',
        data: [],
        status: 'ok',
        cant: null,
    };

    try {
        if (!sesionId) {
            responseAPI.msg = 'Falta el ID de sesión';
            responseAPI.status = 'error';
            return res.status(400).json(responseAPI);
        }

        const compras = await Compra.find({ sesionId })
            .populate('productos.producto')
            .sort({ fecha: -1 }); /* -1 para poner primero el más actual */

        responseAPI.msg = 'Historial de la sesión obtenido correctamente';
        responseAPI.data = compras;
        responseAPI.cant = compras.length;

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error al obtener historial por sesión:', err);
        responseAPI.msg = 'Error interno al obtener historial';
        responseAPI.status = 'error';
        res.status(500).json(responseAPI);
        next(err);
    }
};


// PUT /compras/:id → marcar una compra como "pagado"
export const pagarCompra = async (req, res, next) => {
    const { id } = req.params;

    try {
        const compra = await Compra.findByIdAndUpdate(
            id,
            { estado: 'pagado' },
            { new: true }
        );

        if (!compra) {
            return res.status(404).json({
                msg: 'Compra no encontrada',
                status: 'error',
            });
        }

        responseAPI.msg = 'Compra marcada como pagada';
        responseAPI.data = compra;

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error al actualizar compra:', err);
        next(err);
    }
};
