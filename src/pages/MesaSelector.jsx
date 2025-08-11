// src/pages/MesaSelector.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const MesaSelector = () => {
    const [mesas, setMesas] = useState([])
    const navigate = useNavigate()

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_MESAS = import.meta.env.VITE_MESAS

    /* OPCIONAL: INTRODUCIR UN LOCALSTORAGE PARA Q SE VEA UNA VEZ LA ANIMACION DE ENTRADA EN EL SELECCTOR DE MESA... y poner un operador ternario en la animacion de motion.div preguntando si lo tiene puesto */
    // const [hasAnimated, setHasAnimated] = useState(false); // para hacer la animacion una vez solo

    // /* para saber si ya has visto la animación */
    // useEffect(() => {
    //     const animState = localStorage.getItem('mesaSelectorAnimated');

    //     if (!animState) { // si no tiene el animState en localStorage se lo pone la primera vez y actualiza el estado
    //         setHasAnimated(true);
    //         localStorage.setItem('mesaSelectorAnimated', 'true');
    //     }
    // }, []);


    /* fetch de las mesas dispo */
    useEffect(() => {
        const fetchMesas = async () => {
            try {
                const response = await fetch(`${API_URL}${API_ROUTER}${API_MESAS}`)
                const responseAPI = await response.json()

                console.log('Mesas desde API:', responseAPI.data)

                const mesasLibres = responseAPI.data.filter(mesa => mesa.estado === 'libre')
                setMesas(mesasLibres)
            } catch (error) {
                console.error('Error al cargar mesas:', error)
            }
        }

        fetchMesas()
    }, [])

    const handleSeleccion = (idMesa) => {
        const sesionId = crypto.randomUUID(); // generar ID de sesión único

        localStorage.setItem('mesaId', idMesa);
        localStorage.setItem('sesionId', sesionId);

        navigate('/menu')
    }

    return (

        <main className='SeleccionMesa-wrapper'>

            <video
                autoPlay
                muted
                loop
                playsInline
                className="VideoBackground"
            >
                <source src="/bg-sushi.mp4" type="video/mp4" />
            </video>

            {/* Overlay oscuro */}
            <div className="VideoOverlay"></div>

            <h1 className="Menu-h1 Header-title">SUSHIRO</h1>

            <motion.div className="SeleccionMesa"
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 4.8, ease: 'easeOut' }}>

                <h2 className="SeleccionMesa-h2">Elige lo que quieras, sin soltar los palillos</h2>
                <ul className="SeleccionMesa-ul">
                    {mesas.map((mesa) => (
                        <li className="SeleccionMesa-li" key={mesa._id}>
                            <button
                                onClick={() => handleSeleccion(mesa._id)}
                                className="SeleccionMesa-btn"
                            >
                                Mesa {mesa.numero}
                            </button>
                        </li>
                    ))}
                </ul>
            </motion.div>

        </main>

    )
}

export default MesaSelector
