import CloseButton from "./CloseButton";
import { useState } from "react";
import { motion } from "framer-motion";


export const DetalleproductoSeleccionadoModal = ({ imageUrl, productoSeleccionado, onClose, addToCart, getStrokeColor }) => {

    const [cantidad, setCantidad] = useState(1);

    const aumentar = () => setCantidad(cant => cant + 1);
    const reducir = () => setCantidad(cant => Math.max(1, cant - 1));

    const handleAñadir = () => {
        addToCart(productoSeleccionado, cantidad);
        onClose(); // para cerrarlo despues de añadir
    };

    return (
        <motion.div
            className="ModalProducto"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <CloseButton target="product" onClick={onClose} />

            <img
                src={imageUrl}
                alt={productoSeleccionado.name}
                style={{ border: `12px solid ${getStrokeColor(productoSeleccionado.tipo)}` }}
                className="DetalleProducto-img"
            />

            <div className="DetalleProducto-detalles">
                <h2 className="DetalleProducto-nombre">{productoSeleccionado.name}</h2>
                <p className="DetalleProducto-precio">{productoSeleccionado.precio}€</p>
                <p className="DetalleProducto-descripcion">{productoSeleccionado.descripcion || 'Sin descripción'}</p>
            </div>

            <div className="CantidadSelector">
                <button
                    className="CantidadBoton"
                    onClick={reducir}
                    disabled={cantidad === 1}
                /* desactivado si es 1 */
                >
                    <span className="material-symbols-outlined IconCartAction">remove</span>

                </button>
                <span className="CantidadNumero">{cantidad}</span>
                <button className="CantidadBoton" onClick={aumentar}>
                    <span className="material-symbols-outlined IconCartAction">add</span>
                </button>
            </div>

            <button className="DetalleProducto-boton" onClick={handleAñadir}>
                Añadir {cantidad > 1 ? `${cantidad} uds.` : ""}
            </button>
        </motion.div>

    );
};

