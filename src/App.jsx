import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidemenu from './components/Sidemenu'
import Filters from './components/Filters'
import Product from "./components/Product";
import Sort from "./components/Sort";
//import CartContext from './components/CartContext'
/*
TO DO:
https://www.w3schools.com/howto/howto_css_pagination.asp

https://www.w3schools.com/howto/howto_css_breadcrumbs.asp

*/

//TO DO:
//add user auth context
//Add categories
//add discount & deals page (just add some -% off some random items)
//Add Heart icon for liked items (to navbar)
//Add a page for the list of liked items 
//add Coupon page in use accounts

//TO DO:
// display recomended products, from similar caterogry (in product.jsx)
//add reviews (in product.jsx)
//create an ability to post reviews (after you "bought")

//Add an ability to 

function App() {
  const [productSource, setProductSource] = React.useState("https://dummyjson.com/products?skip=10")
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




/* At 767 width, the menu renders in the open condition. */
/*looks bad at 767 width!*/


const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

 const [cartCount, setcartCount ]= React.useState(CountItems())

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
    {/* pass the updated item count to a component, which is displaying it */}
    <Navbar cartCount={cartCount} width={width} />
    <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      {width < 768 && <Filters/>}
    </div>

     <div className="main-content">
                <Sort source={productSource} setSource={setProductSource}/>
                {/*Pass the state to update item count, when the added to cart*/}
                <Product setcartCount={setcartCount} CountItems={CountItems} 
                cartItems={cartItems} setCartItems={setCartItems} cartCount={cartCount} width={width} source={productSource}/>
      </div>
    {width >= 768 && <Filters/>}
    </div>
      {}
     </>
  )
}

export default App