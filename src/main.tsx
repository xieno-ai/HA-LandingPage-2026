import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initTracking, initScrollDepthTracking, initEngagedTimeTracking } from './utils/tracking'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Defer tracking initialization until after first paint
const scheduleIdle = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1))
scheduleIdle(() => {
  initTracking()
  initScrollDepthTracking()
  initEngagedTimeTracking()
}, { timeout: 2000 })
