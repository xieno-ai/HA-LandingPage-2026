import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initTracking, initScrollDepthTracking, initEngagedTimeTracking } from './utils/tracking'
import App from './App'

initTracking()
initScrollDepthTracking()
initEngagedTimeTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
