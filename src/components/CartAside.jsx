import { Toast } from "./Toast";
import CloseButton from "./CloseButton";
import { useUI } from "@/context/UIContext";
import { useEffect, useRef } from "react";

export const CartAside = ({ cart,
    removeOneFromCart,
    removeProductCompletely,
    pagarCompra,
    showToast,
    setShowToast,
    addOneToCart
}) => {

    const asideRef = useRef(null);
    const { closeCart, isCartOpen } = useUI();

    useEffect(() => {
        //primero se declara la funcion
        const handleClickOutside = (event) => {
            if (
                asideRef.current &&
                !asideRef.current.contains(event.target) // si el aside esta activo y el click no ha sido dentro del aside...
            ) {
                closeCart();
            }
        };

        // y en el caso de que se tenga que utilizar, es decir si el codigo llega aqui, se ejecuta lo de arriba
        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside); //solo añade el evento click al documento si el carrito está abierto (esto mentalmente parece q debe estar antes q la funcion pero no puede porq si no no ejecuta nada la funcion, no sabe q existe)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, closeCart]);

    return (

        <aside ref={asideRef} className={`CartAside ${isCartOpen ? 'open' : ''}`}>
            <div className='CardAside-header'>
                <h3 className="Order-h3">Tu pedido</h3>
                <CloseButton target="cart" />
            </div>
            {cart.length === 0 ? (
                <p className="Cart-p">No hay productos en el carrito</p>
            ) : (
                <>
                    <ul className="Order-ul">
                        {cart.map((item) => (
                            <li key={item._id} className='Order-li'>
                                <div className="Order-line">
                                    <p className="Order-name">{item.name}</p>
                                    <p className="Order-calc">{item.quantity} x {item.precio}€ = <span className="Order-totalCalc">{item.quantity * item.precio}€</span></p>
                                </div>
                                <div className="Order-actions">
                                    <button className='Order-btn' onClick={() => removeOneFromCart(item._id)}>
                                        <span className="material-symbols-outlined IconCartAction">remove</span>

                                    </button>
                                    <button className='Order-btn' onClick={() => addOneToCart(item._id)}>
                                        <span className="material-symbols-outlined IconCartAction">add</span>

                                    </button>
                                    <button className='Order-btn' onClick={() => removeProductCompletely(item._id)}>
                                        <span className="material-symbols-outlined IconCartAction">delete</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='Cart-footer'>
                        <h3 className="Cart-h3">Total: {cart.reduce((total, item) => total + item.quantity * item.precio, 0)}€</h3>
                        <button className='Button-confirm' onClick={pagarCompra}>Pagar compra</button>
                    </div>

                    <Toast show={showToast} onClose={() => setShowToast(false)} />
                </>
            )}
        </aside>
    );
}

