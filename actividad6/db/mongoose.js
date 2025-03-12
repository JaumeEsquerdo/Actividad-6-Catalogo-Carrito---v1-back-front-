import mongoose from "mongoose"
import { DB_USER, DB_PASS, DB_CLUSTER, DATABASE } from "../config/config.js"


export const conectarDB = async () => {

    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/${DATABASE}?retryWrites=true&w=majority&appName=CEI-VALENCIA-MONGODB-PRACTICAS`


    try {
        await mongoose.connect(url)
        console.log("conectado a mongoDB Atlas")
        console.log("base de datos actual:", mongoose.connection.db.databaseName)

        //preguntar que colecciones tengo disponibles
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('colleciones disponibles', collections.map(c => c.name));
    } catch (e) {
        console.error('error al conectarse', e)
    }

}