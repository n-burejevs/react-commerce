//import useContext from "react";
import React from "react";
//import UserContext from "../components/UserContext";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import { checkAuthToken } from "../functions";
import '../styles/FormStyles.css'
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';

export default function Login() {

  const { cartCount } = useContext(CartContext);

  const { wishListCount, setWishListCount } = useContext(WishlistContext);
  
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassw, setUserPassw] = React.useState("");

    const [response, setResponse] = React.useState("");

     const [user, setUser] = React.useState({name: '', lastname: '', email: ''});
     

    const handleSubmitEvent = (e) => {
      e.preventDefault();
     
      if (userEmail !== "" && userPassw !== "") {
        
        //console.log(userEmail, userPassw);
        sendData();
      }
      else alert("please provide a valid input");
    };

      async function sendData() {

//send formdata to php page to validate
  const res = await fetch('http://localhost/react-commerce/login.php', {
      method: 'POST',
      body: JSON.stringify({email: userEmail, password: userPassw})
    });

    const result = await res.json();
    setResponse(result.message);

      //send user to homepage after login?
      if(result.status === 'success')
      { 
          //cookie for a week
           setCookie('token', result.token, 7)
           //redirect
             window.location.replace("/localhost:5173");
      }
    //console.log(response);
  }
//https://www.w3schools.com/js/js_cookies.asp
  function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

    function handleEmailChange(e) {
      setUserEmail(e.target.value)
    }
    function handlePasswordChange(e) {
      setUserPassw(e.target.value)
    }

  React.useEffect(() => {
   
    const fetchUserInfo = async () => {
    
    const loggedUser = await checkAuthToken();
    //console.log(loggedUser);
 if(loggedUser) {
    //user already is logged in
    window.location.replace("/localhost:5173");
  //setUser(loggedUser ? {name: loggedUser.name, lastname: loggedUser.lastname, email: loggedUser.email} : null)
  }}
  fetchUserInfo()
  .catch(console.error);
  

  }, []);
  

  //const { user, logout } = useContext(UserContext);

  return (
  <>
  <Navbar user={user} setUser={setUser} /*cartItems={cartItems} setCartItems={setCartItems}*/
             cartCount={cartCount} 
             wishListCount={wishListCount} setWishListCount={setWishListCount} />
  
  <div className='main-content-container'>

   <div className='sidemenu-filterpane-mobile'> 
      <Sidemenu />  
    </div>
  <div className="main-content">
    
     <form onSubmit={handleSubmitEvent} className="login-form">
      <h1>Login form</h1>
    <div className="input-fields" >
      <label htmlFor="user-email">Email:</label>
      <input
        type="email"
        id="user-email"
        name="email"
        placeholder="email@email.com"
        onChange={handleEmailChange}
      />


      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handlePasswordChange}
      />
    
    </div>
   
     <div className="error-message">
        {response === "error" ? "Login attempt failed" : ""}
     </div>
    <button className="btn-submit">Submit</button>
    {/*response.status == "success" && JSON.stringify(response)*/}
    
  </form>
  
  </div>
  
  </div>
  </>
   
  )
}