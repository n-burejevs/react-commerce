import React from "react";
import Navbar from "../components/Navbar";
import {/* createContext*/ useState, useEffect } from 'react';
import '../styles/Cartstyles.css'
import Sidemenu from "../components/Sidemenu";
import { nanoid } from "nanoid";
import '../App.css';
import { Link  } from 'react-router-dom';
import { checkAuthToken } from '../functions';


//you need a different cart jsx file accourding to the guide??? one for all these functions, the other for the cart page itself 
/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function Cart(){

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

  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const itemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }; 

  const getCartTotal = () => {
    var num = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    return Math.round((num + Number.EPSILON) * 100) / 100
    //return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }; 



  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

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

  
    //Navbar needs a prop to get the cartCount?
    return(
        <>
        <Navbar user={user} setUser={setUser} wishListCount={wishListCount} setWishListCount={setWishListCount} />
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
