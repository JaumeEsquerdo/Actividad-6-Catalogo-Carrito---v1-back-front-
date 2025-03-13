import { Router } from "express" //importar libreria

import {getUsuario, updateUsuario, createUsuario} from '../controllers/users.controller.js'
import { getProducto, createProducto, getProductos } from "../controllers/products.controller.js";

const router = Router()

// usuairos


router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario)

// productos

router.get("/productos/:id", getProducto);
router.post("/productos", createProducto);
router.get("/productos", getProductos);


export default router;