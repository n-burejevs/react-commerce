import { createContext, useState, useEffect } from 'react'
///import {saveCartToDB} from '.../hooks/databaseSync.js'
import {saveCartToDB} from '../databaseSync'
import { useCallback } from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const CountItems = (array) => {
  return array.reduce((total, item) => total + item.quantity, 0);
}; 
 const [cartCount, setcartCount ]= useState(CountItems(cartItems));

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

  const getCartTotal = () => {
    var temp = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return Math.round((temp + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setcartCount(CountItems(cartItems));
    //console.log("cart",cartItems);
    //run update on change, if logged in
 //problem: on login, the cart state gets updated with data from db
 //updating state will trigger the saving to db
  //what if i delay this function? 
/*  setTimeout(() => {
  saveCartToDB(cartItems);console.log("sending cart to db");
}, 3000);*/
//other option is to have a useCallback?

    handleCartUpdate()

  }, [cartItems]);

  const handleCartUpdate = useCallback( () => {
    saveCartToDB(cartItems);
   // console.log("sending cart to db");
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        cartCount,
        setcartCount,
        CountItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
