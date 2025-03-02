import React from "react";
import hamb from '../assets/hamburger-menu2.png';
import cart from '../assets/cart.png';
import { Link  } from 'react-router-dom';
import Cart from '../pages/Cart'

/*<a> changed to <Link>*/
// Link renders a <a> tag?!?!

export default function Navbar(props){

   /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */

   /*used to determine a container, which, 
   if clicked outside of, will "close" by useEffect */
let container = React.createRef();

let windowWidth = window.innerWidth;

const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);

   function handleButtonClick(){
        setIsNavMenuOpen(prevState=> !prevState)
  }; 
const [searchFor, setSearchFox] = React.useState("");

function handleChange(event)
{
  setSearchFox(event.target.value);
 
}

const [products, setProducts] = React.useState([]);

  React.useEffect(() =>{
  fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => setProducts(data.products))
  },[])
  //too many searches
  React.useEffect(() =>{
    if(searchFor.length > 2){
      for(var i=0; i<products.length; i++)
      {
        let productTitle = products[i].title;
          //if searched phrase matches the product
        if(productTitle.indexOf(searchFor) !== -1) 
        {
          //display div with results near search bar
          
        }
        
      }
    }

    },[searchFor])

//a bug, clicking anywhere removes navbar items while in widescreen mode
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

           <input className="searchbox" type="text" placeholder="Search.." onChange={handleChange}/>
           
           <div className="cart">
            <span className="cart-item-count">{props.cartCount}</span>
            <Link to="/cart" className="cart-img"><img className="cart-icon" src={cart}></img></Link>
            <div>
              {/*Send state to Cart component, its shared with Navbar so its accesable everywhere??????*/}
            
            </div>
           </div>
           
        </div>
    )
}