import React, {useMemo} from "react";
import "../styles/FilterStyles.css";
//import MultiRangeSlider from "./MultiRangeSlider";
import '../styles/RangeSliderStyles.css'
import useClickOutside from "../hooks/useClickOutside";

//range slider is not only for desktop?
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
      //this one makes a "Other" brand selectable, but on 3rd page or so,
      //items with actual brand appear in the list
        temp = temp.concat(props.allProducts.filter((item) => checkedCheckboxes[i] == "Other" ?
         item.brand == null : item.brand === checkedCheckboxes[i]
          /*{ 
            item.brand === checkedCheckboxes[i]
            if (checkedCheckboxes[i] == "Other")
            {
              item.brand == null
            }
          }*/))
          
     }
     //props.setAllProducts(temp); 
      props.setProducts(temp); 
      
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

  
  //user will move these
  const [priceMin, setPriceMin] = React.useState(Math.min(...props.allProducts.map(item => item.price)));
  const [priceMax, setPriceMax] = React.useState(Math.max(...props.allProducts.map(item => item.price)));

  //min max for range
  const [min, setMin] = React.useState(/*Math.min(...props.allProducts.map(item => item.price))*/0);
  const [max, setMax] = React.useState(/*Math.max(...props.allProducts.map(item => item.price))*/0);

React.useEffect(() => {
  //range values
  setMin(Math.min(...props.allProducts.map(item => item.price)))
    setMax(Math.max(...props.allProducts.map(item => item.price)))
    //just the initial values
       setPriceMin(Math.min(...props.allProducts.map(item => item.price)))
         setPriceMax(Math.max(...props.allProducts.map(item => item.price)))

    },[props.allProducts]);

    React.useEffect(() => {

  // filter by selected range
      //let category = props.products[0].category
      //this?
    /*  if(typeof category !== 'undefined') {
        props.setProducts(props.allProducts.filter( item => item.price >= priceMin && item.price <= priceMax && item.category == category))
      }*/
      //or this? or if category is not undefined -> then check for category else just use price filter
    props.setProducts(props.allProducts.filter( item => item.price >= priceMin && item.price <= priceMax/* && item.category == props.products[0].category*/))

    },[priceMin, priceMax]);

    const updateRange = (eventTarget) =>
    {
      const range = document.querySelector(".range-selected");
      //console.log(eventTarget.id)
      if (eventTarget.id == "min-range")
      {
          setPriceMin(eventTarget.value)
      }
      else if (eventTarget.id == "max-range")
      {
          setPriceMax(eventTarget.value)
      }
     //range.style.left = (priceMin / max) * 100 + "%";
     // range.style.right = 100 - (priceMax / max) * 100 + "%";
        fillColor()
    }
function fillColor() {
  const range = document.querySelector(".range-selected");
  let percent1 = (priceMin / max) * 100;
  let percent2 = (priceMax / max) * 100;
  range.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}


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

                                             <div className="filter-category-title">Price</div>
                      <form className="price-form">
                      <div className="range">
                      <div className="range-slider">
                    <span className="range-selected"></span>
                     </div>
                         <div className="range-input">

                    <input type="range" id="min-range" className="min" min={min} max={max} 
                              value={priceMin} onInput={e => updateRange(e.target) }/>
                    <input type="range" id="max-range" className="max" min={min} max={max} 
                              value={priceMax} onInput={e => updateRange(e.target)}/>
                  <div className="range-price"> 
                    <label htmlFor="test-range">{priceMin}</label> - <label htmlFor="test-range">{priceMax}</label>
                     </div>

                         </div>
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
                      <div className="range">
                      <div className="range-slider">
                    <span className="range-selected"></span>
                     </div>
                         <div className="range-input">

                    <input type="range" id="min-range" className="min" min={min} max={max} 
                              value={priceMin} onInput={e => updateRange(e.target) }/>
                    <input type="range" id="max-range" className="max" min={min} max={max} 
                              value={priceMax} onInput={e => updateRange(e.target)}/>
                  <div className="range-price"> 
                    <label htmlFor="test-range">{priceMin}</label> - <label htmlFor="test-range">{priceMax}</label>
                     </div>

                         </div>
                     </div> 
                      </form>
                   
                        </div>
                  </div> 
        }
          </>
         
        )
}