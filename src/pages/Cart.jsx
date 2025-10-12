import React from "react";
import Navbar from "../components/Navbar";
import '../styles/Cartstyles.css'
import Sidemenu from "../components/Sidemenu";
import '../App.css';
import { Link  } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'

/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function Cart(){

        const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, cartCount } = useContext(CartContext);

        const { wishListCount, setWishListCount } = useContext(WishlistContext);

        const { user, setUser} = useContext(UserContext);
  
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
    {cartItems.map((item, index) => (
      <div  key={index}>
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
      <div className="cart-wishlist-total-section">
    <h1 >Total: ${getCartTotal()}</h1>
    <button className="clear-cart-btn"
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
