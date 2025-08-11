import React, { useState } from 'react';

const FormImage = () => {
    const [archivo, setArchivo] = useState(null); // para guardar el archivo seleccionado
    const [mensaje, setMensaje] = useState('');   // mensaje de éxito o error
    const [url, setUrl] = useState('');           // URL de la imagen subida (para mostrarla luego)

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_PRODUCTO_UPLOAD = import.meta.env.VITE_PRODUCTO_UPLOAD

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevenimos el comportamiento por defecto del formulario (evita recarga)

        if (!archivo) {
            setMensaje('⚠️ Selecciona una imagen primero.');
            return;
        }

        // Creamos un objeto FormData para poder enviar datos multimedia (archivos, imágenes, etc.) al backend..
        // ya que con fetch no se puede enviar archivos directamente en JSON
        // FormData actua como un formulario HTML real y empaqueta los datos correctamente
        const formData = new FormData();

        // Agregamos el archivo seleccionado al FormData.
        // El nombre 'imgprod' debe coincidir con el nombre que espera multer en el backend: uploadImg.single('imgprod').
        formData.append('imgprod', archivo);


        try {
            // Enviamos el FormData al backend con fetch
            // La propiedad 'body' recibe el FormData que incluye el archivo
            const res = await fetch(`${API_URL}${API_ROUTER}${API_PRODUCTO_UPLOAD}`, {
                method: 'POST',
                body: formData, // aquí va todo el formulario, incluida la imagen
            });

            const data = await res.json();

            // Si hubo error en la respuesta, lo mostramos
            if (!res.ok || !data.success) {
                setMensaje('❌ Error al subir la imagen.');
                return;
            }

            // Todo fue bien: mostramos mensaje y guardamos URL para previsualizar
            setMensaje('✅ Imagen subida con éxito.');

            // La URL que devuelve el backend, usamos el nombre del archivo
            setUrl(`http://localhost:3000/uploads/${data.data.filename}`);
        } catch (err) {
            console.error(err);
            setMensaje('❌ Error inesperado al subir la imagen.');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '2rem auto',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px'
            }}
        >
            <h2>Subir imagen</h2>

            {/* Formulario controlado por React, el enctype es importante para que el FormData funcione */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Input para seleccionar archivo. Guardamos el archivo en el state con setArchivo */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setArchivo(e.target.files[0])}
                    required
                />
                <br /><br />
                <button type="submit">Subir</button>
            </form>

            {/* Mensaje de éxito o error */}
            {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}

            {/* Si se subió correctamente, mostramos la imagen */}
            {url && (
                <div style={{ marginTop: '1rem' }}>
                    <p>Imagen subida:</p>
                    <img src={url} alt="Imagen subida" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default FormImage;
