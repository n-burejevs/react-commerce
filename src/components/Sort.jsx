import React from "react";

export default function Sort(props)
{  

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

function sortAscending()
{
  props.setSource("https://dummyjson.com/products?sortBy=price&order=asc")
  setOpen(false);
}
function sortDescending()
{
  props.setSource("https://dummyjson.com/products?sortBy=price&order=desc")
  setOpen(false);
}
function sortNew()
{
  props.setSource("https://dummyjson.com/products?skip=10")
  setOpen(false);
}
function sortPopular()
{
  props.setSource("https://dummyjson.com/products")
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