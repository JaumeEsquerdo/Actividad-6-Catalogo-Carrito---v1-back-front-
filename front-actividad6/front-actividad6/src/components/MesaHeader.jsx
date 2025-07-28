export const MesaHeader = ({ mesa, logout }) => {
    return (<>

        <header className="Menu-header">
            <h1 className="Menu-h1">SUSHIRO</h1>
            <div className="Header-icons">
                <span className="material-symbols-outlined Header-icon">
                    list_alt
                </span>

                <span onClick={logout} className="material-symbols-outlined Header-icon">
                    exit_to_app
                </span>
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
