import React from "react";
import Navbar from "../components/Navbar";
import '../styles/Cartstyles.css'
import Sidemenu from "../components/Sidemenu";
import { nanoid } from "nanoid";
import '../App.css';
import { Link  } from 'react-router-dom';
import { checkAuthToken } from '../functions';
import cart from '../assets/cart.png';
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';

/*Source:
https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f*/
export default function Wishlist(){

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
  
    return(
        <>
        <Navbar user={user} setUser={setUser} cartCount={cartCount} 
                 wishListCount={wishListCount}
        setcartCount={setcartCount}  />
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
              addTowishlist(item)
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
    <h1 >Total: ${getWishListTotal()}</h1>
    <button className="clear-wishlist-btn"
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
