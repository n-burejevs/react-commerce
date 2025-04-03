import React from "react";
import { nanoid } from "nanoid";
import { Link  } from 'react-router-dom';
//import { /*useSelector,*/ useDispatch } from 'react-redux'
//import { addToCart } from '../features/cart/cartSlice'

//import SingleProduct from "../pages/SingleProduct";

export default function Product(props)
{ 
    //const dispatch = useDispatch()
    //console.log(props)

    const [products, setProducts] = React.useState([]);
    //const [showItem, SetShowItem] = React.useState(false);
    //const [itemId, setItemId] = React.useState();

      React.useEffect(() =>{
        fetch('https://dummyjson.com/products?skip=10')
        .then(res => res.json())
        .then(data => setProducts(data.products))
        },[])

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

    return(
      <>
      {/*showItem && <SingleProduct itemId={itemId} showItem={showItem} SetShowItem={SetShowItem}  />*/}
      {  products.map(product => ( 
        <div key={nanoid()} className="product-card">      
           
           <img className="product-img" src={product.thumbnail} alt={product.title}></img>

           <Link to={`/viewproduct/${product.id}`} className="product-link" 
state={{count: props.cartCount, /*cartItems: JSON.stringify(props.cartItems)*/ width: props.width, /*setCartItems: props.setCartItems*/}}  > 
      {product.title }
   </Link>
           {/*<div className="product-name" id={product.id} onClick={()=>displaySingleItem(event)} >{product.title}  </div>*/}
           
            <p>{/*product.description.slice(0, 40)*/}</p>
            <div className="product-price">${product.price}</div>         
            <button className="product-button" onClick={()=>addToCart(product)}>add to cart</button>
        </div>
         )
        ) }
     
      </>


    )
}//onClick={()=>addToCart(product)
//onClick={() => dispatch(addToCart(product))}

//<Link to={`/viewproduct/${product.id}`} className="product-link" 
// state={{count: props.cartCount, /*cartItems: JSON.stringify(props.cartItems)*/ width: props.width, /*setCartItems: props.setCartItems*/}}  > 
//   </Link>