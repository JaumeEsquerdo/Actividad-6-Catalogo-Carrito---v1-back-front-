import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);


    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    // const openProductDetails = () => setIsProductDetailsOpen(true);
    // const closeProductDetails = () => setIsProductDetailsOpen(false);
    // const toggleProductDetails = () => setIsProductDetailsOpen(prev => !prev);


    const selectProduct = (product) => setProductoSeleccionado(product);
    const clearSelectedProduct = () => setProductoSeleccionado(null);
    return (
        <UIContext.Provider
            value={{
                isCartOpen,
                openCart,
                closeCart,
                toggleCart,
                selectProduct,
                clearSelectedProduct,
                productoSeleccionado,
                setProductoSeleccionado

            }}
        >
            {children}
        </UIContext.Provider>
    );
}

