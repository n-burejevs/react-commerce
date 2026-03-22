import React from "react";
import Navbar from "../components/Navbar";
import Sort from "../components/Sort";
import Product from "../components/Product";
import Sidemenu from "../components/Sidemenu";
import Filters from "../components/Filters";
import { useParams } from "react-router-dom";
import Pagination from '../components/Pagination'
import { useContext } from 'react';
import { CartContext } from '../components/context/cart';
import { WishlistContext } from '../components/context/wishlist';
import { UserContext } from '../components/context/user'


export default function ViewCategory()
{

  const { cartCount} = useContext(CartContext);
   const { wishListCount, setWishListCount} = useContext(WishlistContext);
   
   const { user, setUser} = useContext(UserContext);
    
      const [width, setWidth] = React.useState(window.innerWidth);
      React.useEffect(() => {
        const handleResize = () => {
          
          setWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
//get name of the category selected, to display whats in it
        var { name } = useParams();
       // console.log("param",useParams());

const [products, setProducts] = React.useState([]);
const [source, setSource] = React.useState(`https://dummyjson.com/products/category/${name}`);
//using this also to make filters work... ugh...
  const [unfilteredProd, setUnfilteredProd] = React.useState([])


//all products to get the filters working
const [allProducts, setAllProducts] = React.useState([]);
                    
  React.useEffect(() =>{
    setSource(`https://dummyjson.com/products/category/${name}`);
//the url string just makes browsing through categories normal
//when using state items from prev category are shown
  fetch(`https://dummyjson.com/products/category/${name}`)
  .then(res => res.json())
  .then(data => {setAllProducts(data.products);
                 setUnfilteredProd(data.products)})

  },[name])


return(
        <>
        <Navbar cartCount={cartCount} user={user} setUser={setUser}
        wishListCount={wishListCount} /*setWishListCount={setWishListCount}*/
         />

        <div className='main-content-container'>

    <div className='sidemenu-filterpane-mobile'> 
    <Sidemenu/>  
      {width < 768 && <Filters width={width} allProducts={allProducts} setAllProducts={setAllProducts}
                          unfilteredProd={unfilteredProd}
                          />}
    </div>

     <div className="main-content">

                {<Sort setProducts={setProducts} allProducts={allProducts} setAllProducts={setAllProducts} />}
                {/*Pass the state to update item count, when added to cart*/}
                <Product products={products} setProducts={setProducts}
                  allProducts={allProducts} setAllProducts={setAllProducts}
                  />

                 {<Pagination numberOfProd={allProducts.length }
                              allProducts={allProducts} setAllProducts={setAllProducts}
                              products={products} setProducts={setProducts}
                  />}
      </div>
    {width >= 768 && <Filters width={width} allProducts={allProducts} setAllProducts={setAllProducts}
                      unfilteredProd={unfilteredProd}
                      />
                      }
    
    </div>
        </>
    )
}
