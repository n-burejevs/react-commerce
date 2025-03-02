import React from "react";

export default function Sidemenu(props)
{

    //https://www.w3schools.com/howto/howto_js_dropdown.asp
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }*/
    return(
        <div className="dropdown">
            <button onClick={props.show} className="dropbtn">Site Nav</button>
            <div id="myDropdown" className="sidemenu">
                <a>Category1</a>
                <a>Category2</a>
                <a>Category3</a>
                <a>Category4</a>
                <a>Category5</a>
            </div>
        </div>
    )
}