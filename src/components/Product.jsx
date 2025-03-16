import React from "react";

export default function Product(props)
{
    const [products, setProducts] = React.useState([]);

      React.useEffect(() =>{
        fetch('https://dummyjson.com/products?skip=10')
        .then(res => res.json())
        .then(data => setProducts(data.products))
        },[])

      React.useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(props.cartItems));
      }, [props.cartItems]);
 
  function addToCart(item){

   
    const isItemInCart = props.cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      
      props.setCartItems(
        props.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );

    } else {
      props.setCartItems([...props.cartItems, { ...item, quantity: 1 }]);
    }
    //update the number in navbar, items in the cart
    props.setcartCount(prevState => prevState + 1)
  };

    return(
        products.map(product => ( 
        <div key={product.id} className="product-card">
            <img className="product-img" src={product.thumbnail} alt={product.title}></img>
            <div className="product-name" >{product.title}</div>
            {/*cartCount*/}
            <p>{/*product.description.slice(0, 40)*/}</p>
            <div className="product-price">${product.price}</div>
            <button className="product-button" onClick={()=>addToCart(product)}>add to cart</button>
        </div>
         ))
    )
}