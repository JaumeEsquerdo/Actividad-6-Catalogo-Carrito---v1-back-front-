import { useState, useEffect } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import CloseButton from '@/components/CloseButton'
import { useUI } from '@/context/UIContext';

const Menu = () => {
    const navigate = useNavigate()
    const mesaId = localStorage.getItem('mesaId')

    const [mesa, setMesa] = useState(null)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState('todos')
    // const [productoSeleccionado, setProductoSeleccionado] = useState(null); // expandir producto a la izq
    // const [isCartOpen, setIsCartOpen] = useState(false);


    const backendURL = "http://localhost:3000"; // o la URL de producción
    const { openCart, isCartOpen, selectProduct,
        clearSelectedProduct, productoSeleccionado, setProductoSeleccionado } = useUI();


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
                .filter(Boolean); // Elimina los productos que se han quedado como null (por cantidad 0)
        });
    };

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
            <aside className="DetalleProducto">
                <img className='PageImg' src="/img/sushi-table.jpg" alt="Mesas del restaurante" />

                {productoSeleccionado && (
                    <div className="ModalProducto">
                        {/* <button
                            className="CerrarModal"
                            onClick={() => setProductoSeleccionado(null)}
                        >
                            ✕
                        </button> */}
                        <CloseButton target="product" onClick={clearSelectedProduct} />

                        <img src={imageUrl} alt={productoSeleccionado.name} style={{
                            border: `12px solid ${getStrokeColor(productoSeleccionado.tipo)}`
                        }} className="DetalleProducto-img" />

                        <div className="DetalleProducto-detalles">
                            <h2 className="DetalleProducto-nombre">{productoSeleccionado.name}</h2>
                            <p className="DetalleProducto-descripcion">{productoSeleccionado.descripcion || 'Sin descripción'}</p>
                            <p className="DetalleProducto-precio">{productoSeleccionado.precio}€</p>
                        </div>

                        <button className='DetalleProducto-boton' onClick={() => addToCart(productoSeleccionado)}>Añadir</button>
                    </div>
                )}
            </aside>

            <main className="Menu">
                <h1 className="Menu-h1">SUSHIRO</h1>
                <h2 className='Menu-h2'>
                    {mesa && mesa.numero
                        ? `Mesa ${mesa.numero} haciendo su pedido`
                        : 'Esperando cliente...'}
                </h2>
                <nav className="Menu-filters">
                    {['todos', 'rolls', 'nigiri', 'ramen', 'donburi', 'tempura', 'bebidas'].map((f) => (
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
                    <GaleriaMenu getStrokeColor={getStrokeColor} setProductoSeleccionado={setProductoSeleccionado} backendURL={backendURL} products={filterProductos} addToCart={addToCart} removeProductCompletely={removeProductCompletely} removeOneFromCart={removeOneFromCart} />
                </div>

                {cart.length > 0 && (
                    <div className="CartBar">
                        <div className='CartBar-info'>
                            🛒 {totalPlatos} {totalPlatos === 1 ? 'plato' : 'platos'} - {totalPrecio}€
                        </div>
                        <button className="CartBar-button" onClick={openCart}>
                            Ver carrito
                        </button>
                    </div>
                )}
            </main>
            <aside className={`CartAside ${isCartOpen ? 'open' : ''}`}>
                <div className='CardAside-header'>
                    <h3>Tu pedido</h3>
                    {/* <button onClick={() => setIsCartOpen(false)} className="CloseAside">✕</button> */}
                    <CloseButton target="cart" />
                </div>
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    <>
                        <ul className="Order-ul">
                            {cart.map((item) => (
                                <li key={item._id} className='Order-li'>
                                    <p className="Order-p">
                                        {item.name} : {item.quantity} x {item.precio}€ ={' '}
                                        {item.quantity * item.precio} €
                                    </p>
                                    <div className="Order-actions">
                                        <button className='Order-btn' onClick={() => removeOneFromCart(item._id)}>➖</button>
                                        <button className='Order-btn' onClick={() => removeProductCompletely(item._id)}>🗑️</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className='Cart-footer'>
                            <h3>Total: {cart.reduce((total, item) => total + item.quantity * item.precio, 0)}€</h3>
                            <button className='Cart-payment' onClick={pagarCompra}>Pagar compra</button>
                        </div>
                        <button className='Cart-table' onClick={logout}>Cambiar de mesa</button>
                    </>
                )}
            </aside>
        </div>
    )
}

export default Menu


export const GaleriaMenu = ({ getStrokeColor, products, addToCart, backendURL, setProductoSeleccionado }) => {
    const tipoOrden = ['rolls', 'ramen', 'donburi', 'tempura', 'nigiri', 'bebidas'];
    const items = [];
    const formatTipoNombre = (tipo) => {
        const map = {
            rolls: 'Sushi Rolls',
            nigiri: 'Nigiri',
            ramen: 'Ramen',
            donburi: 'Donburi',
            tempura: 'Tempura',
            bebidas: 'Bebidas'
        };
        return map[tipo] || tipo;
    };

    tipoOrden.forEach((tipo) => {
        const productosDeTipo = products.filter((p) => p.tipo === tipo);
        if (productosDeTipo.length === 0) return;

        // card del tipo como separador (se ejecuta la funcion del tipo q le añade su color correspondiente)
        items.push(
            <div key={`title-${tipo}`} className="Card Card-tipo">
                <h3 className='Card-h3' style={{ color: getStrokeColor(tipo) }}>{formatTipoNombre(tipo)}</h3>
            </div>
        );

        // Agrega cada producto de ese tipo
        productosDeTipo.forEach((product) => {
            const imageUrl = `${backendURL}/uploads/${product.img}`;
            const strokeColor = getStrokeColor(product.tipo);


            items.push(
                <div key={product._id} className="Card">
                    <div className="Card-imageWrapper" onClick={() => setProductoSeleccionado(product)}>
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
                                d="M70 5 C95 5 130 20 130 70 C130 115 95 135 70 135 C45 135 10 115 10 70 C10 25 45 5 70 5 Z"
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
                    <button className='Card-btn' onClick={() => addToCart(product)}>Añadir</button>
                </div>
            );
        });
    });

    return <div className="GaleriaMenu">{items}</div>;
};




/** f[0]         // 's'   ← primera letra
f.slice(1)   // 'ushi' ← desde la posición 1 (segunda letra) hasta el final
entonces..
f[0].toUpperCase() + f.slice(1)
= 'S' + 'ushi'
= 'Sushi' */