import { useState, useEffect } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import CloseButton from '@/components/CloseButton'
import { useUI } from '@/context/UIContext';
import { Toast } from '@/components/Toast';
import { GaleriaMenu } from '@/components/GaleriaMenu';
import { DetalleproductoSeleccionadoModal } from '@/components/DetalleProductoSeleccionadoModal';
import { CartAside } from '@/components/CartAside';
import { CartBar } from '@/components/CartBar';
import { MenuFilters } from '@/components/MenuFilters';
import { MesaHeader } from '@/components/MesaHeader';
import { LogoutConfirmModal } from '@/components/LogoutConfirmModal';
import { HistorialModal } from '@/components/HistorialModall';
import { ToastCarrito } from '@/components/ToastCarrito';
import { AnimatePresence, motion } from 'framer-motion';

const Menu = () => {
    const navigate = useNavigate()
    const mesaId = localStorage.getItem('mesaId')

    const [mesa, setMesa] = useState(null)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState('todos')
    // const [productoSeleccionado, setProductoSeleccionado] = useState(null); // expandir producto a la izq
    // const [isCartOpen, setIsCartOpen] = useState(false);
    const [showToast, setShowToast] = useState(false); // toast de compra
    const [showToastCarrito, setShowToastCarrito] = useState(false); // para el añadir al carrito
    const [toastCarrito, setToastCarrito] = useState(""); // para el toast de añadir a carrito

    const [modalAbierto, setModalAbierto] = useState(false); // para que se rendereice o no la pregunta de cerrar sesion de la mesa (modal)
    const [modalHistorialAbierto, setModalHistorialAbierto] = useState(false); // modal de historial

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_MESAS = import.meta.env.VITE_MESAS
    const API_PRODUCTOS = import.meta.env.VITE_PRODUCTOS
    const API_COMPRAS = import.meta.env.VITE_COMPRAS
    
    const backendURL = "https://sushiro-restaurante-carrito-de-comp.vercel.app"; // o http://localhost:3000
    const { openCart, selectProduct,
        clearSelectedProduct, productoSeleccionado, setProductoSeleccionado } = useUI();


    const isMobile = window.innerWidth <= 1460; // para poder abrir los detalles de producto a la izq si es en pc y en overlay si es más pequeño


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
                const res = await fetch(`${API_URL}${API_ROUTER}${API_MESAS}${mesaId}`)
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

    /* obtener todos los productos */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}${API_ROUTER}${API_PRODUCTOS}`)
                const responseAPI = await response.json()
                setProducts(responseAPI.data)
                console.log('productos', responseAPI.data)
            } catch (e) {
                console.error('error al obtener productos', e)
            }
        }
        fetchProducts()
    }, [])


    /* función para mostrar un toast para el añadir producto */
    const showToastAñadir = (message) => {
        setToastCarrito(message)
        setShowToastCarrito(true)
    }

    /* función añadir producto */
    const addToCart = (product, cantidad = 1) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id)
            if (existingProduct) {
                showToastAñadir(`Añadido ${cantidad} <span class="ToastCarrito-name">${product.name}</span> más al carrito`)
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + cantidad }
                        : item
                )
            } else {
                showToastAñadir(`Añadido ${cantidad} <span class="ToastCarrito-name">${product.name}</span> al carrito`)
                return [...prevCart, { ...product, quantity: cantidad }]
            }
        })
    }

    /* eliminar un rpoducto del carrito por id */
    const removeOneFromCart = (productId) => {
        setCart((prevCart) => {
            return prevCart
                .map(item => {
                    if (item._id === productId) {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity <= 0) return null; // Eliminar si llega a 0
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                .filter(Boolean); // Elimina los productos que se han quedado como null (por cantidad 0) ELEMENTOS FALSY
        });
    };

    /* aumentar en uno el producto con ese id */
    const addOneToCart = (productId) => {
        setCart((prevCart) => {
            return prevCart.map(item => {
                if (item._id === productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    };


    /* eliminar toda cantidad de este producto */
    const removeProductCompletely = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    };


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

        const sesionId = localStorage.getItem('sesionId');

        try {
            const res = await fetch(`${API_URL}${API_ROUTER}${API_COMPRAS}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mesa: mesaId,
                    sesionId: sesionId,
                    productos: cart.map(({ _id, quantity }) => ({ producto: _id, cantidad: quantity }))
                })

            }); // Enviamos al backend la compra con la mesa y los productos (id y cantidad) del carrito actual

            if (!res.ok) throw new Error('Error al enviar la compra');

            const data = await res.json();
            // console.log('Compra registrada:', data);

            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
                setCart([]);
                localStorage.removeItem(`cart_${mesaId}`);
            }, 2000); // mismo valor que `duration`

        } catch (error) {
            console.error(error);
            alert('Error al realizar la compra');
        }
    };

    // logica para expandir la img del producto a la izq
    const imageUrl = productoSeleccionado?.img
        ? `${backendURL}/uploads/${productoSeleccionado.img}`
        : '/img/imagen-no-encontrada.jpg';

    /* constantes para el carro de compras */
    const totalPlatos = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrecio = cart.reduce((total, item) => total + item.quantity * item.precio, 0);

    // logica para cambiar color del stroke de los prodcutos segun el product.tipo
    const getStrokeColor = (tipo) => {
        switch (tipo) {
            case 'rolls':
                return '#B4434A'; // rojo 
            case 'nigiri':
                return '#AD1457'; //  vino
            case 'ramen':
                return '#2B5FAD'; // azul 
            case 'donburi':
                return '#6A4C93'; // púrpura oscuro
            case 'tempura':
                return '#B04A1D'; // terracota oscuro
            case 'bebidas':
                return '#237A57'; // verde apagado
            default:
                return '#333333'; // gris oscuro por defecto
        }
    };

    return (
        <div className="PageWrap">
            {!isMobile && (
                <aside className="DetalleProducto">
                    <img className='PageImg' src="/img/sushi-table.jpg" alt="Mesas del restaurante" />

                    {/* aquí me ayudo con AnimatePresence para q tenga una salida con transición, junto con motion.div (tanto para pc como para responsive, ya q por dentro del component hay otro motion.div) */}
                    <AnimatePresence>
                        {productoSeleccionado && (
                            <DetalleproductoSeleccionadoModal
                                productoSeleccionado={productoSeleccionado}
                                onClose={clearSelectedProduct}
                                addToCart={addToCart}
                                getStrokeColor={getStrokeColor}
                                imageUrl={imageUrl}
                            />
                        )}
                    </AnimatePresence>
                </aside>
            )}
            <AnimatePresence>
                {productoSeleccionado && isMobile && (
                    <motion.div
                        className="ModalOverlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <DetalleproductoSeleccionadoModal
                            productoSeleccionado={productoSeleccionado}
                            onClose={clearSelectedProduct}
                            addToCart={addToCart}
                            getStrokeColor={getStrokeColor}
                            imageUrl={imageUrl}
                        />
                    </motion.div>
                )}
            </AnimatePresence>


            <main className="Menu">
                <MesaHeader mesa={mesa} setModalAbierto={setModalAbierto} setModalHistorialAbierto={setModalHistorialAbierto} />
                <LogoutConfirmModal isOpen={modalAbierto}
                    onCancel={() => setModalAbierto(false)} onConfirm={logout} />
                <HistorialModal isOpen={modalHistorialAbierto} onClose={() => setModalHistorialAbierto(false)} />


                <MenuFilters filters={filters} setFilters={setFilters} />


                <div className="Order">
                    <GaleriaMenu getStrokeColor={getStrokeColor} setProductoSeleccionado={setProductoSeleccionado} backendURL={backendURL} products={filterProductos} addToCart={addToCart} removeProductCompletely={removeProductCompletely} removeOneFromCart={removeOneFromCart} />
                </div>

                {cart.length > 0 && (
                    <CartBar openCart={openCart} totalPrecio={totalPrecio} totalPlatos={totalPlatos} />
                )}
                {showToastCarrito && (
                    <ToastCarrito
                        message={toastCarrito}
                        visible={showToastCarrito}
                        onClose={() => setShowToastCarrito(false)}
                    />
                )}
            </main>

            <CartAside cart={cart} addOneToCart={addOneToCart} removeOneFromCart={removeOneFromCart} removeProductCompletely={removeProductCompletely}
                pagarCompra={pagarCompra} showToast={showToast} setShowToast={setShowToast}

            />
        </div>
    )
}

export default Menu


/* PARA CUANDO USAR OPERADOR LOGICO FUERA O DENTRO DEL COMPONENTE
- Si el componente depende del estado del padre, condición fuera.
- Si el componente conoce su lógica de render, condición dentro. */


/** f[0]         // 's'   ← primera letra
f.slice(1)   // 'ushi' ← desde la posición 1 (segunda letra) hasta el final
entonces..
f[0].toUpperCase() + f.slice(1)
= 'S' + 'ushi'
= 'Sushi' */