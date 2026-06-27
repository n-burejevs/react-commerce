import React from "react";
import { useParams } from "react-router-dom";
import '../App.css'
import Sidemenu from '../components/Sidemenu';
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'
import Navbar from "../components/Navbar";
import { Link  } from 'react-router-dom';
import Product from "../components/Product";
import '../styles/SearchStyles.css'
import Filters from "../components/Filters";

//whats going on with the filters here how are they displayed coreecttlyy????????
export default function Search(){

    const { addToCart, cartCount } = useContext(CartContext);
        
    const { addTowishlist, wishListCount, setWishListCount } = useContext(WishlistContext);
        
    const { user, setUser} = useContext(UserContext);

    const [searchResults, setSearchResults] = React.useState([]);

    const [unfilteredProd, setUnfilteredProd] = React.useState([])
    
    let { query } = useParams();

    //can you send requests like that? without validation?
React.useEffect(() =>{
    
fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(newData => { setSearchResults(newData.products);
                     setUnfilteredProd(newData.products) });
           
},[query])

//get the filters?
return(
    <>

<Navbar cartCount={cartCount} /*setcartCount={setcartCount} */user={user} setUser={setUser} 
    wishListCount={wishListCount} /*setWishListCount={setWishListCount} *//>
    <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      <div className="mobile-view-search"><Filters width={767} 
                         allProducts={searchResults} setAllProducts={setSearchResults}
                         unfilteredProd={unfilteredProd}
                         /> 
                         </div>
    </div>
        
           <div className="main-content">
              { /* <div className="align-sort-container">*/}
                   
              {/*</div>*/ }

                {/*Pass the state to update item count, when the added to cart*/}
               {<Product products={searchResults} setProducts={setSearchResults}/>}

                   
      </div>
    { <div className="desktop-view-search"><Filters width={768}
                         allProducts={searchResults} setAllProducts={setSearchResults}
                         unfilteredProd={unfilteredProd}
                     /> </div>}
    
    </div>
    </>
)

}