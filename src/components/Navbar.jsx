import React from "react";
import hamb from '../assets/hamburger-menu2.png';
import cart from '../assets/cart.png';
import { Link  } from 'react-router-dom';
import SearchResults from "./SearchResults";
import search_icon from '../assets/search.png';
import wishlist_icon from '../assets/wishlist.png';
import user_account_icon from '../assets/user-account.png';
import MiniCart from '../components/MiniCart'

//Found a good way to do search
//https://medium.com/@ignatovich.dm/enhancing-form-handling-in-react-19-a-look-at-action-useformstate-and-useformstatus-a5ee68d6bf93

export default function Navbar(props){

   /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */

   /*used to determine a container, which, 
   if clicked outside of, will "close" by useEffect */
let container = React.createRef();
let miniCartView = React.createRef();

const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
const [isCartMenuOpen, SetIsCartMenuOpen] = React.useState(false);

   function handleButtonClick(){
   // console.log("before"+isNavMenuOpen);
        setIsNavMenuOpen(prevState => !prevState);
     //  console.log("after"+isNavMenuOpen);
    
  }; 
  
  function ToggleCart(){
    SetIsCartMenuOpen(prevState => !prevState);
    //console.log("toggle cart triggered");
}; 
//user searches stuff in the searchbar
const [searchFor, setSearchFor] = React.useState("");
//put it in  a separate useeffect?, so when searchbar is empty result div dissappears
const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);

function handleChange(event)
{
  setSearchFor(event.target.value);
}

const [products, setProducts] = React.useState([]);

const [searchResults, setsearchResults] = React.useState([]);

  React.useEffect(() =>{
  fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => setProducts(data.products))
  },[])

  //too many searches
  React.useEffect(() =>{
    if(searchFor.length > 2){

      setSearchResultsVisible(true)

      const results = {};
      for(var i=0; i<products.length; i++)
      {
      
      let productTitle = products[i].title;       
         //if searched phrase matches the product
        //cant get more than one result?!?!!?
        if(productTitle.toLowerCase().includes(searchFor.toLowerCase())/* !== -1*/) 
        {
          results.title = products[i].title;
          results.price = products[i].price;
          results.img = products[i].thumbnail;
          results.id = products[i].id;

          setsearchResults(prevState => [...prevState, results]);
          
        }
        //console.log(searchResults);
      }
    }
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

          <div className="user-account-container">
          <Link to='/my-account' className="anchor">
            <img className="user-account-icon" src={user_account_icon} alt="user-account-icon"></img>
            </Link>
          </div>

          <div className="wishlist-container">
            <img className="wishlist-icon" src={wishlist_icon} alt="wishlist-icon"></img>
          </div>

          {/** this div is just for the ref  */}
           <div  ref={miniCartView}> 
           <div className="cart" onClick={ToggleCart}>
            {props.cartCount ? <span className="cart-item-count">{props.cartCount}</span> : ""}
            <img className="cart-icon" src={cart}></img>
         
           </div>
           <div className="mini-cart-container-absolute" >
            {/*console.log("state: "+isCartMenuOpen)*/}
           { isCartMenuOpen && <div className="mini-cart-menu"   >
              <MiniCart cartCount={props.cartCount} setcartCount={props.setcartCount} SetIsCartMenuOpen={SetIsCartMenuOpen}/>
              </div>}
            </div>
            </div>
           
        </div>
    )
}