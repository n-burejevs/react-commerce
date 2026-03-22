import Navbar from "../components/Navbar";
import { useContext } from 'react';
import React from "react";
import { UserContext } from '../components/context/user'
import { CartContext } from "../components/context/cart";
import { WishlistContext } from "../components/context/wishlist";
import Sidemenu from "../components/Sidemenu";
import "../styles/OrderStyle.css"
import { prepareItemsForDB } from "../components/databaseSync";

export default function Checkout()
{
    const { user, setUser} = useContext(UserContext);

     const { cartItems, cartCount } = useContext(CartContext);

  const {wishListCount, setWishListCount} = useContext(WishlistContext);

    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'credit_card'
    });

  function handleSubmit(e)
  {
    e.preventDefault();
    checkOut();
    console.log(formData);
  }
  function handleChange(e)
  {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  
        const [response, setResponse] = React.useState({status: "", message: ""});

          //save ordered cart, so they can be displayed on a page that has not been build YET!
           const checkOut = async () => {
            if(user.name == "")
            {
                //user did not login
            }
            //get id quantity, send to db
           let items = prepareItemsForDB(cartItems);
        
             try{
          const res = await fetch('http://localhost/react-commerce/orders.php', {
              method: 'POST',
              body: JSON.stringify({order_items: items, user_email: user.email, order_email: formData.email,
                                    fullname: formData.fullName, adress: formData.address, city: formData.city,
                                    zipCode: formData.zipCode, paymentMethod: formData.paymentMethod})
            });
        
            /*const results =  */setResponse(await res.json());
            //if response.status === success -> empty cart! and message that order is placed
        console.log(response);
             } catch (error) {
            console.error(error.message);
          }
        
          }
          console.log(user);

          //clear form after order is placed ok
          React.useEffect(()=>{
            if(response.status == "success") 
        {setFormData({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'credit_card'
        })}
          },[response])


    return(
        <>
        <Navbar user={user} setUser={setUser}
                    cartCount={cartCount}
                    wishListCount={wishListCount} setWishListCount={setWishListCount} />
        <div className='main-content-container'>
            
            <div className='sidemenu-filterpane-mobile'> 
                <Sidemenu/>  
            </div>
                <div className="checkout-page">
                    <h1>
                        Checkout page
                    </h1>
                    <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div id="checkout-input-container">
                    <label htmlFor="fullName">Full Name</label>
                    <input className="name-lastname-inputs"
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div id="checkout-input-container">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        className="name-lastname-inputs"
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div id="checkout-input-container">
                    <label htmlFor="address">Shipping Address</label>
                    <textarea 
                        className="name-lastname-inputs"
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div id="checkout-input-container" className="cityzip-code-container">
                    <div className="city-input-container">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required/>
                    </div>
                    <div className="city-input-container">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required/>
                    </div>
                </div>

                <div className="payment-method-container">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </select>
                </div>

                <button type="submit" className="checkout-submit">
                    Place Order
                </button>
                <p>{response.message}</p>
            </form>
        </div>
    
                </div>

        </div>
        </>
    )
}