import express from 'express';

import {PORT, DOMAIN} from './config/config.js' //config


import {conectarDB} from './db/mongoose.js'

import cors from 'cors' //para q funcione el fetch a un front
import router from './routes/index.routes.js';

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
    res.send("Bienvenidos a nuestra API con express y mongo")
    
})

app.use("/api/v1", router)

//puerto PORT
app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
})