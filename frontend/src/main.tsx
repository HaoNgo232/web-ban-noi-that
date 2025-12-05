import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Debug: Kiểm tra biến môi trường
console.log('🔧 Environment Variables Debug:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_APP_NAME:', import.meta.env.VITE_APP_NAME);
console.log('MODE:', import.meta.env.MODE);
console.log('All env:', import.meta.env);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
