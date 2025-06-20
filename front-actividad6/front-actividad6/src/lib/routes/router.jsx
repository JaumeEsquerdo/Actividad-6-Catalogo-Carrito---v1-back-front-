import { createBrowserRouter } from 'react-router'

// importe de páginas
import Menu from '@/pages/Menu'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'


// importe de páginas especiales
import Layout from '@/Layout'
import ErrorPage from '@/pages/Errorpage'
import FormEditImg from '@/pages/FormEditImg'
import FormImage from '@/pages/FormImage'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Menu />,
        index: true,// página principal sin Layout, para q no comparta header y footer
    }
    ,
    {
        element: <Layout />,
        children:
            [
                {
                    path: '/register',
                    element: <Register />,
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/formEditingImg',
                    element: <FormEditImg />,
                }
                ,
                {
                    path: '/formImage',
                    element: <FormImage />,
                }
            ]
    }
    ,
    {
        path: '*',
        element: <ErrorPage />
    }
])
export default router