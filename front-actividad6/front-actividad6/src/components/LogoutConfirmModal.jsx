export const LogoutConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null; //  si no está abierto que no siga

    const handleOverlayClick = () => {
        onCancel(); // cierra el modal si clican fuera
    };

    const handleContentClick = (e) => {
        e.stopPropagation(); // evita que el clic se propague al overlay (al recuadro del contenido)
    };

    return (
        <div className="ModalOverlay" onClick={handleOverlayClick}>
            <div className="ModalContent" onClick={handleContentClick}>
                <h2>¿Estás seguro de que quieres cerrar sesión?</h2>
                <div className="ModalButtons">
                    <button onClick={onCancel}>Cancelar</button>
                    <button onClick={onConfirm}>Cerrar sesión</button>
                </div>
            </div>
        </div>

    );
}
