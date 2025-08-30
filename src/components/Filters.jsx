import React, {useMemo} from "react";
import "../styles/FilterStyles.css";
import MultiRangeSlider from "./MultiRangeSlider";
import useClickOutside from "../hooks/useClickOutside";

export default function Filters(props)
{
     //Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked
     
    let container = React.createRef();
   
    const [open, setOpen] = React.useState(false);

    function handleButtonClick()
    {
        setOpen(prevState=> !prevState)
    }; 

  useClickOutside(container, open, setOpen);

    //https://stackoverflow.com/questions/69195359/how-to-work-with-multiple-checkboxes-in-react-and-collect-the-checked-checkboxes

    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState([]);

    const handleCheckboxChange = (data) => {
       const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox === data)
    //console.log(checkedCheckboxes);
    if (isChecked) {
      //if it was in the array, remove
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          (checkedCheckbox) => checkedCheckbox !== data)
      );
    } else {
         //State is not updated here?!
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
    }

  };

  //setting state is async...
  //display products, which correspond to selected brands
    React.useEffect(() => {
       var temp = [];
       //restore original product list
       if(checkedCheckboxes.length === 0) {cancelFilters(props.source); }
     for(let i=0; i<checkedCheckboxes.length; i++)
     {
      //check if items have no brand?
        temp = temp.concat(props.allProducts.filter((item) => item.brand === checkedCheckboxes[i]))

     }
      props.setAllProducts(temp);
      
    },[checkedCheckboxes]);

//i only came up with this way, get the json array again, to restore products
async function cancelFilters(source)
{
   fetch(source)
  .then(res => res.json())
  .then(data => props.setAllProducts(data.products))
}

//get brand names from a big list
 //The JSON data has a lot of items without "brand", need to display list of distinct brands it in the filter menu
  //when using Sort and sorting by price asc or desc, the items(brand names) in the Filters jump around
    //when sorted, they always stay in the same order
const brands = useMemo(() => {
    const seen = new Set();
    props.allProducts.forEach(prod => seen.add(prod.brand || "Other"));
    
    return Array.from(seen).sort();
  }, [props.allProducts]);  

  
  
  const [priceMin, setPriceMin] = React.useState(Math.max(...props.allProducts.map(item => item.price)));
  const [priceMax, setPriceMax] = React.useState(Math.min(...props.allProducts.map(item => item.price)));
/*
React.useEffect(() => {
  let max = Math.max(...props.allProducts.map(item => item.price));
  let min = Math.min(...props.allProducts.map(item => item.price));

  

    },[props.allProducts]);*/


        return(
          <>
       { /*console.log(brands)*/}
        {props.width < 768 && 
           <div className="dropdown"  ref={container}>
            <button onClick={handleButtonClick} className="filter-dropdown-btn">Filters</button>
              {open &&   <div id="filter-dropdown" className="filter-pane">

                <p className="filter-filters">Filters</p>
                    <div className="filter-category-title">Brand</div>
                         <div className="brand-form">
                            {brands?.map((data, index) => (
                         <div key={data || index} className="inline-container">
                              <input
                             
                                key={`cb-${index}`}
                                value={data}
                                type="checkbox"
                                checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox === data)}
                                onChange={() => handleCheckboxChange(data)}
                              />
                               <label>{data}</label>
                         </div>
                              
                            ))}
                         </div>

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
        { props.width >= 768 && 
          <div className="dropdown">
            <div id="filter-dropdown" className="filter-pane">
        
                    <p className="filter-filters">Filters</p>
                    {/*console.log(checkedCheckboxes)*/}
                    <div className="filter-category-title">Brand</div>
                           <div className="brand-form">
                            {brands?.map((data, index) => (
                         <div key={data || index} className="inline-container">
                              <input
                             
                                key={`cb-${index}`}
                                value={data}
                                type="checkbox"
                                checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox === data)}
                                onChange={() => handleCheckboxChange(data)}
                              />
                               <label>{data}</label>
                         </div>
                              
                            ))}
                         </div>



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
                      </form >
                      
                       <div className="filter-category-title">Price</div>
                      <form className="price-form">
                         <div >
           {/* <MultiRangeSlider 
            min={priceMin} max={priceMax} onChange={({ min, max }) => {setPriceMin(min); setPriceMax(max);}}
              />*/}
                         </div>

                      </form>
                   
                        </div>
                  </div> 
        } {/*console.log(checkedCheckboxes)*/}
          </>
         
        )
}