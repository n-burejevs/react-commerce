import React from "react";
import Navbar from "../components/Navbar";
import Sidemenu from '../components/Sidemenu';
import '../App.css';
import '../styles/FormStyles.css'
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'

export default function SignUp()
{
  const {cartCount} = useContext(CartContext);

  const { wishListCount, setWishListCount } = useContext(WishlistContext);

  const { user, setUser, checkAuthToken} = useContext(UserContext);
 
      //try to save user's entered data
      const [userData, setUserData] = React.useState({firstname: '', lastname: '', email: '', password: ''});
      const [errorMessage, SetErrorMessage] = React.useState({nameError: '', lastnameError: '', emailError: '', passwordError: ''});

      const [response, setResponse] = React.useState('');

  async function sendData() {

//send formdata to php page to validate, then upload to db and register a user
  const res = await fetch('http://localhost/react-commerce/index.php', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    const result = await res.json();
    setResponse(result.message);
    //console.log(response);
  }

function handleSubmit(e) {
  e.preventDefault();
  const newErrors = {};
  if (userData.firstname.trim().length === 0) newErrors.firstname = "Provide First name";
    if (userData.lastname.trim().length === 0) newErrors.lastname = "Provide Last name";
      if (userData.email.trim().length === 0) newErrors.email = "Provide email";
        if (userData.password.trim().length < 8) newErrors.password = "Provide a better/longer password"

  SetErrorMessage(newErrors);
  if (Object.keys(newErrors).length === 0) {
    sendData();
  }
}

function handleChange(e) {
  setUserData({...userData, [e.target.name]: e.target.value});
}

    React.useEffect(() => {
   
      const fetchUserInfo = async () => {
      
      const loggedUser = await checkAuthToken();
    //console.log(loggedUser);
     if(loggedUser) {
      
      //user already did sign up and is logged in
       window.location.replace("/");
    }

    }
    fetchUserInfo()
    .catch(console.error);
    
  
    }, []);



      const printErrors =  <div>
         <p>{errorMessage.nameError}</p>
         <p>{errorMessage.lastnameError}</p>
         <p>{errorMessage.emailError}</p>
         <p>{errorMessage.passwordError}</p>
         <p>{JSON.stringify(response.message)}

         </p>
         </div>

      

    return (
        <div>
            <Navbar user={user} setUser={setUser}
                        cartCount={cartCount}
                        wishListCount={wishListCount} setWishListCount={setWishListCount} />
            <div className='main-content-container'>
          
            <div className='sidemenu-filterpane-mobile'> 
              <Sidemenu />  
            </div>
          
            <div className="main-content">
            <div className="form-container">
              <h1>Sign up form</h1>
                <form onSubmit={(event) =>handleSubmit(event)} className="signup-form">


                  <label htmlFor="firstname">First Name:</label>
                  <input id="firstname" type="text" name="firstname" onChange={handleChange} placeholder={"testname"/*userData.firstname*/} ></input>
                  <br/>
                  <label htmlFor="lastname">Last Name:</label>
                  <input id="lastname" type="text" name="lastname" onChange={handleChange} placeholder={"testlastname"/*userData.lastname*/}></input>
                  <br/>

                  <label htmlFor="email">Email:</label>
                  <input id="email" type="email" name="email" onChange={handleChange} placeholder={"email@email.com"/*userData.email*/}></input>
                  
                  <br/>
                  <label htmlFor="password">Password:</label>
                  <input id="password" type="password" onChange={handleChange} name="password" ></input>
                  <br/>                 
                  <div className="error-message">
                    {printErrors}
                    {response.status === "success" ? "Registration complete, you can login now": ""}
                    {response.status === "error" ? "Registration failed, please retry": ""}

                  </div>
                  
                  <button>Sign up</button>

                </form>
                </div>
               
            </div>
            </div>
        </div>
    );
}