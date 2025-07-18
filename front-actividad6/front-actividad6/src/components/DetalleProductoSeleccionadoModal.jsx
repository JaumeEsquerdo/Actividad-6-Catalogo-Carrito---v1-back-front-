import CloseButton from "./CloseButton";

export const DetalleproductoSeleccionadoModal = ({ imageUrl, productoSeleccionado, onClose, addToCart, getStrokeColor }) => {
    if (!productoSeleccionado) return null;

    return (
        <div className="ModalProducto">
            <CloseButton target="product" onClick={onClose} />

            <img
                src={imageUrl}
                alt={productoSeleccionado.name}
                style={{ border: `12px solid ${getStrokeColor(productoSeleccionado.tipo)}` }}
                className="DetalleProducto-img"
            />

            <div className="DetalleProducto-detalles">
                <h2 className="DetalleProducto-nombre">{productoSeleccionado.name}</h2>
                <p className="DetallePoducto-descripcion">{productoSeleccionado.descripcion || 'Sin descripción'}</p>
                <p className="DetalleProducto-precio">{productoSeleccionado.precio}€</p>
            </div>

            <button className='DetalleProducto-boton' onClick={() => addToCart(productoSeleccionado)}>Añadir</button>
        </div>
    );
};

