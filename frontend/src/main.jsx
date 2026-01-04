import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { UploadProvider } from './context/UploadContext'
import { VCContextProvider } from './context/VCContext'

import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <VCContextProvider>
        <UploadProvider>
          <App />
        </UploadProvider>
      </VCContextProvider>
    </ThemeProvider>
  </AuthProvider>
)
