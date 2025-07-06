// import { useState, useEffect } from "react";

// const FormProducto = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         descripcion: "",
//         img: "",
//         precio: 0,
//         tipo: ""
//     });

//     const [imageList, setImageList] = useState([]);
//     const [imageUrlPreview, setImageUrlPreview] = useState("/no-image.png");

//     const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const res = await fetch(`${BACKEND_URL}/api/v1/imagenes`);
//                 const data = await res.json();
//                 setImageList(data.images);
//             } catch (e) {
//                 console.error("Error al cargar imágenes", e);
//             }
//         };

//         fetchImages();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`${BACKEND_URL}/api/v1/productos`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("Producto creado:", data);
//             }

//         } catch (e) {
//             console.error("Error al enviar el formulario", e);
//         }
//     };

//     return (
//         <>
//             <h3>Crear producto</h3>

//             <form onSubmit={handleSubmit}>
//                 <input type="text"
//                     value={formData.name}
//                     placeholder="Nombre"
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />

//                 <input type="number"
//                     value={formData.precio}
//                     placeholder="Precio"
//                     onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
//                 />

//                 <input type="text"
//                     value={formData.tipo}
//                     placeholder="Tipo"
//                     onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
//                 />

//                 <textarea
//                     value={formData.descripcion}
//                     placeholder="Descripción"
//                     onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
//                 />

//                 <h4>Seleccionar imagen:</h4>
//                 <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//                     {imageList.map(img => (
//                         <div key={img.filename} style={{ cursor: 'pointer' }}
//                             onClick={() => {
//                                 setFormData({ ...formData, img: img.filename });
//                                 setImageUrlPreview(img.url);
//                             }}>
//                             <img src={img.url} alt={img.filename} width={100} style={{
//                                 border: formData.img === img.filename ? '2px solid blue' : '1px solid #ccc'
//                             }} />
//                         </div>
//                     ))}
//                 </div>

//                 <h4>Vista previa:</h4>
//                 <img src={imageUrlPreview} alt="preview" width={200} />

//                 <button type="submit">Guardar producto</button>
//             </form>
//         </>
//     );
// };

// export default FormProducto;
