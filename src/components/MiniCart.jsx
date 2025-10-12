import React from "react";
import '../styles/Cartstyles.css'
import { Link  } from 'react-router-dom';
import '../App.css';

import { useContext } from 'react'
import { CartContext } from '../components/context/cart'

/*This menu lets user know what items are int cart right now, he can view this menu in the Navbar*/

/** i need to style it for mobile, just grab the mobile styles */
//you need a different cart jsx file accourding to the guide??? one for all these functions, the other for the cart page itself 
/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function MiniCart(props){

   const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, cartCount, CountItems, setcartCount } = useContext(CartContext);

  function closeCartMenu()
  {
    props.SetIsCartMenuOpen(false); 
  }

    return(
        <>
         <div className="mini-container">
          <button className="close-mini-cart-btn" onClick={closeCartMenu}>X</button>
         { <h1 >Cart</h1>}
  
    {cartItems.map((item, index) => (
      <div  key={index}>
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
