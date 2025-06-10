import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { nanoid } from "nanoid";
import '../App.css'
import '../styles/Sldieshow.css'
import Sidemenu from '../components/Sidemenu';
import Slideshow from "../components/Slideshow";
import { checkAuthToken } from '../functions';
/* This page needs styling*/
export default function SingleProduct(){
       
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


    const [cartItems, setCartItems] = React.useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    
    //const { count } = useLocation().state;

    const itemsCount = () => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    }; 

    const [cartCount, setcartCount ]= React.useState(itemsCount)

    const [ singleProduct, SetSingleProduct] = React.useState([]);
   
    let { id } = useParams(); 

    React.useEffect(() => {
    // search a single product
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => SetSingleProduct(data)); 
        
    },[id]);

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


       React.useEffect(() => {
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              /*Why do i need this?*/localStorage.setItem("cartCount", itemsCount);
              setcartCount(itemsCount);
            }, [cartItems]);

const [wishlistItems, setWishlistItems] = React.useState(localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [])
                    
const CountWishedItems = () => {
  return wishlistItems.reduce((total, item) => total + item.quantity, 0);
}; 
  const [wishListCount, setWishListCount]= React.useState(CountWishedItems)
         
  React.useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setWishListCount(CountWishedItems);
    }, [wishlistItems]);
                     
    React.useEffect(() => {
       const wishlistItems = localStorage.getItem("wishlistItems");
        if (wishlistItems) {
         setWishlistItems(JSON.parse(wishlistItems));
            }
            }, []);
            
            
            
            
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

    return(
        <div key={nanoid()} className='main-content-container'>
            <Navbar cartCount={cartCount} user={user} setUser={setUser}
             wishListCount={wishListCount} setWishListCount={setWishListCount} />

        <div className='sidemenu-filterpane-mobile'> <Sidemenu />  
                        </div>
        
        <div key={singleProduct.id} className="single-product-view">
        
        <h3 key={nanoid()}>{singleProduct.title}</h3>
     
        <div key={nanoid()}>
          {}
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
        <button key={nanoid()} onClick={()=>addToCart(singleProduct)}>Add to cart</button>
         <button key={nanoid()} onClick={()=>addTowishlist(singleProduct)}>Add to wishlist</button>
        </div>
        
        {/*console.log(props.cartItems)*/}
        </div>
    
    )
}