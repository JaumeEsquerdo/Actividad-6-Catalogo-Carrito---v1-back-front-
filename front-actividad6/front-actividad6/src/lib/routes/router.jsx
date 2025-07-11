import { createBrowserRouter } from 'react-router'

// Páginas cliente
import MesaSelector from '@/pages/MesaSelector' // NUEVA página donde eligen la mesa
import Menu from '@/pages/Menu'

// Admin
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import FormEditImg from '@/pages/FormEditImg'
import FormImage from '@/pages/FormImage'

// Estructura y errores
import Layout from '@/Layout'
import ErrorPage from '@/pages/Errorpage'

const router = createBrowserRouter([
    // Cliente: selección de mesa y menú
    {
        path: '/',
        element: <MesaSelector />, // Pantalla para elegir mesa (cliente)
    },
    {
        path: '/menu',
        element: <Menu /> // Una vez elegida la mesa, va al menú
    },

    // Admin (protegido por login)
    {
        element: <Layout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            // {
            //     path: '/formEditingImg',
            //     element: <FormEditImg />
            // },
            {
                path: '/formImage',
                element: <FormImage />
            }
        ]
    },

    // Página 404
    {
        path: '*',
        element: <ErrorPage />
    }
])

export default router
