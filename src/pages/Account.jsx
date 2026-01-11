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
//need to finish this and make stuff happen on the server side!
   async function updateUserData(formData) {

    const userNewProp = formData.get("user-new-key"); 
    const userNewValue = formData.get("user-new-val");

    ///add a server url to handle the stuff
      const url = "";
  try {
    const response = await fetch(url, 
      { 
        method: "POST",  
        body: JSON.stringify({ new_prop: userNewProp, new_val: userNewValue, email: user.email  }) })
    
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
    
  }


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
              This is account page, welcome {user.name}!
            </h1>
            <div className="user-information">
          <form action={updateUserData}>
            <input name="user-new-key" />
             <input name="user-new-val" />
            <button type="submit">Send</button>
          </form>
            </div>
          </div>

              {/*console.log(user)*/}
    </div>


</>
)};