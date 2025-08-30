import React from "react";
import { Link  } from 'react-router-dom';
import wishlist_icon from '../assets/wishlist.png';

import { useContext } from 'react'
import { CartContext } from '../components/context/cart'
import { WishlistContext } from '../components/context/wishlist';


export default function Product(props)
{ 
  const { addToCart } = useContext(CartContext);
  
  const { addTowishlist } = useContext(WishlistContext);
  
    return(
      <>
        {/*console.log("rendered")*/}
      {  props.products.map((product) => (
        
          <div key={product.id} className="product-card">      
           <Link to={`/viewproduct/${product.id}`} className="product-link" > 
                    <img className="product-img" loading="lazy" src={product.thumbnail} alt={product.title}></img>
            </Link>
           

           <Link to={`/viewproduct/${product.id}`} className="product-link" > 
               {product.title}
            </Link>
          
            <div className="product-price">${product.price}</div>     
            <div>
            <button className="product-button" onClick={()=>addToCart(product)}>add to cart</button>
            
            <img className="wishlist-button-img" src={wishlist_icon} onClick={()=>addTowishlist(product)}></img>
            </div>    

        </div>
            
         )
        ) }
     
      </>


    )
}