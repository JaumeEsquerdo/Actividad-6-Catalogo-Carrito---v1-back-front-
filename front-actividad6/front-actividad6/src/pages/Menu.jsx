import '@/css/menu.css'
import { useState, useEffect } from 'react';
const Menu = () => {

    const [user, setUser] = useState(null);
    const userId = "67d2134192e8a897b6d1f3ed"
    const [cart, setCart] = useState([]) //carrito
    const [products, setProducts] = useState([]) //productos

    const handlePrevent = () => {
        e.handlePrevent();
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/usuarios/${userId}`)

                const userData = await response.json()
                console.log(userData)
                setUser(userData)

            } catch (e) {
                console.error('error en el try', e)
            }
        }
        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/productos')
                const data = await response.json()

                setProducts(data)
            } catch (e) {
                console.error(`error al obtener productos`, e)
            }
        }
        fetchProducts();
    }, []);


    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id
            )
            if (existingProduct) {
                return prevCart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    return (
        <main className="Menu">
            {user ? <h2>Elige lo que más te apetezca {user.name}</h2> : <h2>Esperando cliente...</h2>}

            <div className='Order'>
                <GaleriaMenu products={products} addToCart={addToCart} />

                <div>
                    <h3>Tu pedido:</h3>
                    {cart.length === 0 ? (<p>No hay productos en el carrito</p>)
                        :
                        <ul>
                            {cart.map((item) => (
                                <li key={item._id}>
                                    {item.name} - {item.quantity} x {item.price}€ = {item.quantity * item.price}
                                </li>
                            ))}
                        </ul>
                    }

                </div>

            </div>

        </main>
    );
}

export default Menu;

export const GaleriaMenu = ({ products, addToCart }) => {
    return (<div className="GaleriaMenu">
        {products.lenght === 0 ? (<p>Cargando productos...</p>) : (
            products.map((product) => (
                <div key={product_id} className='GaleriaMenu-item' onClick={() => addToCart(product)}>
                    <img src={product.img || "/img/imagen-no-encontrada.jpg"} alt={product.name} />
                    <p>{product.name} - {product.price}€</p>
                </div>
            ))
        )}

    </div>);
}

