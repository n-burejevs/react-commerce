import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'

export default function Contact(){

  const { cartItems, cartCount, setcartCount } = useContext(CartContext);

  const {wishlistItems,  wishListCount, setWishListCount, CountWishedItems} = useContext(WishlistContext);

  const { user, setUser} = useContext(UserContext);
    
    return (
        <div>
          <Navbar user={user} setUser={setUser}
                      cartCount={cartCount}
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