import React from "react";

export default function Sort()
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
  
    return(
      <>
      
      <div className="sort-dropdown"  ref={container}>
      <button className="sort-button" onClick={handleButtonClick}>Sort</button>
      {open && ( <div id="sort-items" className="dropdown-content">
          <p>Sort by:</p>
          <a>Price Asc</a>
          <a>Price Desc</a>
          <a>New</a>
          <a>Popular</a>
          </div>)}
      </div>
      </>
  )
}