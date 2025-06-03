import React from "react";
import Navbar from '../components/Navbar'
import { checkAuthToken } from '../functions';


export default function About(){

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
            <h1>
                    This page is about About
            </h1>
        </div>
    );
};