import React from "react";
import hamb from '../assets/hamburger-menu2.png';
import cart from '../assets/cart.png';
import { Link  } from 'react-router-dom';
import SearchResults from "./SearchResults";
import { nanoid } from "nanoid";
import search_icon from '../assets/search.png';

/*<a> changed to <Link>*/
// Link renders a <a> tag?!?!

export default function Navbar(props){

   /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */

   /*used to determine a container, which, 
   if clicked outside of, will "close" by useEffect */
let container = React.createRef();
//get the value from app.jsx as a prop?
let windowWidth = props.width;//window.innerWidth;

const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);

   function handleButtonClick(){
        setIsNavMenuOpen(prevState => !prevState)
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
        if(productTitle.toLowerCase().indexOf(searchFor.toLowerCase()) !== -1) 
        {
        

          results.title = products[i].title;
          results.price = products[i].price;
          results.img = products[i].thumbnail;
            //console.log(results)
            //problem: array fills up with the same items(product duplicates)
          setsearchResults(prevState => [...prevState, results])
          //console.log(searchResults);
        
         
        }
        
      }
    }
    else if(searchFor.length === 0) { 
      setSearchResultsVisible(false);
      setsearchResults([]);
       }
    },[searchFor])

//a bug: clicking anywhere removes navbar items while in widescreen mode
//
function handleClickOutside(event){
  //the bug fix
    if(windowWidth < 768){
      if (
        container.current &&
        !container.current.contains(event.target)
      ) {
          setIsNavMenuOpen(false);
      }
    };

    }

  /*Hide dropdown when clicked outside of it*/
  React.useEffect(() => {

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isNavMenuOpen]);

    return(
  
        <div className="navbar" ref={container}>
          <img src={hamb} className="menu" alt="menu icon" onClick={handleButtonClick}></img>
           
            {isNavMenuOpen && ( <div id="myLinks">
            <Link to='/' className="anchor">Home</Link>
            <Link to='/contact' className="anchor" >Contacts</Link>
            <Link to='/about' className="anchor" >About</Link>
            <Link to='/my-account' className="anchor">My Account</Link>
           </div>)}

           <div id="myLinksWideScr">
            <Link to='/' className="anchor">Home</Link>
            <Link to='/contact' className="anchor" >Contacts</Link>
            <Link to='/about' className="anchor" >About</Link>
            <Link to='/my-account' className="anchor">My Account</Link>
           </div>

           <div className="searchbox-container">
           
           <input className="searchbox" type="text" placeholder="Search.." onChange={handleChange}/> 
           <div className="search-button-container">
           <button className="search-button"><img className="search-icon" src={search_icon}></img> </button>
           </div>
          
          
          {/** have a search results here somewhere, like if true(state variable(create a new one)) then render the box with products that match the search */
          searchResultsVisible ? < SearchResults results={searchResults}/> : ""}
          </div>
           
           <div className="cart">
            {props.cartCount ? <span className="cart-item-count">{props.cartCount}</span> : ""}
            <Link to="/cart" className="cart-img"><img className="cart-icon" src={cart}></img></Link>
            <div>
              {/*Send state to Cart component, its shared with Navbar so its accesable everywhere??????*/}
            
            </div>
           </div>
           
        </div>
    )
}