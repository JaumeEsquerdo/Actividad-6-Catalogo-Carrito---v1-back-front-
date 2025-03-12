import '@/css/menu.css'
import { useState } from 'react';
const Menu = () => {
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(null)
    const precio = 0

    const handlePrevent = ()=>{
        e.handlePrevent();
    }
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

