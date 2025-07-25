import React from "react";
import Navbar from '../components/Navbar'
import { checkAuthToken } from '../functions';
import Sidemenu from "../components/Sidemenu";

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';

export default function Account(){

  const { cartCount } = useContext(CartContext);

  const {wishListCount, setWishListCount} = useContext(WishlistContext);
   
     //wishlsit functionality, copy-pasted from Cart

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
                    This is account page
            </h1>
                </div>
               { (() => {
                if (user == null || user.name == "") {
                   console.log("not logged in");//return <>"not logged in"</>
                   //redirect to login page
                  // window.location.replace("/localhost:5173/login");
                }
                else {
                   console.log("logged in ? or does not work?");
                   
                }
                })()}
              {console.log(user)}
                </div>
        </div>
    );
};