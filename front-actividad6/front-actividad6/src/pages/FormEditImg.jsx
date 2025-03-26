import { useState } from "react";


const FormEditImg = () => {

    const [formData, setFormData] = useState({
        name:"",
        img:"",
        precio:0,
        tipo:""

    })
    const [imageUrl, setImageUrl] = useState("/no-image.png")

    const [idImg, setImg] = useState("67d306af36bc312ea6369f37")

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const datosFormu = new FormData();

        // Object.entries(formData).forEach( ([kew, value])=>{
        //     datosFormu.append(key, value);
        // })

        try{

            const response = await fetch(`${BACKEND_URL}/api/v1/productos/${idImg}`,{
                method: "PUT",
                headers:{
                'Content-Type': "application/json"},
                body: JSON.stringify(formData)
                
            })

            if(response.ok){
                const data = await response.json();
                console.log("datos del backend son:", data);

            }

        }catch(e){
            console.error("Error al enviar el formulario", e)
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        //console.log(file)
        if(!file) return;

        const formDataImg = new FormData();
        formDataImg.append('imgprod', file);

        try{

            const response = await fetch(`${BACKEND_URL}/api/v1/productos/${idImg}/image`,{
                method: "PUT",
                body:formDataImg
            })

            if(response.ok){
                const jsonData = await response.json();
                console.log("imagen de subida:", jsonData);
                setImageUrl(jsonData.data.imageUrl)

            }

        }catch(e){
            console.error("Error al enviar el formulario de la img", e)
        }



    }
    
    
    return (
        
        <>
        <h3>Formulario para editar Imagen: {formData.title}</h3>

        <form onSubmit={handleSubmit}>

            <label>
                <input type="text" 
                value={formData.name} 
                id="nombre-input" 
                placeholder="Nombre"
                onChange={ (e) => setFormData({...formData, name: e.target.value})} />
            </label>

            <label>
                <input type="number" 
                value={formData.precio} 
                id="precio-input" 
                placeholder="Precio"
                onChange={ (e) => setFormData({...formData, precio: e.target.value})} />
            </label>

            <label>
                <input type="text" 
                value={formData.tipo} 
                id="tipo-input" 
                placeholder="tipo"
                onChange={ (e) => setFormData({...formData, tipo: e.target.value})} />
            </label>
            
            <label >
                <input type="file" 
                id="image-input" 
                placeholder="Imágen" 
                accept="image/*" 
                onChange={handleImageUpload}/>
            </label>

            <button type="submit">Enviar</button>
        </form>

        <h4>Vista previa de la img</h4>
        <img src={imageUrl} alt={formData.title} />

        </>
    );
}

export default FormEditImg;