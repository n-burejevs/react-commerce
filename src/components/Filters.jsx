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

    const [inputs, setInputs] = React.useState({});

    function handleSubmit(event)
    {
      event.preventDefault();
      console.log("submitted");
      console.log(inputs);
    }

    function handleChange(event)
    { 
      console.log('The checkbox was toggled');
    
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    var nameValuePair = {name: name, value: value };
    console.log(nameValuePair)
    //setInputs(values => ({...values, nameValuePair}));
    setInputs(nameValuePair);
    /*const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const brandName = formData.get("brandname1")
    console.log(brandName);*/
    console.log(inputs);

      //sumbit form when checkbox is marked
    //event.target.form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    
    }; 
    

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
                      <form /*action={handleSubmit}*/ className="brand-form">
                      <div className="inline-container">
                      <input type="checkbox" name="brandname1" value="Annibale Colombo"></input><label >Annibale Colombo</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname2" value="Furniture Co."></input> <label>Furniture Co.</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname3"  value="Bath Trends"></input> <label>Bath Trends</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname4"  value="Knoll"></input> <label>Knoll</label>
                      </div>
                      </form>

                      <div className="filter-category-title">Color</div>
                      <form /*action={handleSubmit}*/ className="color-form">
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
                      <form  onSubmit={handleSubmit} /*action={selectBrand} */className="brand-form">
                      <div className="inline-container">
                       
                        <input type="checkbox" name="brandname1" onChange={handleChange} value="Annibale Colombo"></input><label >Annibale Colombo</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname2" onChange={handleChange} value="Furniture Co."></input> <label>Furniture Co.</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname3" onChange={handleChange} value="Bath Trends"></input> <label>Bath Trends</label>
                      </div>
                      <div className="inline-container">
                     <input type="checkbox" name="brandname4" onChange={handleChange} value="Knoll"></input> <label>Knoll</label>
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