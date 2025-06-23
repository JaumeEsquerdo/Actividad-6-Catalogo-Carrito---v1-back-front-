import { Router } from "express" //importar libreria

import { getUsuario, updateUsuario, createUsuario } from '../controllers/users.controller.js'
import { getProducto, createProducto, getProductos, updateProductos, updateImage } from "../controllers/products.controller.js";
import { registerUser, loginUser, getCurrentUser } from "../controllers/auth.controller.js";
import { crearCompra, getCompras, pagarCompra } from "../controllers/compras.controller.js";
import { getMesas, crearMesa, updateMesa, getMesaById } from "../controllers/mesas.controller.js";


import { authMiddleWare } from "../middleware/auth.middleware.js";
import { uploadImg } from "../middleware/upload.middleware.js";

const router = Router()


// Rutas de Autentificación AUTH
//auth.controller.js
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleWare, getCurrentUser);

router.get("/protected", authMiddleWare, (req, res) => {
    res.json({ message: "Estás en una ruta protegida, Felicidades tu token es válido" })
})


// usuairos
router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario)

// productos

router.get("/productos/:id", getProducto);
router.post("/productos", createProducto);
router.get("/productos", getProductos);
router.put("/productos/:id", updateProductos);
router.put("/productos/:id/image", uploadImg.single('imgprod'), updateImage); // ruta solo para actualizar la img del producto especifico

// Mesas

router.get("/")
router.get("/mesas/:id", getMesaById);
router.post("/mesas", crearMesa);
router.put("/mesas/:id", updateMesa);

// Compras
router.post("/compras", crearCompra);
router.get("/compras", getCompras);
router.put("/compras/:id/pagar", pagarCompra);


export default router;