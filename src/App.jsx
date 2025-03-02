import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidemenu from './components/Sidemenu'
import Main from './components/Main'
import Filters from './components/Filters'
import Product from "./components/Product";
import Sort from "./components/Sort";
//import Product from "./components/";
//import Sort from "./components/Sort";
import Cart from './pages/Cart'

/*
TO DO:
https://www.w3schools.com/howto/howto_css_pagination.asp

https://www.w3schools.com/howto/howto_css_breadcrumbs.asp

*/

function App() {

  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      //shows navbar links after hamburger is tapped and mobile view is switched to desktop view
      //if(width > 768) { document.getElementById("myLinks").style.display == "flex"}
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  function toggleShowHide(elementName) {
    document.getElementById(elementName).classList.toggle("show");
  }




/*Rewrite Sidemenu and Filter pane for mobil(using state, cond. render and useEffect)

/* At 767 width, the menu renders in the open condition.
Do i need to actively check for width in Navbar component, using useEffect? The same way its beeing checked in App.jsx */
/*looks bad at 767 width!*/


const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

 const [cartCount, setcartCount ]= React.useState(CountItems() ? CountItems() : 0)

      React.useEffect(() => {
       
        console.log(cartCount)
      }, [cartCount])

      function CountItems(){
        let items = 0
       for(let i=0; i<cartItems.length; i++) 
       {
        items = items + cartItems[i].quantity;
       }
       
      return items;
      } 


  return (
    <>
    <Navbar cartCount={()=>setcartCount(CountItems())} /*setcartCount={setcartCount} cartItems={cartItems} setCartItems={setCartItems}*/ />
    <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu show={()=>toggleShowHide("myDropdown")}/>  
      {width < 768 ? <Filters show={()=>toggleShowHide("filter-dropdown")}/> : ""}
    </div>

     <div className="main-content">
                <Sort />
                <Product/>
      </div>
    {width > 768 ? <Filters/> : ""}
    </div>
      {}
     </>
  )
}

export default App