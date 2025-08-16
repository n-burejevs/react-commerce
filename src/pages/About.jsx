import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'

export default function About(){

    const { cartCount } = useContext(CartContext);

    const { wishListCount, setWishListCount} = useContext(WishlistContext);
    
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
                <div className="about-page">
                    <h1>
                      This page is about About
                    </h1>
                </div>
               { /*elements for about page go here*/ }

              
        </div>
    </div>
    );
};