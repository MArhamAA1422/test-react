import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import Login from './auth/Login.tsx'
import { getData } from './utils/shared.ts'
import PageNotFound from './components/PageNotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getData("currUser") ? <App /> : <Login />} />
        <Route path="/login" element={getData("currUser") ? <App /> : <Login />} />
        <Route path="/registration" element={getData("currUser") ? <App /> : <Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
