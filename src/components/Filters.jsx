import React, {useMemo} from "react";
import "../styles/FilterStyles.css";
//import MultiRangeSlider from "./MultiRangeSlider";
import '../styles/RangeSliderStyles.css'
import useClickOutside from "../hooks/useClickOutside";
import PriceRangeFilter from "./PriceRangeFilter";


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

    //user will move these
  const [priceMin, setPriceMin] = React.useState(Math.min(...props.allProducts.map(item => item.price)));
  const [priceMax, setPriceMax] = React.useState(Math.max(...props.allProducts.map(item => item.price)));

  //min max for range
  const [min, setMin] = React.useState(Math.min(...props.allProducts.map(item => item.price)));
  const [max, setMax] = React.useState(Math.max(...props.allProducts.map(item => item.price)));

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
       if(checkedCheckboxes.length === 0) {cancelFilters(); }
       else 
        {
          for(let i=0; i<checkedCheckboxes.length; i++)
          {
      //check if items have no brand?
      //this one makes a "Other" brand selectable, but on 3rd page or so,
      //items with actual brand appear in the list
            temp = temp.concat(props.unfilteredProd.filter((item) => checkedCheckboxes[i] == "Other" ?
              item.brand == null : item.brand === checkedCheckboxes[i]
          /*{ 
            item.brand === checkedCheckboxes[i]
            if (checkedCheckboxes[i] == "Other")
            {
              item.brand == null
            }
          }*/))
          
          }
          props.setAllProducts(temp.filter(item => item.price >= priceMin && item.price <= priceMax));
         /// console.log(temp);

           // props.setAllProducts(temp); 
       }

      //props.setProducts(temp); 
    // props.setAllProducts(props.allProducts.filter(item => item.price >= priceMin && item.price <= priceMax))
       console.log("render 85")
    },[checkedCheckboxes, priceMax, priceMin]);

//i only came up with this way, get the json array again, to restore products
async function cancelFilters()
{
   fetch(props.source)
  .then(res => res.json())
  .then(data => props.setAllProducts(data.products))
  
    
}
async function cancelAllFilters() {

  //props.setAllProducts(props.unfilteredProd)

  setCheckedCheckboxes([]);
//this wont reset the range inputs...
  setPriceMin(Math.min(...props.allProducts.map(item => item.price)))
         setPriceMax(Math.max(...props.allProducts.map(item => item.price)))
  
}

//get brand names from a big list
 //The JSON data has a lot of items without "brand", need to display list of distinct brands it in the filter menu
  //when using Sort and sorting by price asc or desc, the items(brand names) in the Filters jump around
    //when sorted, they always stay in the same order
  
const brands = useMemo(() => {
  //getBrands();
    const seen = new Set();
    props.unfilteredProd.forEach(prod => seen.add(prod.brand || "Other"));
    
    return Array.from(seen).sort();
  }, [props.allProducts]);

React.useEffect(() => {
  //range values
  setMin(Math.min(...props.allProducts.map(item => item.price)))
    setMax(Math.max(...props.allProducts.map(item => item.price)))
    //just the initial values
       setPriceMin(Math.min(...props.allProducts.map(item => item.price)))
         setPriceMax(Math.max(...props.allProducts.map(item => item.price)))
         console.log("render 128?")

    },[props.unfilteredProd, checkedCheckboxes, props.allProducts]);

    React.useEffect(() => {

  // filter by selected range

  //props.setAllProducts(props.allProducts.filter(item => item.price >= priceMin && item.price <= priceMax))

    },[/*priceMin, priceMax*/]);


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
                    {     <PriceRangeFilter min={min} max={max} setMax={setMax} setMin={setMin} 
                                             priceMax={priceMax} priceMin={priceMin}
                                             setPriceMax={setPriceMax} setPriceMin={setPriceMin}
                                             allProducts={props.allProducts} 
                                             setAllProducts={props.setAllProducts}
                                             unfilteredProd={props.unfilteredProd} />
}
           
                </div>}
          </div> 
        }
        { props.width >= 768 && 
          <div className="dropdown">
            
            <div id="filter-dropdown" className="filter-pane">
              <button onClick={cancelAllFilters}>Cancel Filters</button>
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

        {                 <PriceRangeFilter min={min} max={max} setMax={setMax} setMin={setMin} 
                                             priceMax={priceMax} priceMin={priceMin}
                                             setPriceMax={setPriceMax} setPriceMin={setPriceMin}
                                             allProducts={props.allProducts} 
                                             setAllProducts={props.setAllProducts}
                                              unfilteredProd={props.unfilteredProd}
                                              />
}
                   
                        </div>
                  </div> 
        }
          </>
         
        )
}