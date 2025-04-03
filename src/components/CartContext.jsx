import React, { createContext, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
 const [cartItemsNew, setCartItemsNew] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const addToCartNew = (item) => {
    const isItemInCart = cartItemsNew.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItemsNew(
        cartItemsNew.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItemsNew([...cartItemsNew, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCartNew = (item) => {
    const isItemInCart = cartItemsNew.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItemsNew(cartItemsNew.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItemsNew(
        cartItemsNew.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItemsNew([]);
  };
  const itemsCount = () => {
    return cartItemsNew.reduce((total, item) => total + item.quantity, 0);
  }; 

  const getCartTotal = () => {
    return cartItemsNew.reduce((total, item) => total + item.price * item.quantity, 0);
  }; 



  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItemsNew));
  }, [cartItemsNew]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItemsNew(JSON.parse(cartItems));
    }
  }, []);





 const providerValue = {cartItemsNew, addToCartNew, removeFromCartNew, itemsCount, clearCart, getCartTotal}
  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  );
};

export default { CartProvider, CartContext };