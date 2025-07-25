import React from "react";
import Navbar from "../components/Navbar";
import Sort from "../components/Sort";
import Product from "../components/Product";
import Sidemenu from "../components/Sidemenu";
import Filters from "../components/Filters";
import { checkAuthToken } from '../functions';
import { useParams } from "react-router-dom";
import Pagination from '../components/Pagination'
import { useContext } from 'react';

import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';

export default function ViewCategory()
{

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, cartCount, CountItems, setcartCount } = useContext(CartContext);
   const {wishlistItems, addTowishlist, removeFromWishlist, clearWishlist, getWishListTotal, wishListCount, setWishListCount, CountWishedItems} = useContext(WishlistContext);
   
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
    
//get name of the category selected, to display whats in it
        let { name } = useParams();
        //console.log("param",useParams());

const [products, setProducts] = React.useState([]);
const [source, setSource] = React.useState(`https://dummyjson.com/products/category/${name}?limit=20`);

    React.useEffect(() =>{
    //'https://dummyjson.com/products?skip=10'
    fetch(`https://dummyjson.com/products/category/${name}?limit=20`)
    .then(res => res.json())
    .then(data => setProducts(data.products))
  },[name])

//all products to get the filters working
const [allProducts, setAllProducts] = React.useState([]);
                    
  React.useEffect(() =>{
  fetch(`https://dummyjson.com/products/category/${name}`)
  .then(res => res.json())
  .then(data => setAllProducts(data.products))
  },[name])

      //get product brands to the filter component?
      /*  const [brands, setBrands] = React.useState([])
      React.useEffect(() =>{
      //'https://dummyjson.com/products?skip=10'
        fetch(`https://dummyjson.com/products/category/${name}`)
        .then(res => res.json())
        .then(data => setBrands(data.products))
        },[name])*/

   //const [pageNumber, SetPageNumber] = React.useState(1);

return(
        <>
        <Navbar cartCount={cartCount} user={user} setUser={setUser}
        wishListCount={wishListCount} setWishListCount={setWishListCount}
         />

        <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      {width < 768 && <Filters products={products} setProducts={setProducts} width={width}
                          allProducts={allProducts} setAllProducts={setAllProducts}
                          source={source} setSource={setSource}/>}
    </div>

     <div className="main-content">

                {<Sort source={source} setSource={setSource} products={products} setProducts={setProducts} />}
                {/*Pass the state to update item count, when added to cart*/}
                <Product products={products} setProducts={setProducts}
                  /*pageNumber={pageNumber}*//>

                 {<Pagination source={source} setSource={setSource} numberOfProd={allProducts.length }
                              /*pageNumber={pageNumber} SetPageNumber={SetPageNumber}*//> }
      </div>
    {width >= 768 && <Filters products={products} setProducts={setProducts} width={width}
                      allProducts={allProducts} setAllProducts={setAllProducts}
                      source={source} setSource={setSource}/>}
    
    </div>
        </>
    )
}
