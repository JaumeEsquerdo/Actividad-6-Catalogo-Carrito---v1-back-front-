import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false)


    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    const openProductDetails = () => setIsProductDetailsOpen(true);
    const closeProductDetails = () => setIsProductDetailsOpen(false);
    const toggleProductDetails = () => setIsProductDetailsOpen(prev => !prev);
    return (
        <UIContext.Provider
            value={{
                isCartOpen,
                openCart,
                closeCart,
                toggleCart,
                isProductDetailsOpen,
                openProductDetails,
                closeProductDetails,
                toggleProductDetails,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

