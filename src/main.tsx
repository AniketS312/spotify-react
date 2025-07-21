import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import App from './App.tsx'
import Dashboard from './Dashboard/Dashboard.tsx';

const root = document.getElementById("root");
if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <BrowserRouter basename="/spotify-react">
    <StrictMode>
       <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
