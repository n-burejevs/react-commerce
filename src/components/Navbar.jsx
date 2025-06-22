import React from "react";
import hamb from '../assets/hamburger-menu2.png';
import cart from '../assets/cart.png';
import { Link  } from 'react-router-dom';
import SearchResults from "./SearchResults";
import search_icon from '../assets/search.png';
import wishlist_icon from '../assets/wishlist.png';
import user_account_icon from '../assets/user-account.png';
import MiniCart from '../components/MiniCart'
//import { checkAuthToken } from "../functions";
//import useContext from
//import UserContext from "./UserContext";

//Found a good way to do search
//https://medium.com/@ignatovich.dm/enhancing-form-handling-in-react-19-a-look-at-action-useformstate-and-useformstatus-a5ee68d6bf93

export default function Navbar(props){

   function logout(){
    props.setUser(null);
    //delete cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };


    //const user = useContext(UserContext);

   /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */

   /*used to determine a container, which, 
   if clicked outside of, will "close" by useEffect */
let container = React.createRef();
let miniCartView = React.createRef();
let accountMenuContainer = React.createRef();

const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
const [isCartMenuOpen, SetIsCartMenuOpen] = React.useState(false);
const [isAccountMenuOpen, SetIsAccountMenuOpen] = React.useState(false);


//const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])

   function handleButtonClick(){
   // console.log("before"+isNavMenuOpen);
        setIsNavMenuOpen(prevState => !prevState);
     //  console.log("after"+isNavMenuOpen);
    
  }; 
  
  function ToggleCart(){
    SetIsCartMenuOpen(prevState => !prevState);
    //console.log("toggle cart triggered");
}; 

  function toggleAccountMenu(){
    SetIsAccountMenuOpen(prevState => !prevState);
  }
//user searches stuff in the searchbar
const [searchFor, setSearchFor] = React.useState("");
//put it in  a separate useeffect?, so when searchbar is empty result div dissappears
const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);

function handleChange(event)
{
  setSearchFor(event.target.value);
}

//const [products, setProducts] = React.useState([]);

const [searchResults, setsearchResults] = React.useState([]);

  //too many searches
  React.useEffect(() =>{
    if(searchFor.length > 2){

      setSearchResultsVisible(true)

      //const results = {};

     fetch(`https://dummyjson.com/products/search?q=${searchFor}`)
   .then(res => res.json())
   .then(newData => setsearchResults(newData.products));
    
    }//clean search results and close the search result box
    else if(searchFor.length === 0) { 
      setSearchResultsVisible(false);
      setsearchResults([]);
       }
    },[searchFor])

function handleClickOutside(event){
      if (
        container.current &&
        !container.current.contains(event.target)
      ) {
          setIsNavMenuOpen(false);
      }

    }
    function handleClickOutsideCart(event){    
          if (
            miniCartView.current &&
            !miniCartView.current.contains(event.target)
          ) {
              SetIsCartMenuOpen(false);
              //console.log("clicked outside of mini-cart")
          }
        }
        function handleClickOutsideAccountMenu(event){    
          if (
            accountMenuContainer.current &&
            !accountMenuContainer.current.contains(event.target)
          ) {
              SetIsAccountMenuOpen(false);
          }
        }

  /*Hide dropdown when clicked outside of it*/
  React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isNavMenuOpen]);

      /*Hide mini cart menu when clicked outside of it*/
  React.useEffect(() => {

    document.addEventListener("mousedown", handleClickOutsideCart);
    return () => {
        document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [isCartMenuOpen]);

  React.useEffect(() => {

    document.addEventListener("mousedown", handleClickOutsideAccountMenu);
    return () => {
        document.removeEventListener("mousedown", handleClickOutsideAccountMenu);
    };
  }, [isAccountMenuOpen]);

    return(
  
        <div className="navbar" >
          
          <div ref={container}>
          <img src={hamb} className="menu" alt="menu icon" /**/ onClick={handleButtonClick}></img>
            {isNavMenuOpen && ( <div id="myLinks" > 
            <Link to='/' className="anchor">Home</Link>
            <Link to='/contact' className="anchor" >Contacts</Link>
            <Link to='/about' className="anchor" >About</Link>  
            <Link to='/deals' className="anchor">Deals & Discounts</Link>
            {/*<Link to='/categories' className="anchor">Categories</Link>*/}
           </div>)}
          </div>
       

           <div id="myLinksWideScr">
            <Link to='/' className="anchor">Home</Link>
            <Link to='/contact' className="anchor" >Contacts</Link>
            <Link to='/about' className="anchor" >About</Link>
            <Link to='/deals' className="anchor">Deals & Discounts</Link>
            {/*<Link to='/categories' className="anchor">Categories</Link>*/}
           </div>

           <div className="searchbox-container">
           
           <input className="searchbox" type="text" placeholder="Search.." onChange={handleChange}/> 
           <div className="search-button-container">
           <button className="search-button"><img className="search-icon" src={search_icon}></img> </button>
           </div>
          
          {searchResultsVisible ? < SearchResults results={searchResults}/> : ""}
          </div>

          <div className="user-account-container" ref={accountMenuContainer}>
           
          
            <img className="user-account-icon" src={user_account_icon} onClick={toggleAccountMenu} alt="user-account-icon"></img>
            {/*</Link}>*/}
  
           { (() => {
            /* have an error "Uncaught TypeError: props.user is null" when user is logging out, if i check props.user,
             smh if statement evaluates true on empty(console.log(props.user) returns empty string) props.user????? */
       if (props.user !== null && props.user.name)
     
           /*mobile and desktop versions for logged in user and not logged in*/
           return <>
           {/*console.log('logged in')*/}
          {isAccountMenuOpen &&
            <div className="account-menu">
             <div className="greet-user">Welcome {props.user.name+"!"}</div>
             <div className="greet-user-buttons">
              <Link to='/account' ><button className="login-signup-btn">Account</button></Link>
               <button onClick={logout} className="login-signup-btn">Logout</button>
             </div>

            </div>
            }
           <div className="account-menu-widescreen">
             
                <div  className="greet-user">Welcome {props.user.name+"!"}</div>
                <div className="greet-user-buttons">
              <Link to='/account' ><button className="login-signup-btn">Account</button></Link>
               <button onClick={logout} className="login-signup-btn">Logout</button>
             </div>
             
          
            </div>
            </>
       else
          return <>
           {/*console.log('NOT logged in')*/}
          {isAccountMenuOpen &&
            <div className="account-menu">
              <p className="user-acc-menu-p">Create a new account?</p>
              <Link to='/signup' ><button className="login-signup-btn">Sign up</button></Link>
              <p className="user-acc-menu-p">Already have an account?</p>
              <Link to='/login' ><button className="login-signup-btn">Login</button></Link>
            </div>
            }
           <div className="account-menu-widescreen">
            
              <p className="user-acc-menu-p">Create a new account?</p>
              <Link to='/signup' ><button className="login-signup-btn">Sign up</button></Link>
              <p className="user-acc-menu-p">Already have an account?</p>
              <Link to='/login' ><button className="login-signup-btn">Login</button></Link>
            </div>
            </>
   })()}
      
          </div>

          {props.user && <div className="username">{props.user.name}</div>}

          <div className="wishlist-container">
             <Link to='/wishlist' > <img className="wishlist-icon" src={wishlist_icon} alt="wishlist-icon"></img></Link>
               {props.wishListCount ? <span className="cart-item-count">{props.wishListCount}</span> : ""}
          </div>

          {/** this div is just for the ref  */}
           <div  ref={miniCartView}> 
           <div className="cart" onClick={ToggleCart}>
            {props.cartCount ? <span className="cart-item-count">{props.cartCount}</span> : ""}
            <img className="cart-icon" src={cart}></img>
         
           </div>
           <div className="mini-cart-container-absolute" >
            {/*console.log("state: "+isCartMenuOpen)*/}{/*console.log(props.cartCount)*/}
           { isCartMenuOpen && <div className="mini-cart-menu"   >
              <MiniCart cartCount={props.cartCount} setcartCount={props.setcartCount} SetIsCartMenuOpen={SetIsCartMenuOpen}
              cartItems={props.cartItems} setCartItems={props.setCartItems}/>
              
              </div>}
            </div>
            </div>
           
        </div>
    )
}