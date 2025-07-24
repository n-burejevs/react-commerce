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

import { useContext } from 'react'
import { CartContext } from './components/context/cart'

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
// + //Wishlist is added, user can add items to the wishlist, view them on .../wishlist
// + //filters!: e. g. brand
// + //Pagination logic to display legitimate number of pages based on number of items in products state(numberOfPages={products.length} 
//                                                                          products needs to be full products, not limited by '20')
// + //RE-DO cartItems states are used everywhere(duplicated code! almost in every page/component),
//  together with UseEffects to update/get state on change and addToCart addToWishList functions!
// + //check if logged in in navbars account management div, greet user and have and option to logout, go to account settings

//TO DO:
//code clean up(commented out), remove unused props?
//wishlist code to be moved to cart.jsx
//sidemenu needs refactoring in general...
//Signup, Login, singleProduct need styling!
//Add sort to ViewCategory.jsx https://dummyjson.com/products/category/laptops?limit=20&sortBy=price&order=asc
               //example ->    https://dummyjson.com/products/category/laptops?limit=20 - add the missing sort part?
//login, logout api(on all pages), user password restore (PHP password_verify() forgot password example) https://www.phpmentoring.org/blog/php-password-verify-function#:~:text=The%20Password_Verify()%20function%20is,true%2C%20otherwise%20it%20returns%20false.
//useEffect to check cookies? user is logged in and so on... have to check cookies and set the user on every page? navbar recieves props.user from every page


//finish category hover menu styling and get links from https://dummyjson.com/docs/products#products-category

//add user auth context? or not
//add categories(more)
//add discount & deals page (just add some -% off some random items)
//add Coupon page in user accounts
//display recomended products, from similar caterogry (in product.jsx)
//add reviews (in product.jsx)
//create an ability to post reviews (after you "bought")(thats probably too much...)
//Add menus to user-account div and wishlist just like its with mini cart menu
//To DO; https://www.w3schools.com/howto/howto_css_breadcrumbs.asp
//have logged in users cart saved in database
//make sure loggied in user cant register again?

//BUGS:
//1/ open mini cart menu in the navbar, add an item (press + button)
//and click somewhere outside of cart menu. the menu should close by itself, but it does not
//does sth happen with ref={} after the MiniCart re-renders?
//2/Filters and pagination components are rendered 3 times?
//3/arrow buttons in single product dont work on mobile, but swipping left/right does
//4/Pagination and Sort are not desingned to work together, yet(maybe add sort query to source url string? or finally get products from a db?? )
//!!!
//5/error happens when undefined category is selected from navigation in Sidemenu and when there are products in the cart(localstorage)
//6/Filter component gets rendered 3(5???) times? 
//7/Pagination is showing 10 pages of products, when you filter products, but there are only enough items for one page

//Other:
//filters were not submited by checking checkboxes, thats why there is no data passed to handeler functions,
// but there is a way to dispatch an event and submit

function App() {

  const { /*cartItems, addToCart, removeFromCart, clearCart, getCartTotal,*/ cartCount, CountItems, /*setcartCount*/ } = useContext(CartContext);

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
                                                            ///'https://dummyjson.com/products?limit=10&skip=10'
  const [productSource, setProductSource] = React.useState("https://dummyjson.com/products?limit=20&skip=10")
  const [width, setWidth] = React.useState(window.innerWidth);
//
  React.useEffect(() => {
    const handleResize = () => {
      //shows filters for desktop or mobile
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

//wishlsit functionality, copy-pasted from Cart
const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []);
        /*
const CountWishedItems = () => {
    return wishlistItems.reduce((total, item) => total + item.quantity, 0);
}; */
const [wishListCount, setWishListCount]= React.useState(CountItems(wishlistItems))

React.useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  setWishListCount(CountItems(wishlistItems));
}, [wishlistItems]);
         
React.useEffect(() => {
  const wishlistItems = localStorage.getItem("wishlistItems");
  if (wishlistItems) {
  setWishlistItems(JSON.parse(wishlistItems));
}
}, []);

 const [products, setProducts] = React.useState([]);

      React.useEffect(() =>{
      //'https://dummyjson.com/products?skip=10'
        fetch(productSource)
        .then(res => res.json())
        .then(data => setProducts(data.products))

        },[productSource])

//all products to get the filters working, and pagination
            const [allProducts, setAllProducts] = React.useState([]);
            
                  React.useEffect(() =>{
                  //'https://dummyjson.com/products?skip=10'
                    fetch('https://dummyjson.com/products?limit=0&skip=0')
                    .then(res => res.json())
                    .then(data => setAllProducts(data.products))
                    },[])
  return (
    //handle user auth
   
      <>
    {/* pass the updated item count to a component, which is displaying it */}
    <Navbar cartCount={cartCount} /*setcartCount={setcartCount} */user={user} setUser={setUser} 
    wishListCount={wishListCount} setWishListCount={setWishListCount} />
    <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      {width < 768 && <Filters products={products} setProducts={setProducts} width={width}
                         allProducts={allProducts} setAllProducts={setAllProducts}
                        source={productSource} setSource={setProductSource}/>}
    </div>

     <div className="main-content">
                <Sort source={productSource} setSource={setProductSource}/>
                {/*Pass the state to update item count, when the added to cart*/}
               {<Product wishlistItems={wishlistItems} setWishlistItems={setWishlistItems}
                        wishListCount={wishListCount} setWishListCount={setWishListCount}
                        products={products} setProducts={setProducts}/>}
                 <Pagination source={productSource} setSource={setProductSource} /*Need to sent number of all products*/numberOfProd={allProducts.length  }/>
                 {/*console.log(products)*/}
      </div>
    {width >= 768 && <Filters products={products} setProducts={setProducts} width={width}
                        allProducts={allProducts} setAllProducts={setAllProducts}
                      source={productSource} setSource={setProductSource}/>}
    
    </div>
      
      {/*</UserContext.Provider>*/}
      </>
  )
}

export default App