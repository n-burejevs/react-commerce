import React from "react";

export default function Filters()
{
     /*Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked */
       
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
   
        return(
          <>
        {width < 768 && 
           <div className="dropdown"  ref={container}>
            <button onClick={handleButtonClick} className="filter-dropdown-btn">Filters</button>
              {open &&   <div id="filter-dropdown" className="filter-pane">

            <p>Filters</p>
            <div>
                Filter name
            </div>
              <form>
                <input type="checkbox"></input>
              </form>
           
                </div>}
          </div> 
        }
        { width >= 768 && 
          <div className="dropdown">
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
        }
          </>
         
        )
}
        
        

 