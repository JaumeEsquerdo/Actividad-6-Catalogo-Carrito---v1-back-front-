import { Router } from "express" //importar libreria

import {getUsuario, updateUsuario, createUsuario} from '../controllers/users.controller.js'
import { getProducto, createProducto, getProductos } from "../controllers/products.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { registerUser, loginUser, getCurrentUser } from "../controllers/auth.controller.js";

const router = Router()


// Rutas de Autentificación AUTH
//auth.controller.js
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleWare, getCurrentUser);

router.get("/protected", authMiddleWare, (req , res )=>{
    res.json({message:"Estás en una ruta protegida, Felicidades tu token es válido"})
})


// usuairos
router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario)

// productos

router.get("/productos/:id", getProducto);
router.post("/productos", createProducto);
router.get("/productos", getProductos);


export default router;