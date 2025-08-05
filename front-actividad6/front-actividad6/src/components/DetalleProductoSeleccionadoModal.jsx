import CloseButton from "./CloseButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export const DetalleproductoSeleccionadoModal = ({ imageUrl, productoSeleccionado, onClose, addToCart, getStrokeColor }) => {
    if (!productoSeleccionado) return null;

    const [cantidad, setCantidad] = useState(1);

    const aumentar = () => setCantidad(cant => cant + 1);
    const reducir = () => setCantidad(cant => Math.max(1, cant - 1));

    const handleAñadir = () => {
        addToCart(productoSeleccionado, cantidad);
        onClose(); // para cerrarlo despues de añadir
    };

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

            <div className="CantidadSelector">
                <button
                    className="CantidadBoton"
                    onClick={reducir}
                    disabled={cantidad === 1}
                /* desactivado si es 1 */
                >
                    ➖
                </button>
                <span className="CantidadNumero">{cantidad}</span>
                <button className="CantidadBoton" onClick={aumentar}>➕</button>
            </div>

            <button className="DetalleProducto-boton" onClick={handleAñadir}>
                Añadir {cantidad > 1 ? `${cantidad} uds.` : ""}
            </button>
        </div>
    );
};

