import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({name: '', lastname: '', email: ''});
    //const [loggedIn, setLoggedIn] = useState(false);

//? hmr invalidate /src/components/context/user.jsx Could not Fast Refresh ("UserContext" export is incompatible)

//extract cookie value by name
//https://www.w3schools.com/js/js_cookies.asp
 function getCookie() {
  let name = 'token' + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//send token code to check if what user is logged in/if logged in
//token is not protected and is unsafe...
 async function checkAuthToken() {
  let cookieToken = getCookie();
  if(cookieToken !== ""){
  
     const res = await fetch('http://localhost/react-commerce/check_login.php', {
      method: 'POST',
      body: JSON.stringify({token: cookieToken})
    });

    const result =  await res.json();

    //get user name and other data to display in navbar to greet the user
 //console.log(result.message);
   return result.message;
  }
  else return ""
 
    //console.log(response);
  }
    
    useEffect(() => {
     
      const fetchUserInfo = async () => {
      
      const loggedUser = await checkAuthToken();
    //console.log("user: ".loggedUser);
    //?? why have a ternary here? maybe have a setUser without it?
     if(loggedUser) {
        setUser(loggedUser ? {name: loggedUser.name, lastname: loggedUser.lastname, email: loggedUser.email} : null)
        //setLoggedIn(true);
        
    }
    /*else {setLoggedIn(false); console.log("now false")}*/
    }
    fetchUserInfo()
    .catch(console.error);
  
    }, []);
    /*
  useEffect(() => {
   
  }, []);*/

  return (
    <UserContext.Provider
      value={{
        user, 
        setUser,
        /*loggedIn,*/
        getCookie,
        checkAuthToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};