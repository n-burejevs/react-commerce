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
import SingleProduct from './pages/SingleProduct.jsx';
import Login from './pages/Login.jsx';
import ViewCategory from './pages/ViewCategory.jsx';
import Account from './pages/Account.jsx';
//import Slideshow from './components/Slideshow.jsx';  <Route path="test" element={<Slideshow/>} />

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
     <Route path="login" element={<Login/>} />
     <Route path="signup" element={<SignUp/>} />
     <Route path="account" element={<Account/>} />
     <Route path="viewproduct/:id" element={<SingleProduct/>} />
     <Route path="category/:name" element={<ViewCategory/>} />
     <Route path="*" element={<App to="/" replace />} />
   </Routes>
  </BrowserRouter>
  
)