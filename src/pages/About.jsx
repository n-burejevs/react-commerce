import React from "react";
import Navbar from '../components/Navbar'
import { checkAuthToken } from '../functions';
import Sidemenu from "../components/Sidemenu";

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';

export default function About(){

    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, cartCount, CountItems, setcartCount } = useContext(CartContext);

     //wishlsit functionality, copy-pasted from Cart
     const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
             
     const CountWishedItems = () => {
         return wishlistItems.reduce((total, item) => total + item.quantity, 0);
     }; 
     const [wishListCount, setWishListCount]= React.useState(CountWishedItems)

    const [user, setUser] = React.useState({name: '', lastname: '', email: ''});
      
        React.useEffect(() => {
         
          const fetchUserInfo = async () => {
          
          const loggedUser = await checkAuthToken();
        //console.log(loggedUser);
         if(loggedUser) setUser(loggedUser ? {name: loggedUser.name, lastname: loggedUser.lastname, email: loggedUser.email} : null)
        }
        fetchUserInfo()
        .catch(console.error);
        
      
        }, []);

    return (
        <div>
            <Navbar user={user} setUser={setUser}
                 cartCount={cartCount}
            wishListCount={wishListCount} setWishListCount={setWishListCount} />
  
                           <div className='main-content-container'>
            
                <div className='sidemenu-filterpane-mobile'> 
                <Sidemenu/>  
                  
                </div>
                <div className="about-page">
          <h1>
                    This page is about About
            </h1>
                </div>
               {/* elements for contact page here here */}

              
                </div>
        </div>
    );
};