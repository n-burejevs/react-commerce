import React from "react";
import "../styles/FilterStyles.css"
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

      function selectBrand(formData)
      {
        const brand = formData.get("brandname")

        console.log(brand+" selected")
      }

      function selectColor(formData)
      {
        const colors = formData.get("colors")

        console.log(colors+" selected")
      }
      function handleSubmit(event)
    {
      event.preventDefault();
      console.log("test");
    }

     //this is how i can filter by brand, for example
 //const test1 = test.filter(b => b.brand === "Annibale Colombo")
        return(
          <>
        {width < 768 && 
           <div className="dropdown"  ref={container}>
            <button onClick={handleButtonClick} className="filter-dropdown-btn">Filters</button>
              {open &&   <div id="filter-dropdown" className="filter-pane">

                <p className="filter-filters">Filters</p>
                    <div className="filter-category-title">Brand</div>
                      <form /*action={selectBrand} */className="brand-form">
                      <div className="inline-container">
                      <input type="checkbox" name="brandname" value="Annibale Colombo"></input><label >Annibale Colombo</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname" value="Furniture Co."></input> <label>Furniture Co.</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname"  value="Bath Trends"></input> <label>Bath Trends</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname"  value="Knoll"></input> <label>Knoll</label>
                      </div>
                      </form>

                      <div className="filter-category-title">Color</div>
                      <form /*action={selectColor}*/ className="color-form">
                      <div className="inline-container">
                      <input type="checkbox" name="colors" value="White"></input><label >White</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="colors" value="Black"></input> <label>Black</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="colors"  value="Red"></input> <label>Red</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="colors"  value="Blue"></input> <label>Blue</label>
                     </div>
                      </form>
           
                </div>}
          </div> 
        }
        { width >= 768 && 
          <div className="dropdown">
            <div id="filter-dropdown" className="filter-pane">
        
                    <p className="filter-filters">Filters</p>
                    <div className="filter-category-title">Brand</div>
                      <form onSubmit={handleSubmit}/*action={selectBrand} */className="brand-form">
                      <div className="inline-container">
                      <input type="checkbox" name="brandname" value="Annibale Colombo"></input><label >Annibale Colombo</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname" value="Furniture Co."></input> <label>Furniture Co.</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname"  value="Bath Trends"></input> <label>Bath Trends</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname"  value="Knoll"></input> <label>Knoll</label>
                      </div>
                      </form>

                      <div className="filter-category-title">Color</div>
                      <form /*action={selectColor}*/ className="color-form">

                      <div className="inline-container">
                     <input type="checkbox" name="colors" value="Black"></input> <label>Black</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="colors"  value="Red"></input> <label>Red</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="colors"  value="Blue"></input> <label>Blue</label>
                     </div>
                     <div className="inline-container">
                      <input type="checkbox" name="colors" value="White"></input><label>White</label>
                      </div>
                      </form>
                   
                        </div>
                  </div> 
        }
          </>
         
        )
}
        
        

 