import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../App.css'
import '../styles/Sldieshow.css'
import '../styles/CartStyles.css'
import Sidemenu from '../components/Sidemenu';
import Slideshow from "../components/Slideshow";
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'

/* This page needs styling*/
export default function SingleProduct(){
       
    const { addToCart, cartCount } = useContext(CartContext);
    
    const { addTowishlist, wishListCount, setWishListCount } = useContext(WishlistContext);
    
    const { user, setUser} = useContext(UserContext);

    const [singleProduct, SetSingleProduct] = React.useState([]);
   
    let { id } = useParams(); 

    React.useEffect(() => {
    // search for a single product
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => SetSingleProduct(data)); 
        
    },[id]);

    const printStars = (num) =>
    {
      let array = [];

      for (let i=0; i< 5; i++)
      {
        if(i<num) array.push(<span key={i}>★</span>)
          else array.push(<span key={i}>☆</span>)
      }
      return array
    }

    return(
  <div  className='main-content-container'>
            <Navbar user={user} setUser={setUser}
             wishListCount={wishListCount} setWishListCount={setWishListCount}
            cartCount={cartCount} />

        <div className='sidemenu-filterpane-mobile'> <Sidemenu /> </div>
    <div className="single-product-and-review-container"> 
      <div className="single-product-view">
        
        <div >
         <div className="single-prod-title"><h3 >{singleProduct.title}</h3></div>
        {singleProduct.images ? 
         <Slideshow images = {singleProduct.images}/> : "Error loading images"
        }
        </div>
        <div className="product-data">

          <div className="single-prod-desc">{singleProduct.description}</div>
          <div className="single-prod-price" >Price: {singleProduct.price}</div>
          <div >Items in stock: {singleProduct.stock}</div>
          <div >Delivery: {singleProduct.shippingInformation}</div>
          <div className="single-prod-brandname">Brand: {singleProduct.brand}</div>
          <div className="single-prod-button-container">
            <button className="single-prod-to-cart" onClick={()=>addToCart(singleProduct)}>Add to cart</button>
              <button className="single-prod-to-wishlist" onClick={()=>addTowishlist(singleProduct)}>Add to wishlist</button>
          </div>
        </div>


      </div>
         {/*console.log(singleProduct.reviews)*/}
        { singleProduct.reviews && <div className="product-reviews">
          <h3 className="reviews-the-title">Reviews:</h3>
          {singleProduct.reviews.map((review, index) => 
          <div className="review" key={index}>

            <div className="name-and-date">
                <div className="reviewer-name">{review.reviewerName}</div>
                <div>{review.date.substring(0,10)}</div>
            </div>
            <div className="rating-and-comment">
                <div className="rating">raiting: {review.rating}
                {
                  printStars(review.rating)  
                }
                  </div>
                <div>{review.comment}</div>
            </div>
           
          </div>)}
            </div>}
    </div>
        {/*console.log(props.cartItems)*/}
  </div>
    
    )
}