import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './styles/global.css'
import './styles/stack.css'
import './styles/ui.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/focus.css'
import './styles/timeline.css'
import './styles/work.css'
import './styles/sections.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
