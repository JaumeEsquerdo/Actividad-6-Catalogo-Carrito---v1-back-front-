import { useEffect, useRef, useState } from 'react';
import '@/css/historialModal.css'

export const HistorialModal = ({ isOpen, onClose }) => {

    const modalRef = useRef(null);
    const [compras, setCompras] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_COMPRAS = import.meta.env.VITE_COMPRAS
    const API_SESION = import.meta.env.VITE_SESION

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) { /* modal.current asegura q el modal esté montado, y la otra parte es la confirmación de q el click lo han hecho fuera del modal q tiene la ref */
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);  // solo si esta abierto el modal(modal y overlay) actua el handleClickOutside
            fetchHistorial();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const fetchHistorial = async () => {
        try {
            const sesionId = localStorage.getItem('sesionId');
            const res = await fetch(`${API_URL}${API_ROUTER}${API_COMPRAS}${API_SESION}/${sesionId}`);
            const data = await res.json();
            if (data.status === 'ok') setCompras(data.data);
        } catch (err) {
            console.error('Error al obtener historial:', err);
        }
    };

    if (!isOpen) return null;

    return (

        <div className="Historial-overlay">
            <div className="Historial-modal" ref={modalRef}>
                <h2 className='Historial-h2'>Historial de esta sesión</h2>
                {compras.length === 0 ? (
                    <p className='Historial-p'>No hay compras registradas aún.</p>
                ) : (
                    <ul className="Historial-list">
                        <p className="Historial-subtitulo">De más reciente a más antiguo</p>
                        {compras.map((compra) => (
                            <li key={compra._id} className="Historial-compra">
                                <p className="Historial-fecha">
                                    {new Date(compra.fecha).toLocaleString()}
                                </p>
                                {(() => {
                                    const totalCompra = compra.productos.reduce((total, item) => {
                                        return total + item.cantidad * (item.producto?.precio || 0);
                                    }, 0);

                                    return (
                                        <>
                                            <ul>
                                                {compra.productos.map((item, i) => (
                                                    <li key={i} className="Historial-producto">
                                                        <strong>{item.producto?.name}</strong> – {item.cantidad} x {item.producto?.precio}€ ={' '}
                                                        <span className="Historial-total">
                                                            {(item.cantidad * item.producto?.precio).toFixed(2)}€
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="Historial-totalCompra">
                                                Total: <strong>{totalCompra.toFixed(2)}€</strong>
                                            </p>
                                        </>
                                    );
                                })()}
                            </li>
                        ))}
                    </ul>
                )}
                <button className="Historial-cerrar" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};



/* {(() => {
                                    const totalCompra = compra.productos.reduce((total, item) => {
                                        return total + item.cantidad * (item.producto?.precio || 0);
                                    }, 0);

                                    return (
                                        <>
                                            <ul>
                                                {compra.productos.map((item, i) => (
                                                    <li key={i} className="Historial-producto">
                                                        <strong>{item.producto?.name}</strong> – {item.cantidad} x {item.producto?.precio}€ ={' '}
                                                        <span className="Historial-total">
                                                            {(item.cantidad * item.producto?.precio).toFixed(2)}€
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="Historial-totalCompra">
                                                Total: <strong>{totalCompra.toFixed(2)}€</strong>
                                            </p>
                                        </>
                                    );
                                })()} */

/* Esto es un IIFE q es una función q se ejecuta al instante gracias al () final q tiene */
/* totalCompra.toFixed(2) -> hace q tenga dos decimales */

/* reduce: array.reduce((acumulador, elementoActual) => {
    return acumulador + loQueQuierasSumar;
}, valorInicial);
 */

/* {' '} para q haya un espacio seguro */