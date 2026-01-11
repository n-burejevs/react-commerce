import React from "react";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import '../styles/FormStyles.css'
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'
//import {useNavigate} from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';


export default function Login() {

  const { cartCount, cartItems, setCartItems, addToCart } = useContext(CartContext);

  const { wishListCount, setWishListCount, wishlistItems, setWishlistItems, addTowishlist } = useContext(WishlistContext);
  
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassw, setUserPassw] = React.useState("");

    const [response, setResponse] = React.useState({status: "", message: ""});

    const { user, setUser, checkAuthToken} = useContext(UserContext);

    const [loading, setLoading] = React.useState(false);
     
    const handleSubmitEvent = (e) => {
      e.preventDefault();
     
      if (userEmail !== "" && userPassw !== "") {
        
        sendData()
        //window.location.replace("/");        
      }
      else alert("please provide a valid input");
    };

async function sendData() {
  //set off an animation - loading spinner
  //the async sending/merging cart is so slow i've put an animation there
  //i cant make it faster or make it wait before redirect
   setLoading(true);
 try {
//send formdata to php page to validate

  const res = await fetch('http://localhost/react-commerce/login.php', {
      method: 'POST',
      body: JSON.stringify({email: userEmail, password: userPassw})
    });

    const result = await res.json();

    setResponse({status: result.status, message: result.message});
      //send user to homepage after login?
      if(result.status === 'success')
      { 
          //cookie for a week
           setCookie('token', result.token, 7)
          
           //update, load cart if user connected from an other device/account
          //or localstorage was cleared
        //  syncCartWithDatabase(result.token).then(
            //does not work? wait until sync is completed, then redirect
           // (() => window.location.replace("/")))

          syncCartWithDatabase(result.token)

          //This is not the best solution...
    await new Promise(resolve => setTimeout(resolve, 2000));
    
          //leave as is, but add some animation instead??
           // navigate("/"); does not work!
    window.location.replace("/");
      }
      else
        {
          if(result.status === 'error') setResponse({status: "error", message: "Error, cant login..."});
          setResponse({status: "error", message: "Network error, cant login..."}) 
        } 

} catch {
      setResponse({status: "error", message: "Unknown error, cant login..."}) 
     }
     setLoading(false);
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
    window.location.replace("/");
  
  }}
  fetchUserInfo()
  .catch(console.error);
  

  }, []);
  


  //remove unnecessary data, because it wont insert the whole object of an item
  function prepareItemsForDB(items)
  {
    var itemIDforDB = [];

    for(let i=0; i<items.length; i++)
    {
      itemIDforDB.push({id: items[i].id, quantity: items[i].quantity})
    }

    return itemIDforDB;
  }

