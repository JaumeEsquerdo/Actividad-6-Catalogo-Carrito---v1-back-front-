import { useState } from 'react';
import { useNavigate } from 'react-router-dom'




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_AUTH_LOGIN = import.meta.env.VITE_AUTH_LOGIN

    const handleLogin = async (e) => {
        e.preventDefault()


        try {
            const res = await fetch(`${API_URL}${API_ROUTER}${API_AUTH_LOGIN}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) throw new Error('Credenciales inválidas fetch')

            const data = await res.json()

            console.log(data)

            if (data.token) {
                localStorage.setItem('token', data.token)
                navigate("/")
            } else {
                throw new Error("No llega el token")
            }

        } catch (e) {
            console.error('error en el fetch de login', e)
        }
    }




    return (<div>
        <h2>
            Login
        </h2>

        <form onSubmit={handleLogin}>

            <input type="email" placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder='Contraseña'
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit'>Login</button>
        </form>

    </div>);
}

export default Login;