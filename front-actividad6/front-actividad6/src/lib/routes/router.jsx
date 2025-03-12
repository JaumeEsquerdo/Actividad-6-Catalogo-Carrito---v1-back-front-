import {createBrowserRouter} from 'react-router'

// importe de páginas
import Menu from '@/pages/Menu'
import Home from '@/pages/Home'


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
            // {
            //     path: 'secciones/:id',
            //     element: <SeccionDinamica/>
            // },
            {
                path: '*',
                element:<ErrorPage/>
            }
        ]
    }
])
export default router