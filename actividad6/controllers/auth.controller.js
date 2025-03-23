
import { Usuario } from '../db/models/usuario.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'
const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const registerUser = async (req, res, next) => {

    try {
        //traer datos del body
        const { email, password, name } = req.body

        //verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'el usuario con ese email ya existe, intena hacer un login si eres tú...'
            })
        }

        //crear el nuevo usuario
        const user = new Usuario({
            email, password, name
        });
        await user.save();

        // Generar nuevo token JWT (datos, clave secreta, configuraciones especiales)
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name
            },
            JWT_SECRET
            ,
            { expiresIn: '2h' });

        // devolver datos del usuario + JWT token


        res.status(201).json({
            message: "Usuario generado correctamente",
            token,
            // user: user // ESTO NO SE HACE! ESTAS MANDANDO LA PASS... de uno en uno como lo tienes abajo
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        next(e)
    }
}


export const loginUser = async (req, res, next) => {

    try {
        //traer datos del body
        const { email, password } = req.body

        // verificar si existe el usuario
        const existingUser = await Usuario.findOne({ email });

        // si no existe, termino la petición
        if (!existingUser) {
            return res.status(401).json({
                message: 'Usuario o clave inválidos'
            })
        }

        // Comparo la clave del request con la clave de la DB
        if (password != existingUser.password) {
            return res.status(401).json({
                message: 'Usuario o clave inválidos'
            })
        }
        
        // Generar nuevo token JWT (datos, clave secreta, configuraciones especiales)
        const token = jwt.sign(
            {
                userId: existingUser._id,
                name: existingUser.name
            },
            JWT_SECRET
            ,
            { expiresIn: '2h' });


        // si existe
        // mensaje ok
        //devolver user (sin datos sensibles

        // enviar

        res.status(201).json({
            mensaje: "Usuario logeado correctamente",
            token,
            // user: user // ESTO NO SE HACE! ESTAS MANDANDO LA PASS... de uno en uno como lo tienes abajo
            existingUser: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        })

    } catch (e) {
        next(e)
    }
}


export const getCurrentUser = async (req, res, next) => {

    //leer el token
    // extraer el id
    // si el token es invalido, devolver error

    try{
        // obtener el id del token
        const idUsuario = req.userId

        const user = await Usuario.findById(idUsuario).select('-password'); // traer todo el usuario menos el password

        if(!user){
            return res.status(404).json({
                message: 'usuario no encontrado'
            })
        }

        const response = {
            message: 'usuario encontrado correctamente',
            data: user,
            status: 'ok'
        }

        res.status(200).json(response);

    }catch(e){
        next(e)
    }


}