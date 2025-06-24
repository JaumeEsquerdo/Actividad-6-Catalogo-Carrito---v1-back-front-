import '@/css/menu.css'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'

const Menu = () => {
    const navigate = useNavigate()
    const mesaId = localStorage.getItem('mesaId')

    const [mesa, setMesa] = useState(null)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState('todos')

    const backendURL = "http://localhost:3000"; // o la URL de producción


    useEffect(() => {
        if (!mesaId) {
            navigate('/') // si no hay mesa redirige a la selección
            return
        }

        // Si hay una mesa, intenta cargar el carrito al ui guardado de esa mesa desde localStorage
        const savedCart = localStorage.getItem(`cart_${mesaId}`)
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [mesaId])

    // recarga el contenido de la mesa y carrito
    useEffect(() => {
        if (mesaId) {
            localStorage.setItem(`cart_${mesaId}`, JSON.stringify(cart))
        }
    }, [cart, mesaId])

    // obtener datos de la mesa elejida
    useEffect(() => {
        const fetchMesa = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/mesas/${mesaId}`)
                const responseAPI = await res.json()
                console.log(responseAPI)
                setMesa(responseAPI.data)
            } catch (e) {
                console.error('Error al obtener la mesa:', e)
            }
        }

        if (mesaId) {
            fetchMesa()
        }
    }, [mesaId])


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/productos')
                const responseAPI = await response.json()
                setProducts(responseAPI.data)
                console.log('productos', responseAPI.data)
            } catch (e) {
                console.error('error al obtener productos', e)
            }
        }
        fetchProducts()
    }, [])

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id)
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    const filterProductos = products.filter(product =>
        filters === 'todos' ? true : product.tipo === filters
    )

    const logout = () => {
        localStorage.removeItem('mesaId')
        localStorage.removeItem(`cart_${mesaId}`)
        navigate('/')
    }


    // funcion para la compra
    const pagarCompra = async () => {
        if (cart.length === 0) return alert("El carrito está vacío");

        try {
            const res = await fetch('http://localhost:3000/api/v1/compras', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mesa: mesaId,
                    productos: cart.map(({ _id, quantity }) => ({ producto: _id, cantidad: quantity }))
                })

            }); // Enviamos al backend la compra con la mesa y los productos (id y cantidad) del carrito actual

            if (!res.ok) throw new Error('Error al enviar la compra');

            const data = await res.json();
            console.log('Compra registrada:', data);

            setCart([]);
            localStorage.removeItem(`cart_${mesaId}`);

            alert('Compra realizada con éxito');

        } catch (error) {
            console.error(error);
            alert('Error al realizar la compra');
        }
    };



    return (
        <div className="PageWrap">
            <aside className="ImgMenu">img</aside>
            <main className="Menu">
                <h1 className="Menu-h1">SUSHIRO</h1>
                <h2>
                    {mesa && mesa.numero
                        ? `Mesa ${mesa.numero} haciendo su pedido`
                        : 'Esperando cliente...'}
                </h2>
                <nav className="Menu-filters">
                    {['todos', 'sushi', 'nigiri', 'otros'].map((f) => (
                        <button
                            key={f}
                            className={`Btn-link ${filters === f ? 'active' : ''}`}
                            onClick={() => setFilters(f)}
                        >
                            {f[0].toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </nav>

                <div className="Order">
                    <GaleriaMenu backendURL={backendURL} products={filterProductos} addToCart={addToCart} />
                </div>

                <div className="Order-div">
                    <h3>TU PEDIDO:</h3>
                    {cart.length === 0 ? (
                        <p>No hay productos en el carrito</p>
                    ) : (
                        <>
                            <ul className="Order-ul">
                                {cart.map((item) => (
                                    <li key={item._id}>
                                        <p className="Order-p">
                                            {item.name} : {item.quantity} x {item.precio}€ ={' '}
                                            {item.quantity * item.precio} €
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <h3>
                                Total:{' '}
                                {cart.reduce((total, item) => total + item.quantity * item.precio, 0)}€
                            </h3>
                        </>
                    )}
                </div>

                <button onClick={pagarCompra}>Pagar compra</button>
                <button onClick={logout}>Cambiar de mesa</button>
            </main>
        </div>
    )
}

export default Menu

const getStrokeColor = (tipo) => {
    switch (tipo) {
        case 'roll':
            return '#FF6400'; // Naranja intenso para premium
        case 'standard':
            return '#007ACC'; // Azul elegante para estándar
        case 'basic':
            return '#888888'; // Gris suave para básico
        default:
            return '#333333'; // Gris oscuro por defecto
    }
};
export const GaleriaMenu = ({ products, addToCart, backendURL }) => {
    return (
        <div className="GaleriaMenu">
            {products.map((product) => {
                const imageUrl = `${backendURL}/uploads/${product.img}`;
                const strokeColor = getStrokeColor(product.tipo);

                return (
                    <div key={product._id} className="Card">
                        <div className="Card-imageWrapper">
                            <img
                                className="Card-img"
                                src={imageUrl || '/img/imagen-no-encontrada.jpg'}
                                alt={product.name}
                            />
                            <svg
                                className="Card-imageStroke"
                                width="140"
                                height="140"
                                viewBox="0 0 140 140"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="
                M70 5
                C95 5 130 20 130 70
                C130 115 95 135 70 135
                C45 135 10 115 10 70
                C10 25 45 5 70 5
                Z
              "
                                    stroke={strokeColor}
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <p className="Card-name">{product.name}</p>
                        <p className="Card-price">{product.precio}€</p>
                        <button onClick={() => addToCart(product)}>Añadir</button>
                    </div>
                );
            })}
        </div>

    );
};



/** f[0]         // 's'   ← primera letra
f.slice(1)   // 'ushi' ← desde la posición 1 (segunda letra) hasta el final
entonces..
f[0].toUpperCase() + f.slice(1)
= 'S' + 'ushi'
= 'Sushi' */