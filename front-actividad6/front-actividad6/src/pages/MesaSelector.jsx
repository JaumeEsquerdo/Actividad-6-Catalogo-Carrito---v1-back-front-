// src/pages/MesaSelector.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/css/seleccionMesa.css'

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
        localStorage.setItem('mesaId', idMesa)
        navigate('/menu')
    }

    return (
        <div className="SeleccionMesa">
            <h2 className="SeleccionMesa-h2">Selecciona tu mesa</h2>
            <ul className="SeleccionMesa-ul">
                {mesas.map((mesa) => (
                    <li key={mesa._id}>
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
    )
}

export default MesaSelector
