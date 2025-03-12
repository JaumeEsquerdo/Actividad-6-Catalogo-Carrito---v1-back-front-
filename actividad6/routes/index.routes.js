import { Router } from "express" //importar libreria

import {getUsuario, updateUsuario, createUsuario} from '../controllers/users.controller.js'


const router = Router()

//crear usuairos y productos


router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario)

export default router;