/*
const userCookie = useMemo(() => {
    
    return getCookie();
  }, [user]);  
*/
//needs to be prepareItemsForDB first
  async function saveItemstoDB(cartitems, wishlist, userToken)
  {
      ///console.log(user);
  const res = await fetch('http://localhost/react-commerce/save_carts.php', {
      method: 'POST',
      body: JSON.stringify({cart_items: cartitems, wish_list: wishlist, user_token: userToken})
      
    });
    ///console.log(JSON.stringify({cart_items: cartitems, wish_list: wishlist, user_token: userToken}))
    const results =  await res.json();

    console.log(results);
   
  } 
  //items in db are saved only by id and quantity
  //so to merge items from db with localstorage, i need to get the item object back
  //then im using already defined functions to add the item to the cart list or the wishlist
    //array of id,quantity
    //CHECK if id are defined?
  async function findItemByID(array)
  {
    let completeProducts = [];
   
    for (let i=0; i<array.length; i++)
    {
       let product = {};
    try {
      const res = await fetch(`https://dummyjson.com/products/${array[i].id}`, {
      method: 'GET',
      
    });
     product =  await res.json();

    product.quantity = array[i].quantity;

    completeProducts.push(product);
       if (!res.ok) {
        //this stops the execution and goes to catch block
      throw new Error(`Response status: ${res.status}`);
    }

      } catch (error) {
    
      console.error(error.message);
     }

    }
    
   return completeProducts;
  }
  //combine items from db with items in localstorage/state
  function mergeSavedCartItems(recievedItems){
      let cartItemstoAddAtOnce= [];
      let diffInCart = [];
  for(let i=0; i<recievedItems.length; i++)
  {
      let difference = cartItems.find((element) => element.id == recievedItems[i].id);

      if(difference){
         //update item with quantity?
        console.log("includes:", recievedItems[i])
       
          //using this temp array, instead of set function
          //  to make sure i update cart state only once and not every iteration
           diffInCart = cartItems.map((cartItem) =>
          cartItem.id === difference.id
          //keeping the biggest quantity?
            ? { ...cartItem, quantity: recievedItems[i].quantity >= cartItem.quantity ? recievedItems[i].quantity : cartItem.quantity }
            : cartItem
        )
       }
       else{
         console.log("adding to cart: ",recievedItems[i].id);
          cartItemstoAddAtOnce.push({id: recievedItems[i].id, quantity: recievedItems[i].quantity});
       } 
  }
         //if i add every item inside for loop, then it will trigger re-render since every addtoCart will update state, then
       //it would call a function to update db with single item, overriding others,
       //solution - update state with all items at once
       if(cartItemstoAddAtOnce.length > 0)
       {
           //https://www.reddit.com/r/learnjavascript/comments/13836q0/how_do_i_get_data_out_of_a_promise_object/
         // async functions always return a promise. you must await
          // them in async functions, or use .then to get and use the value
          findItemByID(cartItemstoAddAtOnce).then(
            result => setCartItems(cartItems.concat(result)));
       }

       if(diffInCart.length > 0)
       {
         setCartItems(diffInCart);
       }
  }

    //combine items from db with items in localstorage/state
  function mergeSavedWishedItems(recievedItems){
       let wishedItemstoAddAtOnce= [];
       let diffInWishlist = [];
  for(let i=0; i<recievedItems.length; i++)
  {

    let difference = wishlistItems.find((element) => element.id == recievedItems[i].id);

      if(difference){
         //update item with quantity?
        console.log("includes:", recievedItems[i])
       
       diffInWishlist = wishlistItems.map((wishedItem) =>
          wishedItem.id === difference.id
          //keeping the biggest quantity?
            ? { ...wishedItem, quantity: recievedItems[i].quantity >= wishedItem.quantity ? recievedItems[i].quantity : wishedItem.quantity }
            : wishedItem
        )
      
       }
       else{
         console.log("adding to wishlist: ",recievedItems[i].id);
         wishedItemstoAddAtOnce.push({id: recievedItems[i].id, quantity: recievedItems[i].quantity});

       }
  }
      if(wishedItemstoAddAtOnce.length > 0)
       {
          findItemByID(wishedItemstoAddAtOnce).then(
            result => setWishlistItems(wishlistItems.concat(result)));
       }
      if(diffInWishlist.length > 0)
       {
         setWishlistItems(diffInWishlist);
       }
  }

  /*check if user has saved items in cart / wishlist */
  // if there are items in localstorage/state or saved in the db, merge them

  async function syncCartWithDatabase(userToken){

  const res = await fetch('http://localhost/react-commerce/sync_carts.php', {
      method: 'POST',
      body: JSON.stringify({user_token: userToken})
    });

    const savedData = await res.json();

    //returns 0 if there are no db records, no items saved
    if (savedData.message === 0)
    {
      //database is empty, then upload item to db
       console.log("only save");
       let cart = prepareItemsForDB(cartItems);
      let wished = prepareItemsForDB(wishlistItems);

      saveItemstoDB(cart, wished, userToken);
       
    }
   else {
    //merge with the items in the cart and wishlist
       console.log("recieve, combine and update with the new list")

      console.log("cart from db",savedData.message.cart_items, "wishlist from db",savedData.message.wished_items);

      //call for each type separately
      mergeSavedCartItems(JSON.parse(savedData.message.cart_items));
          mergeSavedWishedItems( JSON.parse(savedData.message.wished_items));
          
      let cart = prepareItemsForDB(cartItems);
      let wished = prepareItemsForDB(wishlistItems);
    
      saveItemstoDB(cart, wished, userToken);
   }
  }

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
        {/*response === "error" ? "Login attempt failed" : ""*//*console.log(response)*/}
        {response.status == "error" && response.message}
     </div>

  {/** align this spinner!!!!!!!!!!! */}
     {loading ?<div className="spinner-container"><SpinnerCircular enabled={loading} size={50} thickness={100} 
              speed={100} color="rgba(70, 57, 172, 1)" secondaryColor="rgba(172, 57, 57, 0)" /></div> :
                           <button className="btn-submit">Submit</button>}

    {/*response.status == "success" && JSON.stringify(response)*/}
    
  </form>
  
  </div>
  
  </div>
  </>
   
  )
}