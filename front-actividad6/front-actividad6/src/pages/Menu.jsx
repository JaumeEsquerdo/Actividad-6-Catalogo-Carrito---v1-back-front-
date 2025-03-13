import '@/css/menu.css'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
const Menu = () => {

    const [user, setUser] = useState(null);
    const userId = "67d2134192e8a897b6d1f3ed"
    const [cart, setCart] = useState([]) //carrito
    const [products, setProducts] = useState([]) //productos
    const [filters, setFilters] = useState("todos") //filtro
    const [purchased, setPurchased] = useState([]) // lista de compra definitiva?

    // const filters = [
    //     { name: "Todos", value: "todos" },
    //     { name: "Sushi", value: "sushi" },
    //     { name: "Nigiri", value: "nigiri" },
    //     { name: "Otros platos", value: "otros" }
    // ]

    // fetch usuario
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

    // fetch productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/productos')
                const responseAPI = await response.json()
                //cuidado! tienes que guardar el contenido de dentro del array no lo de fuera! si no no puedes hacer nada con eso despues
                console.log('CONSOLE RESPONSEAPI.DATA',responseAPI.data)
                setProducts(responseAPI.data)
                console.log('CONSOLE RESPONSEAPI.DATA',responseAPI.data)
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
        console.log('Console log de cart!', cart)
    };

    const filterProductos = products.filter((product) => {
        console.log('Console de product', product)
        return filters === "todos" ? true : product.tipo === filters
    });




    return (
        <main className="Menu">
            {user ? <h2>Elige lo que más te apetezca {user.name}</h2> : <h2>Esperando cliente...</h2>}
            {/* PENDIENTE FILTROS */}
            <nav className="Menu-filters">
                <button
                    className={filters === "todos" ? "active" : ""}
                    onClick={() => setFilters("todos")}
                >
                    Todos
                </button>
                <button
                    className={filters === "sushi" ? "active" : ""}
                    onClick={() => setFilters("sushi")}
                >
                    Sushi
                </button>
                <button
                    className={filters === "nigiri" ? "active" : ""}
                    onClick={() => setFilters("nigiri")}
                >
                    Nigiri
                </button>
                <button
                    className={filters === "otros" ? "active" : ""}
                    onClick={() => setFilters("otros")}
                >
                    Otros platos
                </button>
            </nav>



            <div className='Order'>
                <GaleriaMenu products={filterProductos} addToCart={addToCart} />

                <div>
                    <h3>Tu pedido:</h3>
                    {cart.length === 0 ? (<p>No hay productos en el carrito</p>)
                        :
                        <ul>
                            {console.log('console de cart',cart)}
                            {cart.map((item) => (
                                <li key={item._id}>
                                    {item.name} : {item.quantity} x {item.precio}€ = {`${parseFloat(item.quantity) * parseFloat(item.precio)} €`}
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
        {products.length === 0 ? (<p>Cargando productos...</p>) : (
            products.map((product) => (
                <div key={product._id} className='GaleriaMenu-item' onClick={() => addToCart(product)}>
                    <img src={product.img || "/img/imagen-no-encontrada.jpg"} alt={product.name} />
                    <p>{product.name} - {product.price}€</p>
                </div>
            ))
        )}

    </div>);
}

