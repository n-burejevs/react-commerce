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
// + //Wishlist is added, user can add items to the wishlist, view them on .../wishlist

//TO DO:
//Pagination logic to display legitimate number of pages based on number of items in products state(numberOfPages={products.length} 
//                                                                          products needs to be full products, not limited by '20')
//Add sort to ViewCategory.jsx https://dummyjson.com/products/category/laptops?limit=20&sortBy=price&order=asc
               //example ->    https://dummyjson.com/products/category/laptops?limit=20 - add the missing sort part?
//login, logout api(on all pages), user password restore (PHP password_verify() forgot password example) https://www.phpmentoring.org/blog/php-password-verify-function#:~:text=The%20Password_Verify()%20function%20is,true%2C%20otherwise%20it%20returns%20false.
//useEffect to check cookies? user is logged in and so on... have to check cookies and set the user on every page? navbar recieves props.user from every page

//check if logged in in navbars account management div, greet user and have and option to logout, go to account settings
//finish category hover menu styling and get links from https://dummyjson.com/docs/products#products-category
//filters!: e. g. brand
//filters are not submited by checking checkboxes, thats why there is no data passed to handeler functions
//RE-DO cartItems/wishlistItems states are used everywhere(duplicated code! almost in every page/component),
//  together with UseEffects to update/get state on change and addToCart addToWishList functions!

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
//make sure loggied in user cant register again? check if email is taken or not!!!!!!
//remove old commented-out code?

//BUGS:
//Fixed/adding to cart from miniCart menu does not update cartCount in Navbar - 
//1/ open mini cart menu in the navbar, add an item (press + button)
//and click somewhere outside of cart menu. the menu should close by itself, but it does not
//2/does sth happen with ref={} after the MiniCart re-renders?
//3/Filters and pagination components are rendered 3 times?


//4/arrow buttons in single product dont work on mobile, but swipping left/right does

//5/Pagination and Sort are not desingned to work together, yet(maybe add sort query to source url string? or finally get products from a db?? )
//!!!
//6/error happens when undefined category is selected from navigation in Sidemenu and when there are products in the cart(localstorage)
//7/Filter component gets rendered 3 times? 

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
   
const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);

const CountItems = (array) => {
  return array.reduce((total, item) => total + item.quantity, 0);
}; 
 const [cartCount, setcartCount ]= React.useState(CountItems(cartItems));

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
        //console.log(allProducts);
  return (
    //handle user auth
   
      <>
       {/*<UserContext.Provider value={{ user, login, logout }}>*/}
    {/* pass the updated item count to a component, which is displaying it */}
    <Navbar cartCount={cartCount} setcartCount={setcartCount} user={user} setUser={setUser} 
    wishListCount={wishListCount} setWishListCount={setWishListCount}
    cartItems={cartItems} setCartItems={setCartItems} />
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
               {<Product cartCount={cartCount} setcartCount={setcartCount}
                         cartItems={cartItems} setCartItems={setCartItems}
                        /*source={productSource} */
                        wishlistItems={wishlistItems} setWishlistItems={setWishlistItems}
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