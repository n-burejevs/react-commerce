import React from "react";
import Navbar from '../components/Navbar'
import { checkAuthToken } from '../functions';
import Sidemenu from "../components/Sidemenu";

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';

export default function About(){

    const { cartCount } = useContext(CartContext);

    const { wishListCount, setWishListCount} = useContext(WishlistContext);
     
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