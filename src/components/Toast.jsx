import { useEffect } from "react";
import '@/css/toast.css'

export const Toast = ({ show, onClose, message = 'Compra realizada con éxito', duration = 8000 }) => {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose(); // se oculta despues de la duración
            }, duration);

            return () => clearTimeout(timer); //limpieza
        }
    }, [show, duration, onClose]);

    if (!show) {
        console.log('Toast visible');
        return null;
    }

    return (
        <div className="Toast-overlay">
            <div className="Toast-card">
                <header className="Toast-header">
                    <h3 className="Toast-confirm">{message}</h3>
                    <span className="material-symbols-outlined Toast-icon">
                        check_circle
                    </span>
                </header>
                <p className="Toast-text">Tu pedido se ha registrado correctamente.</p>
            </div>
        </div>);
}

