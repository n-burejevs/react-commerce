import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'

export default function Account(){

  const { cartCount } = useContext(CartContext);

  const {wishListCount, setWishListCount} = useContext(WishlistContext);

  const { user, setUser} = useContext(UserContext);


/*
  React.useEffect(() => {
   if (user == null || user.name == "") {
                   console.log("not logged in");
                   //redirect to login page
                  window.location.replace("/login");
                }
  }, []);*/
/*
if this "logic" will be in useEffect or just inside this function, then you still could see the  components before the redirect
*/
return (
  <div>
                   { (() => {
                if (user == null || user.name == "") {
                   console.log("not logged in");
                   //redirect to login page
                  window.location.replace("/localhost:5173/login");
                }
                else {
                   console.log("logged in ? or does not work?");
                     
<>


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

              {console.log(user)}
    </div>


</>
                   
                }
                })() }

  </div>
    );
};