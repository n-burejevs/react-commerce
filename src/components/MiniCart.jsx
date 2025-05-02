import React from "react";
import Navbar from "../components/Navbar";
import {/* createContext*/ useState, useEffect } from 'react';
import '../styles/Cartstyles.css'
import { nanoid } from "nanoid";
import { Link  } from 'react-router-dom';
import '../App.css';
/** i need to style it for mobile, just grab the mobile styles */
//you need a different cart jsx file accourding to the guide??? one for all these functions, the other for the cart page itself 
/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function MiniCart(props){

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
      props.setcartCount(prevState => prevState + 1)
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      props.setcartCount(prevState => prevState + 1)
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      if (props.cartCount > 0 ) props.setcartCount(prevState => prevState - 1)
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
      if (props.cartCount > 0 ) props.setcartCount(prevState => prevState - 1)
    }
  };
/*
  const clearCart = () => {
    setCartItems([]);
  };
  const itemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }; */

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

  function closeCartMenu()
  {
    props.SetIsCartMenuOpen(false); 
  }


    return(
        <>
         <div className="mini-container">
          <button className="close-mini-cart-btn" onClick={closeCartMenu}>X</button>
         { <h1 >Cart</h1>}
  
    {cartItems.map((item) => (
      <div  key={nanoid()}>
         <p className="mini-cart-item-title"> <Link to={`/viewproduct/${item.id}`} className="product-link" > {item.title } </Link></p>
        <div className="mini-cart-item-container">
          
        
     
        <Link to={`/viewproduct/${item.id}`}  > <img className="mini-cart-item-img" src={item.thumbnail} alt={item.title}  /> </Link>
          
            
            <p className="mini-cart-item-data">Price:
              <br/> {item.price}</p>
          
          <div className="mini-cart-add-remove-container">
          <button className="mini-cart-plsu-minus-btn"
            onClick={() => {
              addToCart(item)
            }}
          >
            +
          </button>
          <p className="mini-cart-item-quantity">{item.quantity}</p>
          <button className="mini-cart-plsu-minus-btn"
            onClick={() => {
              removeFromCart(item)
            }}
          >
            -
          </button>
          
        </div>
        
        </div>
       
      </div>
    ))}
  
  {
    cartItems.length > 0 ? (
      <div >
    <h1 >Total: ${getCartTotal()}</h1>
  
{ /*   <button
      onClick={() => {
        clearCart()
      }}
    >
      Clear cart
    </button>
    */}
    
    <button><Link to="/cart" className="cart-img">Open Cart</Link></button>
  </div>
    ) : (
      <h1 className="text-lg font-bold">Your cart now is empty</h1>
    )
  }
</div>

        </>
    )
}
