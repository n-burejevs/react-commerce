import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";
import { checkAuthToken } from '../functions';

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';

export default function Contact(){

  const { cartItems, /*addToCart, removeFromCart, clearCart, getCartTotal,*/ cartCount, /*CountItems,*/ setcartCount } = useContext(CartContext);

    const [user, setUser] = React.useState({name: '', lastname: '', email: ''});
    
         //wishlsit functionality, copy-pasted from Cart
         const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
                 
         const CountWishedItems = () => {
             return wishlistItems.reduce((total, item) => total + item.quantity, 0);
         }; 
         const [wishListCount, setWishListCount]= React.useState(CountWishedItems)
  
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
          <Navbar user={user} setUser={setUser} cartItems={cartItems} /*setCartItems={setCartItems}*/
                      cartCount={cartCount} setcartCount={setcartCount}
                      wishListCount={wishListCount} setWishListCount={setWishListCount} />
               <div className='main-content-container'>
            
                <div className='sidemenu-filterpane-mobile'> 
                <Sidemenu/>  
                  
                </div>
                <div className="contact-page">
                   <h1>
                    Contacts:
                   </h1>
                </div>
               {/* elements for contact page here here */}

              
                </div>
        </div>
    );
}