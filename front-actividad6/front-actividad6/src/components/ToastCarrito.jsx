import { useEffect } from "react"
import '@/css/toastCarrito.css'

export const ToastCarrito = ({ message, visible, onClose }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose()
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [visible, onClose])

    if (!visible) return null

    return (
        <div className="ToastCarrito">
            {message}
        </div>
    )
}

