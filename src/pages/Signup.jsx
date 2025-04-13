import React from "react";
import Navbar from "../components/Navbar";
import Sidemenu from '../components/Sidemenu';
import '../App.css';
import '../styles/FormStyles.css'

//https://youtu.be/x4rFhThSX04?t=24246

export default function SignUp()
{
     const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
     const itemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      }; 
      //try to save user's entered data
      const [userData, setUserData] = React.useState({firstname: '', lastname: '', email: '', password: ''});
      const [errorMessage, SetErrorMessage] = React.useState({nameError: '', lastnameError: '', emailError: '', passwordError: ''});

      function SignUp(formData)
      {
        
        var formIsFilled = true;
        var errors = {nameError: '', lastnameError: '', emailError: '', passwordError: ''};
       // SetErrorMessage({nameError: '', lastnameError: '', emailError: '', passwordError: ''});
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");
      
        setUserData({firstname : firstname, lastname: lastname, email: email, password: ''/*password*/})
         // setUserData({firstname : '', lastname: '', email: '', password: ''})
      //setUserData({firstname : firstname, lastname: lastname, email: email, password: password})

      if (firstname.trim().length === 0) {
        console.log("The firstname is empty");
        errors = ({...errors, nameError: 'Provide First name'});
        formIsFilled = false;
      } 
      if (lastname.trim().length === 0) {
        console.log("The lastname is empty");
        errors = ({...errors, lastnameError: 'Provide Last name'});
        formIsFilled = false;
      } 
      if (email.trim().length === 0) {
        console.log("The email is empty");
        errors = ({...errors, emailError: 'Provide email'});
        formIsFilled = false;
      } 
      if (password.trim().length < 8) {
        console.log("The password is empty");
        errors = ({...errors, emailError: 'Provide password, atleast 8 symbols long '});
        formIsFilled = false;
      } 
      if(formIsFilled === false) {SetErrorMessage(errors);}
      else {console.log("all is filled")}

    }

      const printErrors =  <div>
         <p>{errorMessage.nameError}</p>
         <p>{errorMessage.lastnameError}</p>
         <p>{errorMessage.emailError}</p>
         <p>{errorMessage.passwordError}</p>
         </div>

      

    return (
        <div>
            <Navbar cartCount={itemsCount()}/>
            <div className='main-content-container'>
          
            <div className='sidemenu-filterpane-mobile'> 
              <Sidemenu />  
            </div>
          
            <div className="main-content">
            <div className="form-container">
              <h1>Sign up form</h1>
                <form action={SignUp}>


                  <label htmlFor="firstname">First Name:</label>
                  <input id="firstname" type="text" name="firstname" defaultValue={userData.firstname} ></input>
                  <br/>
                  <label htmlFor="lastname">Last Name:</label>
                  <input id="lastname" type="text" name="lastname" defaultValue={userData.lastname}></input>
                  <br/>

                  <label htmlFor="email">Email:</label>
                  <input id="email" type="email" name="email" defaultValue={userData.email}></input>
                  
                  <br/>
                  <label htmlFor="password">Password:</label>
                  <input id="password" type="password" name="password" ></input>
                  <br/>                 
                  <div className="error-message">{printErrors}</div>
                  <button>Sign up</button>

                </form>
                </div>
            </div>
            </div>
        </div>
    );
}