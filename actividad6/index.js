import express from 'express';

import {PORT, DOMAIN} from './config/config.js' //config


import {conectarDB} from './db/mongoose.js'

// importar middleware de multer
import {uploadImg} from './middleware/upload.middleware.js'



import cors from 'cors' //para q funcione el fetch a un front
import router from './routes/index.routes.js';

//multer
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

const app= express();


//llamar a la función fuera

app.use(cors()); //conectar desde cualquier conexión
app.use(express.json()) //leer datos que vienen en el body de mi request
app.use(express.urlencoded({extended:true})) // nos permite leer datos desde formularios HTML

conectarDB();

//RUTAS FRONT
//limpiar la terminal cada vez que reinicio proyecto
console.clear();
app.get("/", (req,res)=>{
    // res.send("Bienvenidos a nuestra API con express y mongo")
    const landingHtml = `
    <h2>Hola </h2>
    <p>Bienvenidos a la prueba del backend para ponerlo en Varcel</p>
    <hr>
    <h2>Upload de archivos </h2>
    <form action="/api/v1/producto/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="imgprod" />
    <button type="submit">Subir imagen </button>
    </form>
    `;
    res.send(landingHtml)
    
})


// ruta para subir imagen de producto
// usamos el middleware de multer para procesar "imgprod"
router.post("/producto/upload", uploadImg.single('imgprod'), (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No se ha proporcionado una imagen"
            })
        }
        console.log(req.file)

        // recibir img
        const imageUrl = `${BACKEND_URL}/uploads/${req.file.filename}`


        //guardar req.file.filename en la base de datos no la url porq puede ser calhost, vercel....

        //response al usuario
        return res.status(200).json({
            success: "ok",
            message: "imagen subida con éxito",
            fileData: req.file,
            data: {
                imageUrl: imageUrl,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                peso: `${Math.round(req.file.size / 1024)} KBytes`
            }
        })
    } catch (e) {
        next(e)
    }
});


app.use("/api/v1", router)


//puerto PORT
app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
})