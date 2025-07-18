export const CartBar = ({totalPlatos, totalPrecio, openCart}) => {
    return (
        <div className="CartBar">
            <div className='CartBar-info'>
                🛒 {totalPlatos} {totalPlatos === 1 ? 'plato' : 'platos'} - {totalPrecio}€
            </div>
            <button className="CartBar-button" onClick={openCart}>
                Ver carrito
            </button>
        </div>
    );
}

