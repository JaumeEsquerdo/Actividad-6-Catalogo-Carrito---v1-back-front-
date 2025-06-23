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
        localStorage.setItem('mesaId', idMesa)
        navigate('/menu')
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Selecciona tu mesa</h2>
            <ul className="grid gap-3">
                {mesas.map((mesa) => (
                    <li key={mesa._id}>
                        <button
                            onClick={() => handleSeleccion(mesa._id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
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
