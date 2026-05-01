import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'virtual:stylex.css'
import './global.css'
import App from './App.jsx'
import { setTitle } from './utils/pageTitles.js'

window.setTitle = setTitle

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)