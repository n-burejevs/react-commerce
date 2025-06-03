//import useContext from "react";
import React from "react";
//import UserContext from "../components/UserContext";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import { checkAuthToken } from "../functions";

/*
You signup/login from you front end
You backend validates the user info and generates authentication token (and maybe refresh token) and sends it to the front
Front end uses said tokens in each call to the backend
Backend validates the token and allows access accordingly
To keep user logged in you can use a stored token (again, in a cookie if you are on web) and refresh it if needed
*/

export default function Login() {

    const [userEmail, setUserEmail] = React.useState("");
    const [userPassw, setUserPassw] = React.useState("");

    const [response, setResponse] = React.useState("");

     const [user, setUser] = React.useState({name: '', lastname: '', email: ''});

    const handleSubmitEvent = (e) => {
      e.preventDefault();
     
      if (userEmail !== "" && userPassw !== "") {
        
        console.log(userEmail, userPassw);
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
  
//cookie for a week
     setCookie('token', result.token, 7)
      //send user to homepage after login?
      if(result.status === 'success') { window.location.replace("/localhost:5173"); }
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
 if(loggedUser) setUser(loggedUser ? {name: loggedUser.name, lastname: loggedUser.lastname, email: loggedUser.email} : null)
  }
  fetchUserInfo()
  .catch(console.error);
  

  }, []);
  

  //const { user, logout } = useContext(UserContext);

  return (
  <>
  <Navbar user={user} setUser={setUser}/>
  
  <div className='main-content-container'>

   <div className='sidemenu-filterpane-mobile'> 
      <Sidemenu />  
    </div>
  <div className="main-content">
     <form onSubmit={handleSubmitEvent}>
    <div className="form_control">
      <label htmlFor="user-email">Email:</label>
      <input
        type="email"
        id="user-email"
        name="email"
        placeholder="example@yahoo.com"
        onChange={handleEmailChange}
        defaultValue={"email@email.com"}
      />

    </div>
    <div className="form_control">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        defaultValue={"12345678"}
        onChange={handlePasswordChange}
      />
    
    </div>
    <button className="btn-submit">Submit</button>
  </form>
  {JSON.stringify(response)}
  </div>
  
  </div>
  </>
   
  )
}