import React from "react";
import { nanoid } from "nanoid";

export default function Sidemenu()
{/*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */
       
    let container = React.createRef();
    const [open, setOpen] = React.useState(false);
    const [width, SetWidth] = React.useState(window.innerWidth);

   React.useEffect(() => {
    SetWidth(window.innerWidth);
    },[window.innerWidth]);

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
    
    React.useEffect(() =>{
        fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(data => seCategoryList(data.map( (d) => d.name)))
    },[])      

    function printSidemenuLinks()
    {
        return categoryList.map( item => <a key={nanoid()}>{item} </a>)
    }          

    return(
        <>
        { width < 768 && 
         <div className="dropdown" ref={container}>
            <button onClick={handleButtonClick} className="dropbtn">Sidemenu</button>
            {open && <div id="myDropdown" className="sidemenu">
                {
                    printSidemenuLinks()
                }

            </div> }
        </div>
        }
        { width >= 768 && 
         <div className="dropdown">
            
            <div id="myDropdown" className="sidemenu">
                {
                    printSidemenuLinks()
                }
            </div>
        </div>
        }
        </>
       
    
    )
}