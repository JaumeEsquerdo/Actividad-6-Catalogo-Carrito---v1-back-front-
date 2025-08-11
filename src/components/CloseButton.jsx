import { motion } from 'framer-motion';
import { useUI } from '@/context/UIContext';

const lineVariants = {
    initial: (custom) => ({
        rotate: custom,
        scaleX: 1,
        x: 0,
    }),
    hover: (custom) => ({
        rotate: custom + (custom > 0 ? 5 : -5), // cada línea rota un poco más en sentido opuesto
        scaleX: 1.1,
        x: custom > 0 ? 1 : -1, // x indica un desplazamiento horizontal en px
        backgroundColor: '#fff'
    }),
};



const CloseButton = ({ target }) => {
    const { closeCart, clearSelectedProduct } = useUI();

    const handleClick = () => {
        switch (target) {
            case 'cart':
                closeCart();
                break;
            case 'product':
                clearSelectedProduct();
                break;
            default:
                console.warn(`CloseButton: target "${target}" no reconocido.`);
        }
    };

    return (
        <motion.button
            className="CloseAside"
            onClick={handleClick}
            whileHover="hover"
            initial="initial"
        >
            <motion.span
                className="line"
                variants={lineVariants}
                custom={45}
                transition={{ duration: 0.3 }}
            />
            <motion.span
                className="line"
                variants={lineVariants}
                custom={-45}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
};

export default CloseButton;
