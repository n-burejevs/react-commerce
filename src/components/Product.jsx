import React from "react";
//import image from '../assets/prod-img.png'
import { nanoid } from "nanoid";


export default function Product()
{
    const [products, setProducts] = React.useState([]);

    async function getProducts() {
        const response = await fetch('https://dummyjson.com/products')  // fetch the products
        const data = await response.json() // convert the response to json
        setProducts(data.products) // set the products in the state to the products we fetched
      }

      React.useEffect(() => {
        getProducts()
      }, [])
/*
  const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

      React.useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);



       const [cartCount, setcartCount ]= React.useState(CountItems())
      
            React.useEffect(() => {
             
              console.log(cartCount)
            }, [cartCount])
      
            function CountItems(){
              let items = 0
             for(let i=0; i<cartItems.length; i++) 
             {
              items = items + cartItems[i].quantity;
             }
             
            return items;
            }  */
 
  function addToCart(item){
    /*console.log(cartItems);
    console.log(item)*/
    //setcartCount(CountItems());
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
   // console.log(cartItems);
  };

    //use nanoid id to be able to add product to cart?
    return(
        products.map(product => ( 
        <div key={product.id} className="product-card">
            <img className="product-img" src={product.thumbnail} alt={product.title}></img>
            <div className="product-name" >{product.title}</div>
            
            <p>{product.description.slice(0, 40)}...</p>
            <div className="product-price">${product.price}</div>
            <button className="product-button" onClick={()=>addToCart(product)}>add to cart</button>
        </div>
         ))
    )
}