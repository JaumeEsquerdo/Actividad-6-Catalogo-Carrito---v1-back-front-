import {createBrowserRouter} from 'react-router'

// importe de páginas
import Menu from '@/pages/Menu'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'


// importe de páginas especiales
import Layout from '@/Layout'
import ErrorPage from '@/Errorpage'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        index: true,// página principal sin Layout, para q no comparta header y footer
    }
    ,
    {
        element: <Layout/>,
        children:
        [
            {
                path: '/menu',
                element: <Menu/>,
            },
            {
                path: '/register',
                element: <Register/>,
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '*',
                element:<ErrorPage/>
            }
        ]
    }
])
export default router