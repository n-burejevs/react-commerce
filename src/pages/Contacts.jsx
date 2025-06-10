import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";
import { checkAuthToken } from '../functions';

export default function Contact(){

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
             <Navbar user={user} setUser={setUser}/>
               <div className='main-content-container'>
            
                <div className='sidemenu-filterpane-mobile'> 
                <Sidemenu/>  
                  
                </div>
                <div className="contact-page">
                   <h1>
                    Contacts:
                   </h1>
                </div>
               {/* elements for contact page here here */}

              
                </div>
        </div>
    );
}