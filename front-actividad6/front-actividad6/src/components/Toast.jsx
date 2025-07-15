import { useEffect } from "react";

export const Toast = ({ show, onClose, message = 'Compra realizada con éxito', duration = 3000 }) => {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose(); // se oculta despues de la duración
            }, duration);

            return () => clearTimeout(timer); // Limpieza
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    return (
        <div className="Toast-overlay">
            <div className="Toast-card">
                <h3>✅ {message}</h3>
                <p>Tu pedido se ha registrado correctamente.</p>
            </div>
        </div>);
}

