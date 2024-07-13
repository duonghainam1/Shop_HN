
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "./globals.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryclent = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryclent}>
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </QueryClientProvider>


)
