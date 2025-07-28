export const MesaHeader = ({ mesa }) => {
    return (<>

        <header className="Menu-header">
            <h1 className="Menu-h1">SUSHIRO</h1>
            <div className="Header-icons">
                iconos de salir / cambiar mesa y de ver pedidos realizados
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
