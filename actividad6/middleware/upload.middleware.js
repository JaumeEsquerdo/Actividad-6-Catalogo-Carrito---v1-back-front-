import multer from "multer";

import path from 'path'; // para leer la extension final

//config de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // aqui definimos donde vamos a subir nuestros archivos
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        // aqui definimos el nombre que tendrá nuestro upload

        // V1 guardar el archivo con el nombre que lo subí
       // cb(null, file.originalname)

        //V2 generar un nombre único usando la fecha
        //ej: unixTimestamp-342413.jpg

        //V3 (RECOMENDADA) Generar un nombre único que use el name del input + la fecha
        // ej: imgprod-123123123.jpg
        const fileExt = path.extname(file.originalname) // .doc .exe .png .gif

        const date = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-'); //convertirlo a texto + remplazar partes de la fecha de :  por -


        // creamos el nuevo nombre del archivo
        const fileName = `${file.fieldname}-${date}${fileExt}`
        console.log("Nombre generado:", fileName);

        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    // comprobar el tipo de archivo
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('El archivo debe ser una imágen válida'), false)
    }

}


// upload de una img
export const uploadImg = multer({
    storage: storage,
    fileFilter: fileFilter,
    limit: {
        fileSize: 5 * 1024 * 1024 // limitar el upload a 5mb
    }
});
