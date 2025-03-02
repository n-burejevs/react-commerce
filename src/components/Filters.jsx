import React from "react";

export default function Filters(props)
{
        //https://www.w3schools.com/howto/howto_js_dropdown.asp
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*function myFunction() {
    document.getElementById("filter-dropdown").classList.toggle("show");
  }*/
  
  // Close the dropdown if the user clicks outside of it
  /*window.onclick = function(event) {
    if (!event.target.matches('.filter-dropdown-btn')) {
      var dropdowns = document.getElementsByClassName("filter-pane");
  
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }*/
/* watch and find out how to get event from clicked item using react, from the course */

   
        return(
            <div className="dropdown">
                <button onClick={props.show} className="filter-dropdown-btn">Filters</button>
                <div id="filter-dropdown" className="filter-pane">


            <p>Filters</p>
            <div>
                Filter name
            </div>
            <form>
            <input type="checkbox"></input>
            </form>
           
      

                </div>
            </div>
        )
}
        
        

 