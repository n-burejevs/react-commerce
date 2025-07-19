import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
//import { nanoid } from "nanoid";
import '../App.css'
import '../styles/Sldieshow.css'
import Sidemenu from '../components/Sidemenu';
import Slideshow from "../components/Slideshow";
import { checkAuthToken } from '../functions';

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';

/* This page needs styling*/
export default function SingleProduct(){
       
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, cartCount, CountItems, setcartCount } = useContext(CartContext);

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

    const itemsCount = (array) => {
      return array.reduce((total, item) => total + item.quantity, 0);
    }; 

    const [singleProduct, SetSingleProduct] = React.useState([]);
   
    let { id } = useParams(); 

    React.useEffect(() => {
    // search for a single product
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => SetSingleProduct(data)); 
        
    },[id]);

const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
                    
  const [wishListCount, setWishListCount]= React.useState(itemsCount(wishlistItems))
         
  React.useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setWishListCount(itemsCount(wishlistItems));
    }, [wishlistItems]);
                     
    React.useEffect(() => {
       const wishlistItems = localStorage.getItem("wishlistItems");
        if (wishlistItems) {
         setWishlistItems(JSON.parse(wishlistItems));
            }
            }, []);
              
            
function addTowishlist(item)
  {
    let wishListed = false;
    wishListed = wishlistItems.find((w) => w.id === item.id);

    if (wishListed) {
      
      setWishlistItems(
        wishlistItems.map((whisList) =>
          whisList.id === item.id
            ? { ...whisList, quantity: whisList.quantity + 1 }
            : whisList
        )
      );

    } else {
      setWishlistItems([...wishlistItems, { ...item, quantity: 1 }]);
      //console.log(props.wishlistItems);
    }
    //update the number in navbar, items in the cart
    setWishListCount(prevState => prevState + 1)
  }       

    return(
  <div  className='main-content-container'>
            <Navbar user={user} setUser={setUser}
             wishListCount={wishListCount} setWishListCount={setWishListCount}
            cartCount={cartCount} />

        <div className='sidemenu-filterpane-mobile'> <Sidemenu /> </div>
        
<div  className="single-product-view">
        
        
     
        <div >
         <div className="single-prod-title"><h3 >{singleProduct.title}</h3></div>
        {singleProduct.images ? /*singleProduct.images.map(img=><img key={nanoid()} className="single-prod-img" src={img}></img>) :
         "Error loading images"*/
         <Slideshow images = {singleProduct.images}/> : "Error loading images"
        }
         {/*<Slideshow images = {singleProduct.images} />*/}
        </div>
      <div className="product-data">

        <div className="single-prod-desc">{singleProduct.description}</div>
        <div className="single-prod-price" >Price: {singleProduct.price}</div>
        <div >Items in stock: {singleProduct.stock}</div>
        <div className="single-prod-brandname">Brand: {singleProduct.brand}</div>
        <div className="single-prod-button-container">
          <button  onClick={()=>addToCart(singleProduct)}>Add to cart</button>
            <button onClick={()=>addTowishlist(singleProduct)}>Add to wishlist</button>
        </div>
      </div>

</div>
        
        {/*console.log(props.cartItems)*/}
  </div>
    
    )
}