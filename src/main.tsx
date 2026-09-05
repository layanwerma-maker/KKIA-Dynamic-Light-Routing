import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { SimulationProvider } from './state/SimulationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SimulationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SimulationProvider>
    </LanguageProvider>
  </StrictMode>,
)
