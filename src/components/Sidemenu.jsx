import React from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import '../styles/SidemenuStyles.css'
export default function Sidemenu()
{/*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */
       
    let container = React.createRef();
    const [open, setOpen] = React.useState(false);
    //this solution stopped working?
    const [width, SetWidth] = React.useState(window.innerWidth);
//this no longer works? had to remove conditional rendering - width >=768 (render nav), width < 768 (render sidemenu dropdown button)
 /*  React.useEffect(() => {
    SetWidth(window.innerWidth);
    },[window.innerWidth]);*/

    function handleButtonClick()
    {
       setOpen(prevState=> !prevState)
    }; 

    function handleClickOutside(event){
        if(
            container.current &&
            !container.current.contains(event.target)
          ) {
              setOpen(false);
            }
    }


    /*Hide dropdown when clicked outside of it*/
     React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
       return () => { 
        document.removeEventListener("mousedown", handleClickOutside);
      };}, [open]);

    const [categoryList, seCategoryList] = React.useState([]);
    
    //fetch('https://dummyjson.com/products/search?q=phone')
    //.then(res => res.json())
    //.then(console.log);
    React.useEffect(() =>{
        fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(data => seCategoryList(data.map( (d) => d.name)))
    },[])      

    function printSidemenuLinks()
    {
        return categoryList.map( item => <a key={nanoid()}>{item} </a>)
    }          


    /*how to do it for mobile?
      function toggleShowHide(elementName) {
    document.getElementById(elementName).classList.toggle("show");
    !!usage: <Sidemenu show={()=>toggleShowHide("myDropdown")}/> 

  }
    */
    return(
        <>
        {/*width < 768 && */
         <div className="dropdown" ref={container} id="sidemenu-dropdown-mobile-container">
            <button onClick={handleButtonClick} className="dropbtn">Sidemenu</button>
           
            {open && <div id="myDropdown" className="sidemenu">
                {
                    /*printSidemenuLinks()*/
                }
                                    <nav className=".navigation-mobile">

                    <div className="category-item">
                      <span className="category-name">Furniture</span>
                    <div className="hidden-part">
                      <ul>
                        <li>Home Decoration</li>
                        <li>Kitchen Accessories</li>
                       <li>
                       <Link to={`/category/furniture`} className="sidemenu-link" >Furniture</Link>
                        </li> 
                      </ul>
                      </div>
                      </div>
                 
                  <div className="category-item">
                   <span className="category-name">Clothing</span>
                  <div className="hidden-part">
                      <ul>
                        <li>Mens Shirts</li>
                        <li>Mens Shoes</li>
                        <li>Womens Dresses</li>
                        <li>Womens Shoes</li>
                        <li>Tops</li>
                        
                        <div className="sub-category-item">  
                     Shoes
                    <div className="sub-hidden-part">
                      <ul>
                        <li><Link to={`/category/mens-shoes`} className="sidemenu-link" >Mens Shoes</Link></li>
                         <li><Link to={`/category/womens-shoes`} className="sidemenu-link" >Womens Shoes</Link></li>
                      </ul>
                      </div>
                      
                      </div>
                       
                 
                      </ul>
                    </div>
                    </div>

                    <div className="category-item">
                      <span className="category-name">Beauty</span>
                    <div className="hidden-part">
                      <ul>
                        <li><Link to={`/category/skin-care`} className="sidemenu-link" >Skin Care</Link></li>
                        <li><Link to={`/category/fragrances`} className="sidemenu-link" >Fragrances</Link></li>
                      </ul>
                      </div>
                      </div>

                      <div className="category-item">
                      <span className="category-name">Accessories</span>
                    <div className="hidden-part">
                      <ul>
                        <li>
                        <Link to={`/category/mens-watches`} className="sidemenu-link" >Mens Watches</Link>
                        </li>
                        <li>
                        <Link to={`/category/womens-bags`} className="sidemenu-link" >Womens Bags</Link>
                        </li>
                        <li>
                        <Link to={`/category/womens-jewellery`} className="sidemenu-link" >Womens Jewellery</Link>
                        </li>
                        <li>
                        <Link to={`/category/womens-watches`} className="sidemenu-link" >Womens Watches</Link>
                        </li>
                      </ul>
                      </div>
                      </div>

                      <div className="category-item">
                      <span className="category-name">Electronics</span>
                    <div className="hidden-part">
                      <ul>
                        <li>
                        <Link to={`/category/laptops`} className="sidemenu-link" >Laptops</Link>
                        </li>
                        <li >
                        <Link to={`/category/smartphones`} className="sidemenu-link" >Smartphones</Link>

                        </li>
                        
                        <li>
                        <Link to={`/category/tablets`} className="sidemenu-link" >Tablets</Link>
                        </li>
                        <li>
                        <Link to={`/category/mobile-accessories`} className="sidemenu-link" >Mobile Accessories</Link>
                        </li>
                      </ul>
                      </div>
                      </div>



                  </nav>

            </div> }
        </div>
        }
        {/*width >= 768 && */
         <div className="dropdown" id="sidemenu-dropdown-container">
            
            <div id="myDropdown" className="sidemenu">
                {/*printSidemenuLinks()*/}
               { 
                    
                    <nav className="navigation">

                    <div className="category-item">
                      <span className="category-name">Furniture</span>
                    <div className="hidden-part">
                      <ul>
                        <li>Home Decoration</li>
                        <li>Kitchen Accessories</li>
                       <li>
                       <Link to={`/category/furniture`} className="sidemenu-link" >Furniture</Link>
                        </li> 
                      </ul>
                      </div>
                      </div>
                 
                  <div className="category-item">
                   <span className="category-name">Clothing</span>
                  <div className="hidden-part">
                      <ul>
                        <li>Mens Shirts</li>
                        <li>Mens Shoes</li>
                        <li>Womens Dresses</li>
                        <li>Womens Shoes</li>
                        <li>Tops</li>
                        
                        <div className="sub-category-item">  
                     Shoes
                    <div className="sub-hidden-part">
                      <ul>
                        <li><Link to={`/category/mens-shoes`} className="sidemenu-link" >Mens Shoes</Link></li>
                         <li><Link to={`/category/womens-shoes`} className="sidemenu-link" >Womens Shoes</Link></li>
                      </ul>
                      </div>
                      
                      </div>
                       
                 
                      </ul>
                    </div>
                    </div>

                    <div className="category-item">
                      <span className="category-name">Beauty</span>
                    <div className="hidden-part">
                      <ul>
                        <li><Link to={`/category/skin-care`} className="sidemenu-link" >Skin Care</Link></li>
                        <li><Link to={`/category/fragrances`} className="sidemenu-link" >Fragrances</Link></li>
                      </ul>
                      </div>
                      </div>

                      <div className="category-item">
                      <span className="category-name">Accessories</span>
                    <div className="hidden-part">
                      <ul>
                        <li>
                        <Link to={`/category/mens-watches`} className="sidemenu-link" >Mens Watches</Link>
                        </li>
                        <li>
                        <Link to={`/category/womens-bags`} className="sidemenu-link" >Womens Bags</Link>
                        </li>
                        <li>
                        <Link to={`/category/womens-jewellery`} className="sidemenu-link" >Womens Jewellery</Link>
                        </li>
                        <li>
                        <Link to={`/category/womens-watches`} className="sidemenu-link" >Womens Watches</Link>
                        </li>
                      </ul>
                      </div>
                      </div>

                      <div className="category-item">
                      <span className="category-name">Electronics</span>
                    <div className="hidden-part">
                      <ul>
                        <li>
                        <Link to={`/category/laptops`} className="sidemenu-link" >Laptops</Link>
                        </li>
                        <li >
                        <Link to={`/category/smartphones`} className="sidemenu-link" >Smartphones</Link>

                        </li>
                        
                        <li>
                        <Link to={`/category/tablets`} className="sidemenu-link" >Tablets</Link>
                        </li>
                        <li>
                        <Link to={`/category/mobile-accessories`} className="sidemenu-link" >Mobile Accessories</Link>
                        </li>
                      </ul>
                      </div>
                      </div>



                  </nav>
                }
            </div>
        </div>
        }
        
 

  
      
        </>
       
    
    )
    /**
     * categories
     * Beauty - > Skin Care, Fragrances

Furniture -> Home Decoration, Kitchen Accessories

Clothing -> Mens Shirts, Mens Shoes, Womens Dresses, Womens Shoes, Tops
Accessories -> Mens Watches, Womens Bags, Womens Jewellery, Womens Watches, Sunglasses

Electronics -> Laptops, Smartphones, Tablets, Mobile Accessories

Sports Accessories

Groceries

Motorcycle
Vehicle

<nav role="navigation">
  <ul className="caterogy-types">
    <li><a href="#">Beauty</a>
    <ul className="sub-dropdown">
      <li><a href="#">Skin Care</a></li>
      <li><a href="#">Fragrances</a></li>
      <li><a href="#">Test</a></li>
      </ul>
      </li>
      <li><a href="#">Furniture</a>
    <ul className="sub-dropdown">
        <li><a href="#">Home Decoration</a></li>
        <li><a href="#">Kitchen Accessories</a></li>
      </ul>
      </li>

      <li><a href="#">Clothing</a>
    <ul className="sub-dropdown">
        <li><a href="#">Mens Shirts</a></li>
        <li><a href="#">Mens Shoes</a></li>
        <li><a href="#">Womens Dresses</a></li>
        <li><a href="#">Womens Shoes</a></li>
        <li><a href="#">Tops</a></li>
      </ul>
      </li>
  </ul>
</nav>

     */
}