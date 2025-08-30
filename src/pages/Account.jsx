import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'
import { useNavigate } from "react-router";

export default function Account(){

  const { cartCount } = useContext(CartContext);

  const {wishListCount, setWishListCount} = useContext(WishlistContext);

  const { user, setUser, getCookie} = useContext(UserContext);
  
  let navigate = useNavigate();
//use token as a method to identify the user
  const userToken = getCookie();
  //console.log(userToken);

  React.useEffect(() =>{
   
//user is logged in
   //if (/*user == null || user.name == ""*/)
  if (userToken !== "")
  {
   //welcome user
  }
  else {
     console.log("should be redirected")
     navigate('/login', { replace: true })
  }
   
  },[])


return (
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

              {/*console.log(user)*/}
    </div>


</>
)};