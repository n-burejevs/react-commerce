import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidemenu from './components/Sidemenu'
import Filters from './components/Filters'
import Product from "./components/Product";
import Sort from "./components/Sort";
import Pagination from './components/Pagination'
import { useContext } from 'react'
import { CartContext } from './components/context/cart'
import { WishlistContext } from './components/context/wishlist'
import { UserContext } from './components/context/user'

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
// + //cartItems wishlist states were everywhere(duplicated code! almost in every page/component),
//  together with UseEffects. moved to separate files and using context now
// + //check if logged in in navbars account management div, greet user and have and option to logout, go to account settings
// + //user state is in context
// + ///have logged in users cart saved in database -> after loggin the cart/wish lists get sync-ed up

//TO DO:

//useNavigate for redirects?
//User account page
//price slider(MultiRangeSlider) in Filters! (get price values from props. find min max, but how to filter by price then?)
//code clean up(commented out), remove unused props?
//user password restore (PHP password_verify() forgot password example) https://www.phpmentoring.org/blog/php-password-verify-function#:~:text=The%20Password_Verify()%20function%20is,true%2C%20otherwise%20it%20returns%20false.
//finish category hover menu styling and get links from https://dummyjson.com/docs/products#products-category
//links for pages in pagination.jsx need to be a state, so i can update it, based on number of products(after filtered out)
//add categories(more)
//add discount & deals page (just add some -% off some random items)
//To DO; https://www.w3schools.com/howto/howto_css_breadcrumbs.asp


//BUGS:
//0/ only one brand at the time is filtered
//1/ open mini cart menu in the navbar, add an item (press + button)
//and click somewhere outside of cart menu. the menu should close by itself, but it does not
//does sth happen with ref={} after the MiniCart re-renders?
//3/arrow buttons in single product dont work on mobile, but swipping left/right does
//5/error happens when undefined category is selected from navigation in Sidemenu and when there are products in the cart(localstorage)
//6/Filter component gets rendered 3(5???) times? 
//8/ context/user error/bug
// [vite] (client) hmr invalidate /src/components/context/user.jsx 
// Could not Fast Refresh ("UserContext" export is incompatible).
//  Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
//9/ filtering by brand "other" doesnt show anything
//10/ what happens if all items are deleted from cart? will it have an empty "array" in db records?

//Other:
//filters were not submited by checking checkboxes, thats why there is no data passed to handeler functions,
// but there is a way to dispatch an event and submit

function App() {

  const {cartCount } = useContext(CartContext);
  const {wishListCount, setWishListCount} = useContext(WishlistContext);
  const { user, setUser} = useContext(UserContext);

                                                            ///'https://dummyjson.com/products?limit=10&skip=10'
  const [productSource, setProductSource] = React.useState("https://dummyjson.com/products?limit=0&skip=0")
                                                            
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

  //products to show at once, picking 20 out of allProducts state in Pagination component
 const [products, setProducts] = React.useState([]);

//all products to get the filters working, and pagination
            const [allProducts, setAllProducts] = React.useState([]);
            
                  React.useEffect(() =>{
                  //'https://dummyjson.com/products?skip=10'
                    fetch(productSource)
                    .then(res => res.json())
                    .then(data => setAllProducts(data.products))
                    },[])
  return (
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
                <Sort source={productSource} setSource={setProductSource}
                 products={products} setProducts={setProducts}
                allProducts={allProducts} setAllProducts={setAllProducts}/>
                {/*Pass the state to update item count, when the added to cart*/}
               {<Product products={products} setProducts={setProducts}
               
                />}
                 <Pagination source={productSource} setSource={setProductSource} /*Need to sent number of all products*/numberOfProd={allProducts.length}
                  allProducts={allProducts} setAllProducts={setAllProducts}  products={products} setProducts={setProducts}
                  />
                 {/*console.log(products)*/}
      </div>
    {width >= 768 && <Filters products={products} setProducts={setProducts} width={width}
                        allProducts={allProducts} setAllProducts={setAllProducts}
                      source={productSource} setSource={setProductSource}/>}
    
    </div>
      
      </>
  )
}

export default App