
export const MesaHeader = ({ mesa, setModalAbierto, setModalHistorialAbierto }) => {


    return (<>

        <header className="Menu-header">
            <h1 className="Menu-h1">SUSHIRO</h1>
            <div className="Header-icons">
                <div className="Tooltip">
                    <span
                        onClick={() => setModalHistorialAbierto(true)}
                        className="material-symbols-outlined Header-icon">
                        list_alt
                    </span>
                    <span className="Tooltip-text">Ver historial</span>
                </div>

                <div className="Tooltip">
                    <span
                        onClick={() => setModalAbierto(true)}
                        className="material-symbols-outlined Header-icon"
                    >
                        exit_to_app
                    </span>
                    <span className="Tooltip-text">Cerrar sesión</span>

                </div>
            </div>
        </header>

        <h2 className='Menu-h2'>
            {mesa && mesa.numero
                ? `Mesa ${mesa.numero} haciendo su pedido`
                : 'Esperando cliente...'}
        </h2>
    </>
    );
}
