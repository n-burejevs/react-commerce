import React from "react";
import Navbar from "../components/Navbar";
import Sidemenu from '../components/Sidemenu';
import '../App.css';
import '../styles/FormStyles.css'
import { checkAuthToken } from "../functions";

export default function SignUp()
{
    
    const [user, setUser] = React.useState({name: '', lastname: '', email: ''});
     const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
     const itemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      }; 
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

function /*SignUp*/handleSubmit(/*formData*/event)
{
        event.preventDefault();
        var formIsFilled = true;
        var errors = {nameError: '', lastnameError: '', emailError: '', passwordError: ''};

      if (userData.firstname.trim().length === 0) {
        console.log("The firstname is empty");
        errors = ({...errors, nameError: 'Provide First name'});
        formIsFilled = false;
      } 
      if (userData.lastname.trim().length === 0) {
        console.log("The lastname is empty");
        errors = ({...errors, lastnameError: 'Provide Last name'});
        formIsFilled = false;
      } 
    
      if (userData.email.trim().length === 0) {
        console.log("The email is empty");
        errors = ({...errors, emailError: 'Provide email'});
        formIsFilled = false;
      }
      
      if (userData.password.trim().length < 8) {
        console.log("The password is short");
        errors = ({...errors, emailError: 'Provide password, atleast 8 symbols long '});
        formIsFilled = false;
      }
      
      if(formIsFilled === false) {SetErrorMessage(errors);}
      else {
        console.log("all is filled", userData);
        //clean up old error messages?
         SetErrorMessage({nameError: '', lastnameError: '', emailError: '', passwordError: ''})
         //what to do with form data?
         //validate it on backend, upload to db
           sendData();
        }
        
  }
/*Do i need these function if i get form from event.target?*/
function handleFirstNameChange(e) {
      setUserData({
        ...userData, // Copy the old fields
        firstname: e.target.value // But override this one
      });
    }
function handleLastNameChange(e) {
      setUserData({
        ...userData, 
        lastname: e.target.value 
      });
    }
function handleEmailChange(e) {
  setUserData({
    ...userData, 
    email: e.target.value 
  });
}
function handlePasswordChange(e) {
  setUserData({
    ...userData,
    password: e.target.value
  });
  }
    React.useEffect(() => {
   
      const fetchUserInfo = async () => {
      
      const loggedUser = await checkAuthToken();
    //console.log(loggedUser);
     if(loggedUser) setUser(loggedUser ? {name: loggedUser.name, lastname: loggedUser.lastname, email: loggedUser.email} : null)
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
            <Navbar cartCount={itemsCount()} user={user} setUser={setUser} />
            <div className='main-content-container'>
          
            <div className='sidemenu-filterpane-mobile'> 
              <Sidemenu />  
            </div>
          
            <div className="main-content">
            <div className="form-container">
              <h1>Sign up form</h1>
                <form /*action={SignUp}*/  
               /* action="http://localhost/react-commerce/index.php"*/
               /*method="post"*/
               /*action={handleSubmit}*/
                onSubmit={(event) =>handleSubmit(event)}>


                  <label htmlFor="firstname">First Name:</label>
                  <input id="firstname" type="text" name="firstname" onChange={handleFirstNameChange} defaultValue={"testname"/*userData.firstname*/} ></input>
                  <br/>
                  <label htmlFor="lastname">Last Name:</label>
                  <input id="lastname" type="text" name="lastname" onChange={handleLastNameChange} defaultValue={"testlastname"/*userData.lastname*/}></input>
                  <br/>

                  <label htmlFor="email">Email:</label>
                  <input id="email" type="email" name="email" onChange={handleEmailChange} defaultValue={"email@email.com"/*userData.email*/}></input>
                  
                  <br/>
                  <label htmlFor="password">Password:</label>
                  <input id="password" type="password" onChange={handlePasswordChange} defaultValue={"12345678"} name="password" ></input>
                  <br/>                 
                  <div className="error-message">{printErrors}</div>
                  <div>{response}</div>
                  <button>Sign up</button>

                </form>
                </div>
                {/*wtf is with response??????????????????????????????????????????*/}
                 {response.status === "success" ? "Registration complete, you can login now": "Registration failed, please retry"}
            </div>
            </div>
        </div>
    );
}