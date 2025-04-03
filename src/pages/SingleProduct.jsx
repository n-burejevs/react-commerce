import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { nanoid } from "nanoid";
import '../App.css'
import '../styles/Sldieshow.css'
import Sidemenu from '../components/Sidemenu';
import Slideshow from "../components/slideshow";

export default function SingleProduct(){
       
    const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
   
    const { count } = useLocation().state;
    const [cartCount, setcartCount ]= React.useState(count)

    const [ singleProduct, SetSingleProduct] = React.useState([]);

    let { id } = useParams(); 

    React.useEffect(() => {
    // search a single product
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => SetSingleProduct(data)); 
    },[]);

     //console.log(singleProduct)
     //window.history.replaceState({}, '')

    /*const location = useLocation()
    const { count } = location.state;*/

    const addToCart = (item) => {
       // console.log(cartItems);
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

      const itemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      }; 

       React.useEffect(() => {
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              localStorage.setItem("cartCount", itemsCount);
              setcartCount(itemsCount);
            }, [cartItems]);

    return(
        <div key={nanoid()} className='main-content-container'>
            <Navbar cartCount={cartCount} />
            <Sidemenu/>
        
        <div key={singleProduct.id} className="single-product-view">
        
        <h3 key={nanoid()}>{singleProduct.title}</h3>
     
        <div key={nanoid()}>
          
        {singleProduct.images ? /*singleProduct.images.map(img=><img key={nanoid()} className="single-prod-img" src={img}></img>) :
         "Error loading images"*/
         <Slideshow images ={singleProduct.images}/> : "Error loading images"
        }
         {/*<Slideshow images = {singleProduct.images} />*/}
        </div>

        <div key={nanoid()}>{singleProduct.description}</div>
        <div key={nanoid()}>{singleProduct.price}</div>
        <div key={nanoid()}>{singleProduct.stock}</div>
        <div key={nanoid()}>{singleProduct.brand}</div>
        <button key={nanoid()} onClick={()=>addToCart(singleProduct)}> Add to cart </button>
        </div>
        
        {/*console.log(props.cartItems)*/}
        </div>
    
    )
}