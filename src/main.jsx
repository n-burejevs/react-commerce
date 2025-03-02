import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import About from "./pages/About.jsx";
import SignUp from "./pages/Signup";
import Contact from "./pages/Contacts";
import Cart from "./pages/Cart"

//import Home from "./pages/Home"

/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Routes>

   <Route path="/" element={<App />} />

     <Route path="about" element={<About/>} />
     <Route path="contact" element={<Contact/>} />
     <Route path="cart" element={<Cart/>} />
     <Route path="my-account" element={<SignUp/>} />
   </Routes>
  </BrowserRouter>,
)