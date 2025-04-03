import React from "react";
import { nanoid } from "nanoid";

export default function Sidemenu()
{
    const [categoryList, seCategoryList] = React.useState([]);
    
          React.useEffect(() =>{
            fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => seCategoryList(data.map( (d) => d.name)))
            },[])

    function toggleShowHide()
    {
      document.getElementById("myDropdown").classList.toggle("show");
    }        


    function printSidemenuLinks()
    {
        return categoryList.map( item => <a key={nanoid()}>{item} </a>)
    }          

    return(
        <div className="dropdown">
            <button onClick={toggleShowHide} className="dropbtn">Site Nav</button>
            <div id="myDropdown" className="sidemenu">
                {
                    printSidemenuLinks()
                }

            </div>
        </div>
    )
}