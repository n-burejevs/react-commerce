import { createContext, useState, useEffect } from 'react'
import {saveWishlistToDB} from '../databaseSync'
import { useCallback } from 'react';

export const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
const [wishlistItems, setWishlistItems] = useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []);

  const CountWishedItems = (array) => {
  return array.reduce((total, item) => total + item.quantity, 0);
}; 
 const [wishListCount, setWishListCount]= useState(CountWishedItems(wishlistItems));

function addTowishlist(item)
{
    let wishListed = false;
    wishListed = wishlistItems.find((w) => w.id === item.id);

    if (wishListed) {
      
      setWishlistItems(
        wishlistItems.map((whisList) =>
          whisList.id === item.id
            ? { ...whisList, quantity: whisList.quantity + 1 }
            : whisList
        )
      );

    } else {
      setWishlistItems([...wishlistItems, { ...item, quantity: 1 }]);
      //console.log(props.wishlistItems);
    }
    //update the number in navbar, items in the cart
    setWishListCount(prevState => prevState + 1)
}

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
    setWishListCount(prevState => prevState - 1)
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

    const getWishListTotal = () => {
    var temp = wishlistItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return Math.round((temp + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setWishListCount(CountWishedItems(wishlistItems));

    handleWishlisttUpdate();
  }, [wishlistItems]);

  useEffect(() => {
    const wishlistItems = localStorage.getItem("wishlistItems");
    if (wishlistItems) {
      setWishlistItems(JSON.parse(wishlistItems));
    }
  }, []);

    const handleWishlisttUpdate = useCallback( () => {
      saveWishlistToDB(wishlistItems);
      //console.log("sending wishlist to db");
    }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addTowishlist,
        removeFromWishlist,
        clearWishlist,
        getWishListTotal,
        wishListCount,
        setWishListCount,
        CountWishedItems,
        setWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};