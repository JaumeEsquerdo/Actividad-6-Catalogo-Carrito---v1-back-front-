import '@/css/menu.css'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Menu = () => {

    const navigate = useNavigate();


    const [user, setUser] = useState(null);
    // const userId = "67e05d8d980f2bae50decf29"
    const [cart, setCart] = useState([]) //carrito
    const [products, setProducts] = useState([]) //productos
    const [filters, setFilters] = useState("todos") //filtro
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false); // modal para login


    // Cargar carrito desde LocalStorage al iniciar
    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cart${user._id}`) // para q se guarde con el id;
            if (savedCart) {
                setCart(JSON.parse(savedCart))
            }
        }

    }, [user])

    // guardar carrito en LocalStorage cada vez que cambia
    useEffect(() => {
        if (user) {
            console.log("Guardando carrito:", cart);

            localStorage.setItem(`cart${user._id}`, JSON.stringify(cart))
        }

    }, [cart, user])

    // fetch usuario 
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate("/login")
                return
            }

            try {
                const res = await fetch(`http://localhost:3000/api/v1/auth/me`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!res.ok) throw new Error("Token inválido o expirado")

                const userData = await res.json()
                setUser(userData)

            } catch (e) {
                console.error("Error al traer el usuario:", e)
                localStorage.removeItem("token")
                navigate("/login")
            }
        }

        fetchUser()
    }, [])

    //FETCH PRODUCTOS
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/productos')
                const responseAPI = await response.json()
                //cuidado! tienes que guardar el contenido de dentro del array no lo de fuera! si no no puedes hacer nada con eso despues
                console.log('CONSOLE RESPONSEAPI.DATA', responseAPI.data)
                setProducts(responseAPI.data)
                console.log('CONSOLE RESPONSEAPI.DATA', responseAPI.data)
            } catch (e) {
                console.error(`error al obtener productos`, e)
            }
        }
        fetchProducts();
    }, []);


    const addToCart = (product) => {
        if (!user) {
            alert("Debes de iniciar sesión para agregar productos!")
            return;
        }
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id
            )
            if (existingProduct) {
                return prevCart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)

            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    };

    const filterProductos = products.filter((product) => {
        console.log('Console de product', product)
        return filters === "todos" ? true : product.tipo === filters
    });

    //limpiar con logout, pero no del localstorage
    const logout = () => {
        setUser(null)
        setCart([])
        navigate("/login")

    }


    return (
        <>
            <div className='PageWrap'>
                <aside className='ImgMenu'>
                    img
                </aside>
                <main className="Menu">
                    <h1>Logo? </h1>
                    {user ? <h2>Elige lo que más te apetezca {user.data.name}</h2> : <h2>Esperando cliente...</h2>}
                    {/* PENDIENTE FILTROS */}
                    <nav className="Menu-filters">
                        <button
                            className={`Btn-link ${filters === "todos" ? "active" : ""}`}
                            onClick={() => setFilters("todos")}
                        >
                            Todos
                        </button>
                        <button
                            className={`Btn-link ${filters === "sushi" ? "active" : ""}`}
                            onClick={() => setFilters("sushi")}
                        >
                            Sushi
                        </button>
                        <button
                            className={`Btn-link ${filters === "nigiri" ? "active" : ""}`}
                            onClick={() => setFilters("nigiri")}
                        >
                            Nigiri
                        </button>
                        <button
                            className={`Btn-link ${filters === "otros" ? "active" : ""}`}
                            onClick={() => setFilters("otros")}
                        >
                            Otros platos
                        </button>
                    </nav>
                    <Link to="/formImage">Form para subir img</Link>




                    <div className='Order'>
                        <GaleriaMenu products={filterProductos} addToCart={addToCart} />

                        <div className='Order-div'>
                            <h3>TU PEDIDO:</h3>
                            {cart.length === 0 ? (<p>No hay productos en el carrito</p>)
                                :
                                <ul className='Order-ul'>
                                    {console.log('console de cart', cart)}
                                    {cart.map((item) => (
                                        <li key={item._id}>
                                            <p className='Order-p'>{item.name} : {item.quantity} x {item.precio}€ = {`${parseFloat(item.quantity) * parseFloat(item.precio)} €`}</p>
                                        </li>
                                    ))}
                                </ul>
                            }
                            {
                                cart.length !== 0 ? (<h3>Total: {cart.reduce((total, item) => total + item.quantity * item.precio, 0)}€</h3>) : ("")
                            }
                            {/* .reduce()  calcula el total acumulado sumando en cada iteracion el total anterior con el precio por la cantidad de cada producto. El 0 es la posición inicial */}

                        </div>

                    </div>
                    <button onClick={logout}>Salir de la sesión</button>
                </main>
            </div>
        </>
    );
}

export default Menu;

export const GaleriaMenu = ({ products, addToCart }) => {
    return (<div className="GaleriaMenu">
        {products.length === 0 ? (<p>Cargando productos...</p>) : (
            products.map((product) => (
                <div key={product._id} className='GaleriaMenu-item' onClick={() => addToCart(product)}>
                    <img className='GaleriaMenu-img' src={product.img || "/img/imagen-no-encontrada.jpg"} alt={product.name} />
                    <p className='GaleriaMenu-p'>{product.name} - {`${parseFloat(product.precio)}`}€</p>
                </div>
            ))
        )}

    </div>);
}

