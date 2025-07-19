import React from "react";
import Navbar from "../components/Navbar";
//import {/* createContext*/ useState, useEffect } from 'react';
import '../styles/Cartstyles.css'
import Sidemenu from "../components/Sidemenu";
import { nanoid } from "nanoid";
import '../App.css';
import { Link  } from 'react-router-dom';
import { checkAuthToken } from '../functions';

import { useContext } from 'react';
import { CartContext } from '../components/context/cart';

/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function Cart(){

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

  const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
          
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
  
    //Navbar needs a prop to get the cartCount?
    return(
        <>
        <Navbar cartCount={cartCount}
        user={user} setUser={setUser} 
        wishListCount={wishListCount} setWishListCount={setWishListCount}
        cartItems={cartItems} /*setCartItems={setCartItems} *//>
      <div className="cart-page-container">

       
       <Sidemenu/>



         <div className="cart-list-container">
         <h1 >Cart</h1>
  <div>
    {cartItems.map((item) => (
      <div  key={nanoid()}>
         <p className="cart-item-title">   <Link to={`/viewproduct/${item.id}`}> {item.title}</Link></p>
        <div className="item-container">
        <Link to={`/viewproduct/${item.id}`}>
        <img className="cart-item-img" src={item.thumbnail} alt={item.title}  /> 
        </Link>
          <div className="cart-item-data" >
            
            <p >Price: {item.price}</p>
          </div>
          <div className="add-remove-container">
          <button className="cart-plsu-minus-btn"
            onClick={() => {
              addToCart(item)
            }}
          >
            +
          </button>
          <p className="cart-item-quantity">{item.quantity}</p>
          <button className="cart-plsu-minus-btn"
            onClick={() => {
              removeFromCart(item)
            }}
          >
            -
          </button>
          
        </div>
        <div className="cart-item-total">Total:{Math.round((item.quantity * item.price + Number.EPSILON) * 100) / 100}</div>
        </div>
       
      </div>
    ))}
  </div>
  {
    cartItems.length > 0 ? (
      <div >
    <h1 >Total: ${getCartTotal()}</h1>
    <button
      onClick={() => {
        clearCart()
      }}
    >
      Clear cart
    </button>
  </div>
    ) : (
      <h1 className="text-lg font-bold">Your cart now is empty</h1>
    )
  }
</div>
</div>
        </>
    )
}
