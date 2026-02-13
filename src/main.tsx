import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initTracking } from './utils/tracking'
import App from './App'

initTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
