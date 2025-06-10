import React from "react";
import Navbar from "../components/Navbar";
import {/* createContext*/ useState, useEffect } from 'react';
import '../styles/Cartstyles.css'
import Sidemenu from "../components/Sidemenu";
import { nanoid } from "nanoid";
import '../App.css';
import { Link  } from 'react-router-dom';
import { checkAuthToken } from '../functions';
import cart from '../assets/cart.png';

//This is a copy from Cart.jsx adjusted for wishlist, i figure the functionality is about the same, except,
//you should be able do add items from this list to Cart,
// which should be easily done with addToCart function and sent, and kept in localstorage
/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function Wishlist(){

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
  const CountItems = () => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}; 
  const [cartCount, setcartCount ]= React.useState(CountItems);
  
//console.log(cartItems);
   const [wishlistItems, setWishlistItems] = useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
//console.log(wishlistItems);
  const addToWishList = (item) => {
    const isItemInWishlist = wishlistItems.find((wishedItem) => wishedItem.id === item.id);

    if (isItemInWishlist) {
      setWishlistItems(
        wishlistItems.map((wishedItem) =>
          wishedItem.id === item.id
            ? { ...wishedItem, quantity: wishedItem.quantity + 1 }
            : wishedItem
        )
      );
    } else {
      setWishlistItems([...wishlistItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromWishlist = (item) => {
    const isItemInWishList = wishlistItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInWishList.quantity === 1) {
      setWishlistItems(wishlistItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setWishlistItems(
        wishlistItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };
  const itemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }; 

  const getCartTotal = () => {
    var num = wishlistItems.reduce((total, item) => total + item.price * item.quantity, 0)
    return Math.round((num + Number.EPSILON) * 100) / 100
    //return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }; 



  React.useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  React.useEffect(() => {
    const wishlistItems = localStorage.getItem("wishlistItems");
    if (wishlistItems) {
      setWishlistItems(JSON.parse(wishlistItems));
    }
  }, []);

   React.useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
  
    React.useEffect(() => {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        setCartItems(JSON.parse(cartItems));
      }
    }, []);

    //user can take an item from wishlist and add it to cart
    function addToCart(item){
    console.log(item);
    let isItemInCart = false;
   try{
    isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
   }
    catch(e) {
      console.log(e.message)
    }

    if (isItemInCart) {
      
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );

    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    //update the number in navbar, items in the cart
    setcartCount(cartItems.quantity + item.quantity)
  };

  
    //Navbar needs a prop to get the cartCount?
    return(
        <>
        <Navbar user={user} setUser={setUser} cartCount={itemsCount()} 
        setcartCount={setcartCount} cartItems={cartItems} setCartItems={setCartItems} />
      <div className="cart-page-container">

       
       <Sidemenu/>



         <div className="cart-list-container">
         <h1 >Wishlist</h1>
  <div>
    {wishlistItems.map((item) => (
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
              addToWishList(item)
            }}
          >
            +
          </button>
          <p className="cart-item-quantity">{item.quantity}</p>
          <button className="cart-plsu-minus-btn"
            onClick={() => {
              removeFromWishlist(item)
            }}
          >
            -
          </button>
{/*add to cart from wishlist*/}
                    <button className="wishlist-to-cart-btn"
            onClick={() => {
              addToCart(item)
            }}
          >
            <img className="add-to-cart-from-wishlist-img" src={cart} alt="add to cart"/>
          </button>
          
        </div>
        <div className="cart-item-total">Total:{Math.round((item.quantity * item.price + Number.EPSILON) * 100) / 100}</div>
        </div>
       
      </div>
    ))}
  </div>
  {
    wishlistItems.length > 0 ? (
      <div >
    <h1 >Total: ${getCartTotal()}</h1>
    <button
      onClick={() => {
        clearWishlist()
      }}
    >
      Clear wishlist
    </button>
  </div>
    ) : (
      <h1 className="text-lg font-bold">Your wishlist now is empty</h1>
    )
  }
</div>
</div>
        </>
    )
}
