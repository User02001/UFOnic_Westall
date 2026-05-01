import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'virtual:stylex.css'
import './global.css'
import App from './App.jsx'
import { setTitle } from './utils/pageTitles.js'

window.setTitle = setTitle

const mountClass =
  `uf-${Math.random().toString(36).slice(2, 12)}-${Date.now().toString(36)}`

const mountPoint = document.createElement('div')

mountPoint.className = mountClass

document.body.appendChild(mountPoint)

createRoot(mountPoint).render(
  <StrictMode>
    <App />
  </StrictMode>
)