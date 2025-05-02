import React from "react";
import { nanoid } from "nanoid";
import { Link  } from 'react-router-dom';
import wishlist_icon from '../assets/wishlist.png';

//Loading times are insanely slow!!! check in network tab in dev tools!

export default function Product(props)
{ 
    //const dispatch = useDispatch()
    console.log(props.source)

    const [products, setProducts] = React.useState([]);

      React.useEffect(() =>{
        fetch(/*'https://dummyjson.com/products?skip=10'*/props.source)
        .then(res => res.json())
        .then(data => setProducts(data.products))
        },[props.source])

      React.useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(props.cartItems));
      }, [props.cartItems]);
 
  function addToCart(item){
    console.log(item);
    let isItemInCart = false;
   try{
    isItemInCart = props.cartItems.find((cartItem) => cartItem.id === item.id);
   }
    catch(e) {
      console.log(e.message)
    }

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
  function addTowishlist(product)
  {
    console.log(product);
  }

    return(
      <>
      {  products.map(product => ( 
        <div key={nanoid()} className="product-card">      
           <Link to={`/viewproduct/${product.id}`} className="product-link" > 
                    <img className="product-img" loading="lazy" src={product.thumbnail} alt={product.title}></img>
            </Link>
           

           <Link to={`/viewproduct/${product.id}`} className="product-link" > 
      {product.title }
   </Link>
           
            <p>{/*product.description.slice(0, 40)*/}</p>
            <div className="product-price">${product.price}</div>     
            <div>
            <button className="product-button" onClick={()=>addToCart(product)}>add to cart</button>
            
            <img className={"wishlist-button-img"} src={wishlist_icon} onClick={()=>addTowishlist(product)}></img>
            </div>    

        </div>
         )
        ) }
     
      </>


    )
}