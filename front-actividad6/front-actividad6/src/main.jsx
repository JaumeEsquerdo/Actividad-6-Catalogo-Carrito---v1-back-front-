import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router'
import router from '@/lib/routes/router'

import { UIProvider } from './context/UIContext'

/* css */
import '@/css/index.css'
import '@/css/header.css'
import '@/css/menu.css'
import '@/css/seleccionMesa.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <RouterProvider router={router} />
    </UIProvider>
  </StrictMode>,
)
