import { Toast } from "./Toast";
import CloseButton from "./CloseButton";

export const CartAside = ({ cart,
    removeOneFromCart,
    removeProductCompletely,
    pagarCompra,
    showToast,
    setShowToast,
    isCartOpen
}) => {
    return (

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

                    <Toast show={showToast} onClose={() => setShowToast(false)} />
                </>
            )}
        </aside>
    );
}

