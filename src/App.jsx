import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidemenu from './components/Sidemenu'
import Filters from './components/Filters'
import Product from "./components/Product";
import Sort from "./components/Sort";
//import UserContext from './components/UserContext'
import Pagination from './components/Pagination'
import { checkAuthToken } from './functions';

//Done: 
// + //add X button to close MiniCart menu
// + //Add Heart and user icons for liked items (to navbar)
// + //move "my account" link from navbar to the user acount icon to the left of the searchbar
// + // https://www.w3schools.com/howto/howto_css_pagination.asp
// + //login signup(registration) page
// + //registration api or wth its called...
// + //search is now with fetch and search?q=${searchFor} param in the request,(now can show multiple items!)
    //instead of searching products object with if(productTitle.toLowerCase().includes(searchFor.toLowerCase())) 
// + //menu (shown: on hover/on click) for user to login/register, if logged in will greet the user
// + ////reddirect user after sucessful login!! 52: login.jsx

//TO DO:
//login, logout api(on all pages)
//useEffect to check cookies? user is logged in and so on... have to check cookies and set the user on every page? navbar recieves props.user from every page

//check if logged in in navbars account management div, greet user and have and option to logout, go to account settings
//finish adding wishlist icon and func. to product.jsx
//add a page for the list of liked items(wishlist)
//finish category hover menu styling and get links from https://dummyjson.com/docs/products#products-category
//filters!: e. g. brand
//filters are not submited by checking checkboxes, thats why there is no data passed to handeler functions

//add user auth context? or not
//add categories(more)
//add discount & deals page (just add some -% off some random items)
//add Coupon page in user accounts
//display recomended products, from similar caterogry (in product.jsx)
//add reviews (in product.jsx)
//create an ability to post reviews (after you "bought")
//Add menus to user-account div and wishlist just like its with mini cart menu
//To DO; https://www.w3schools.com/howto/howto_css_breadcrumbs.asp
//have logged in users cart saved in database


//Bug: open mini cart menu in the navbar, add an item (press + button)
//and click somewhere outside of cart menu. the menu should close itself, but it does not
//does sth happen with ref={} after the MiniCart re-renders?

//arrow buttons in single product dont work on mobile, but swipping left/right does

//Pagination and Sort are not desingned to work together, yet(maybe add sort query to source url string? or finally get products from a db?? )
//!!!
//error happens when undefined category is selected from navigation in Sidemenu and when there are products in the cart(localstorage)

function App() {

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
//console.log(user);
//?????
/*
  const login = (user) => {
    setUser(user);
  };*/
/*
  function logout(){
    setUser(null);
    //delete cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };*/

                                                            ///'https://dummyjson.com/products?limit=10&skip=10'
  const [productSource, setProductSource] = React.useState("https://dummyjson.com/products?limit=20&skip=10")
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      //shows navbar links after hamburger is tapped in mobile view
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
/*const [cartItems, setCartItems] = React.useState([])
try
{//check if undefined
 setCartItems(JSON.parse(localStorage.getItem('cartItems')))
}
catch{
 setCartItems([])
}*/
const CountItems = () => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}; 
 const [cartCount, setcartCount ]= React.useState(CountItems)

     /* function CountItems(){
        if (cartItems===null) return 0;
        let items = 0
       for(let i=0; i<cartItems.length; i++) 
       {
        items = items + cartItems[i].quantity;
       }
       
      return items;
      } */

      
  return (
    //handle user auth
   
      <>
       {/*<UserContext.Provider value={{ user, login, logout }}>*/}
    {/* pass the updated item count to a component, which is displaying it */}
    <Navbar cartCount={cartCount} setcartCount={setcartCount} user={user} setUser={setUser} />
    <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      {width < 768 && <Filters/>}
    </div>

     <div className="main-content">
                <Sort source={productSource} setSource={setProductSource}/>
                {/*Pass the state to update item count, when the added to cart*/}
                <Product setcartCount={setcartCount} cartItems={cartItems} setCartItems={setCartItems}
                 cartCount={cartCount} source={productSource}/>
                 <Pagination source={productSource} setSource={setProductSource}/>
      </div>
    {width >= 768 && <Filters/>}
    
    </div>
      
      {/*</UserContext.Provider>*/}
      </>
  )
}

export default App