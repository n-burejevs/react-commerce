import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'
import { useNavigate } from "react-router";
import AccountMenu from "../components/AccountMenu";

export default function Account(){

      ///add a server url to handle the stuff
  const url = "http://localhost/react-commerce/user.php";

  const { cartCount } = useContext(CartContext);

  const {wishListCount, setWishListCount} = useContext(WishlistContext);

  const { user, setUser, getCookie} = useContext(UserContext);

  //get the keys from db load them in a dropdown and present to the user? have a "ADD NEW option?" hmmmm
  const [parameters, setParameters] = React.useState([]);

  //user custom detail,field, or what ever...
  const [userValues, setUserValues] = React.useState({key: "", value: "", selected: ""});
  
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
   console.log(user);

    //send request to get array of !parameters!
    getParams();
  }
  else {
     console.log("should be redirected")
     navigate('/login', { replace: true })
  }
   
  },[])
//
   async function updateUserData(e)
   {
    e.preventDefault();
    //const userNewProp = formData.get("key"); 
    //const userNewValue = formData.get("value");
    console.log(userValues, userValues.selected != "" ? userValues.selected : userValues.key)

      //if nothing is selected
      //reject submition...
    if((userValues.selected == "" && userValues.key == ""))
    {console.log("did not submit")
    }
     else{


        try {
          const response = await fetch(url, 
            { 
              method: "POST",  
              body: JSON.stringify({ user_val: /*userNewValue*/userValues.value,
                //if existing option is picked use that, if not grab what user is typed in? what if nothing is typed in?????
                  user_key: /*userNewProp*/userValues.selected != "" ? userValues.selected : userValues.key,
                  email: user.email  }) })
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error(error.message);
        }
    }
    
    
    
  }


  async function getParams() {
              try{
            const res = await fetch(url, {
                method: 'GET'
              });
              setParameters([""].concat(await res.json()));
          
          } catch (error) {
              console.error(error.message);
            }
      }
  

  function handleChange(e)
  {
    setUserValues({...userValues, [e.target.name]: e.target.value})
  }

  console.log(userValues);
return (
  <>
  
<Navbar user={user} setUser={setUser}
            cartCount={cartCount}
            wishListCount={wishListCount} setWishListCount={setWishListCount} />
  
    <div className='main-content-container'>
            
      {/*<div className='sidemenu-filterpane-mobile'> 
        <Sidemenu/>
      </div>*/}

      <AccountMenu/>
          <div className="about-page">
            <h1>
              This is account page, welcome {user.name}!
            </h1>
            <div className="user-information">

          <form onSubmit={updateUserData} className="user-profile-form" >
              <label htmlFor="key">Name of your custom attribute:</label>
            <input name="key" value={userValues.key} onChange={handleChange}/>
           <label htmlFor="selected">Existing attributes:</label>
      <select value={userValues.selected} onChange={handleChange} className="attribute-select" name="selected">
        {parameters?.map((param, index) => <option key={index} value={param}>{param}</option> )}
        
      </select>
              <label htmlFor="value">Custom attribute:</label>
             <input name="value" value={userValues.value} required onChange={handleChange} />

 

            <button type="submit">Send</button>

          </form>

            </div>
          </div>

              {/*console.log(user)*/}
    </div>


</>
)};