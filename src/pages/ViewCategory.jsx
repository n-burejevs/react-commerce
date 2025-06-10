import React from "react";
import Navbar from "../components/Navbar";
import Sort from "../components/Sort";
import Product from "../components/Product";
import Sidemenu from "../components/Sidemenu";
import Filters from "../components/Filters";
import { checkAuthToken } from '../functions';
import { useParams } from "react-router-dom";

export default function ViewCategory()
{
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
    
       //const [products, setProducts] = React.useState([]);

       const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

       const CountItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      }; 

      const [cartCount, setcartCount ]= React.useState(CountItems)

        let { name } = useParams();
        //console.log("param",useParams());
       
        

        /* fetch(`https://dummyjson.com/products/category/${categoryName}?limit=20&skip=10`)
        .then(res => res.json())
        .then(data => setProducts(data.products));*/

const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
        
const CountWishedItems = () => {
    return wishlistItems.reduce((total, item) => total + item.quantity, 0);
}; 
const [wishListCount, setWishListCount]= React.useState(CountWishedItems)

React.useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  setWishListCount(CountWishedItems);
}, [wishlistItems]);
         
React.useEffect(() => {
  const wishlistItems = localStorage.getItem("wishlistItems");
  if (wishlistItems) {
  setWishlistItems(JSON.parse(wishlistItems));
}
}, []);

return(
        <>
        <Navbar cartCount={CountItems()} setcartCount={setcartCount} user={user} setUser={setUser}
        wishListCount={wishListCount} setWishListCount={setWishListCount} />


        <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      {width < 768 && <Filters/>}
    </div>

     <div className="main-content">
                {/*<Sort source={productSource} setSource={setProductSource}/>*/}
                {/*Pass the state to update item count, when the added to cart*/}
                <Product setcartCount={setcartCount} cartItems={cartItems} setCartItems={setCartItems}
                 cartCount={cartCount} source={`https://dummyjson.com/products/category/${name}?limit=20`}
                 wishListCount={wishListCount} setWishListCount={setWishListCount} 
                 wishlistItems={wishlistItems} setWishlistItems={setWishlistItems}/>
                 {/*<Pagination source={productSource} setSource={setProductSource}/>*/}
      </div>
    {width >= 768 && <Filters/>}
    
    </div>
        </>
    )
}
