import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    const API_ROUTER = import.meta.env.VITE_API_ROUTER;
    const API_AUTH_REGISTER = import.meta.env.VITE_AUTH_REGISTER;

    const handleRegister = async (e) => {
        e.preventDefault();

        //validar doble contraseña
        if (password !== confirmPassword) {
            console.error("Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await fetch(`${API_URL}${API_ROUTER}${API_AUTH_REGISTER}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            if (!res.ok) throw new Error('error en el registro')

            navigate("/login") //redirigir al login

        } catch (e) {
            console.error('error en el fetch del handleRegister', e)
        }

    }


    return (
        <div>
            <h2>Registro</h2>

            <form onSubmit={handleRegister}>

                <input type="text" placeholder='Nombre'
                    value={name} onChange={(e) => setName(e.target.value)} required />

                <input type="email" placeholder='Email'
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder='Contraseña'
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder='Repite la contraseña'
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type='submit'>Registrarse</button>
            </form>
        </div>
    );
}

export default Register;