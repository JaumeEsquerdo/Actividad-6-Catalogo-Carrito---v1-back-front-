export const GaleriaMenu = ({ getStrokeColor, products, addToCart, backendURL, setProductoSeleccionado }) => {
    const tipoOrden = ['rolls', 'ramen', 'donburi', 'tempura', 'nigiri', 'bebidas'];
    const items = [];
    const formatTipoNombre = (tipo) => {
        const map = {
            rolls: 'Sushi Rolls',
            nigiri: 'Nigiri',
            ramen: 'Ramen',
            donburi: 'Donburi',
            tempura: 'Tempura',
            bebidas: 'Bebidas'
        };
        return map[tipo] || tipo;
    };

    tipoOrden.forEach((tipo) => {
        const productosDeTipo = products.filter((p) => p.tipo === tipo);
        if (productosDeTipo.length === 0) return;

        // card del tipo como separador (se ejecuta la funcion del tipo q le añade su color correspondiente)
        items.push(
            <div key={`title-${tipo}`} className="Card Card-tipo">
                <h3 className='Card-h3' style={{ color: getStrokeColor(tipo) }}>{formatTipoNombre(tipo)}</h3>
            </div>
        );

        // Agrega cada producto de ese tipo
        productosDeTipo.forEach((product) => {
            const imageUrl = `${backendURL}/uploads/${product.img}`;
            const strokeColor = getStrokeColor(product.tipo);


            items.push(
                <div key={product._id} className="Card">
                    <div className="Card-imageWrapper" onClick={() => setProductoSeleccionado(product)}>
                        <div className='Card-media'>
                            <img
                                className="Card-img"
                                src={imageUrl || '/img/imagen-no-encontrada.jpg'}
                                alt={product.name}
                            />
                            <svg
                                className="Card-imageStroke"
                                width="140"
                                height="140"
                                viewBox="0 0 140 140"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M70 5 C95 5 130 20 130 70 C130 115 95 135 70 135 C45 135 10 115 10 70 C10 25 45 5 70 5 Z"
                                    stroke={strokeColor}
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </div>
                        <p className="Card-name">{product.name}</p>
                    </div>
                    <p className="Card-price">{product.precio}€</p>
                    <button className='Card-btn' onClick={() => addToCart(product)}>Añadir</button>
                </div>
            );
        });
    });

    return <div className="GaleriaMenu">{items}</div>;
};