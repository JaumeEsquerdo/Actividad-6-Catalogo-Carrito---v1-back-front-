import { Mesa } from '../db/models/mesa.model.js';

const responseAPI = {
    msg: '',
    data: [],
    status: 'ok',
    cant: null,
};

export const crearMesa = async (req, res, next) => {
    const { nombre, estado = 'libre' } = req.body;

    if (!nombre) {
        return res.status(400).json({ msg: 'El nombre de la mesa es obligatorio', status: 'error' });
    }

    try {
        const nuevaMesa = await Mesa.create({ nombre, estado });
        responseAPI.msg = 'Mesa creada correctamente';
        responseAPI.data = nuevaMesa;
        res.status(201).json(responseAPI);
    } catch (err) {
        console.error('Error creando mesa:', err);
        next(err);
    }
};

export const getMesas = async (req, res, next) => {
    try {
        const mesas = await Mesa.find().sort({ nombre: 1 });
        responseAPI.msg = 'Mesas encontradas';
        responseAPI.data = mesas;
        responseAPI.cant = mesas.length;
        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error obteniendo mesas:', err);
        next(err);
    }
};

export const updateMesa = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;

    try {
        const mesaActualizada = await Mesa.findByIdAndUpdate(id, { nombre, estado }, { new: true });
        if (!mesaActualizada) {
            return res.status(404).json({ msg: 'Mesa no encontrada', status: 'error' });
        }
        responseAPI.msg = 'Mesa actualizada correctamente';
        responseAPI.data = mesaActualizada;
        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error actualizando mesa:', err);
        next(err);
    }
};

export const getMesaById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const mesa = await Mesa.findById(id);
        if (!mesa) {
            return res.status(404).json({ msg: 'Mesa no encontrada', status: 'error' });
        }
        responseAPI.msg = 'Mesa encontrada';
        responseAPI.data = mesa;
        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error obteniendo mesa:', err);
        next(err);
    }
};
