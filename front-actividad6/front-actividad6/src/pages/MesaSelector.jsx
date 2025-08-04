// src/pages/MesaSelector.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MesaSelector = () => {
    const [mesas, setMesas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMesas = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/mesas')
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
            <div className="SeleccionMesa">
                <p></p>
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

            </div>
        </main>

    )
}

export default MesaSelector
