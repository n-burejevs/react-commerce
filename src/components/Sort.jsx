import React from "react";
import useClickOutside from "../hooks/useClickOutside";

export default function Sort(props)
{

//const [sortedProductSource, setSortedProductSource] = React.useState(props.source);
//is it sorted or not?
//let sortedProductSource = props.source;
   
let container = React.createRef();
const [open, setOpen] = React.useState(false);

   function handleButtonClick(){
        setOpen(prevState=> !prevState)
  }; 

  
   /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */
  useClickOutside(container, open, setOpen);

  function compareAsc(a, b) {
  return a.price - b.price;
}
function compareDesc(a, b) {
  return b.price - a.price;
}
function compareByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function sortAscending()
{
  props.setAllProducts(props.allProducts.slice().sort(compareAsc));

  setOpen(false);
}
function sortDescending()
{//console.log(props.products)
  props.setAllProducts(props.allProducts.slice().sort(compareDesc));
  
  setOpen(false);
}
//https://coureywong.medium.com/how-to-shuffle-an-array-of-items-in-javascript-39b9efe4b567
//randomise items
/*
function shuffle(){
  let array = props.AllProducts;
  console.log(props.allProducts);
  let i = props.allProducts.length, j, temp;

  while(--i>0)
  {
    j= Math.floor(Math.random() * (i +1 ));

    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}*/

//the source data for the products has the same date for each item in the array???
//how would it sort anything?
//this no longer sorts by date, randomises now
function sortNew()
{
  //console.log(props.products)//.map(item => item.meta.createdAt))
  props.setAllProducts(props.allProducts.slice().sort(compareByDate));

  //smh TypeError: can't access property 122, array is undefined
  //props.setAllProducts(shuffle());
  
  setOpen(false);
}
//why??? //maybe just remove this, i probably dont need it
/*
function sortPopular()
{
  props.setSource(sortedProductSource);//"https://dummyjson.com/products")
  
  ///console.log(props.source.filter((item) => item.brand === "Annibale Colombo"))

  setOpen(false);
}*/

  //change products list after sort, show the items sorted
   React.useEffect(() => {
    props.setProducts(props.allProducts.slice(0,20))

  }, [props.allProducts]);

  

  
    return(
      <>
      <div className="sort-dropdown"  ref={container}>
      <button className="sort-button" onClick={handleButtonClick}>Sort</button>
      {open && ( <div id="sort-items" className="dropdown-content">
          <p>Sort by:</p>
          <a onClick={sortAscending}>Price Asc</a>
          <a onClick={sortDescending}>Price Desc</a>
          <a onClick={sortNew}>New</a>
          {/* This makes no sense so i removed it*/
           /* <a onClick={sortPopular}>Popular</a>*/
            }
          </div>)}
      </div>
      </>
  )
}