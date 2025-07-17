import React from "react";
import {/* createContext*/ useState, useEffect } from 'react';
import '../styles/Cartstyles.css'
import { nanoid } from "nanoid";
import { Link  } from 'react-router-dom';
import '../App.css';

/*This menu lets user know what items are int cart right now, he can view this menu in the Navbar*/

/** i need to style it for mobile, just grab the mobile styles */
//you need a different cart jsx file accourding to the guide??? one for all these functions, the other for the cart page itself 
/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function MiniCart(props){

  const addToCart = (item) => {
    const isItemInCart = props.cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      props.setCartItems(
        props.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      props.setCartItems([...props.cartItems, { ...item, quantity: 1 }]);
    }
    props.setcartCount(prevState => prevState + 1)
  };

  const removeFromCart = (item) => {
    const isItemInCart = props.cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      props.setCartItems(props.cartItems.filter((cartItem) => cartItem.id !== item.id));
      //if (props.cartCount > 0 ) props.setcartCount(prevState => prevState - 1)
    } else {
      props.setCartItems(
        props.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
    props.setcartCount(prevState => prevState - 1)
  };

  const getCartTotal = () => {
    var num = props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    return Math.round((num + Number.EPSILON) * 100) / 100
    //return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }; 
/*
const CountItems = () => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}; */

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(props.cartItems));
    //props.setcartCount(CountItems);
  }, [props.cartItems]);
/*
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      props.setCartItems(JSON.parse(props.cartItems));
    }
  }, []);*/

  function closeCartMenu()
  {
    props.SetIsCartMenuOpen(false); 
  }


    return(
        <>
         <div className="mini-container">
          <button className="close-mini-cart-btn" onClick={closeCartMenu}>X</button>
         { <h1 >Cart</h1>}
  
    {props.cartItems.map((item) => (
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
    props.cartItems.length > 0 ? (
      <div >
    <h1 >Total: ${getCartTotal()}</h1>
    
    <Link to="/cart" className="go-to-cart-link">Open Cart</Link>
  </div>
    ) : (
      <h1 className="text-lg font-bold">Your cart now is empty</h1>
    )
  }
</div>

        </>
    )
}
