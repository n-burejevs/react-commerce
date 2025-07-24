import React from "react";

export default function Sort(props)
{  

//const [sortedProductSource, setSortedProductSource] = React.useState(props.source);
let sortedProductSource = props.source;
   /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */
   
let container = React.createRef();
const [open, setOpen] = React.useState(false);

   function handleButtonClick(){
        setOpen(prevState=> !prevState)
  }; 


function handleClickOutside(event){
    if (
      container.current &&
      !container.current.contains(event.target)
    ) {
        setOpen(false);
    }
  };

/*Hide dropdown when clicked outside of it*/
React.useEffect(() => {

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function compareAsc(a, b) {
  return a.price - b.price;
}
function comparedesc(a, b) {
  return b.price - a.price;
}
function compareByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function sortAscending()
{
  props.setProducts(props.products.slice().sort(compareAsc));
  setOpen(false);
}
function sortDescending()
{
  props.setProducts(props.products.slice().sort(comparedesc));
  setOpen(false);
}
//the source data for the products has the same date for each item in the array???
//how would it sort anything?
function sortNew()
{
  console.log(props.products)//.map(item => item.meta.createdAt))
  props.setProducts(props.products.slice().sort(compareByDate));
  setOpen(false);
}
//why???
function sortPopular()
{
  props.setSource(sortedProductSource);//"https://dummyjson.com/products")
  ///console.log(props.source.filter((item) => item.brand === "Annibale Colombo"))

  setOpen(false);
}

  
    return(
      <>
      <div className="sort-dropdown"  ref={container}>
      <button className="sort-button" onClick={handleButtonClick}>Sort</button>
      {open && ( <div id="sort-items" className="dropdown-content">
          <p>Sort by:</p>
          <a onClick={sortAscending}>Price Asc</a>
          <a onClick={sortDescending}>Price Desc</a>
          <a onClick={sortNew}>New</a>
          <a onClick={sortPopular}>Popular</a>
          </div>)}
      </div>
      </>
  )
}