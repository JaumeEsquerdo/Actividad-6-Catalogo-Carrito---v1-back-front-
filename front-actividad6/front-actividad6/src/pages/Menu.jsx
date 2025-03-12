import '@/css/menu.css'
import { useState, useEffect } from 'react';
const Menu = () => {
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(null)
    const precio = 0
    const [user, setUser] = useState(null);
    const userId = "67d2134192e8a897b6d1f3ed"

    const handlePrevent = ()=>{
        e.handlePrevent();
    }

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const response = await fetch(`http://localhost:3000/api/v1/usuarios/
                    ${userId}`)

                    const data = await response.json()

                    setUser(data)

            }catch(e){
                console.error('error en el try', e)
            }
        }
        fetchUser()
    }, [])
    return (
        <main className="Menu">

            <GaleriaMenu />

            <form onClick={handlePrevent} className='CheckOut'>
                <label >
                <input type="text" value={product}/>
                </label>
                <label >
                <input type="number" value={quantity}/>
                </label>
                <label >
                <input type="number" value={precio}/>
                </label>
                <button className='CheckOut-btn'>Pedir</button>
            </form>


        </main>
    );
}

export default Menu;

export const GaleriaMenu = () => {
    return (<div className="GaleriaMenu">
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />
        <img className='GaleriaMenu-img' src="/img/imagen-no-encontrada.jpg" alt="" />


    </div>);
}

