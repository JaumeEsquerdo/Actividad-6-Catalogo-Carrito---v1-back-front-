export const MesaHeader = ({mesa}) => {
    return (<>

        <h1 className="Menu-h1">SUSHIRO</h1>
        <h2 className='Menu-h2'>
            {mesa && mesa.numero
                ? `Mesa ${mesa.numero} haciendo su pedido`
                : 'Esperando cliente...'}
        </h2>
    </>
    );
}
