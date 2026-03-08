import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from  "react-hot-toast"
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter> {/*//wrapping our entire app under this bc without this no links etc.. would work*/}
  </StrictMode>,//react knows which page to show and when using browser routeronly 
)
