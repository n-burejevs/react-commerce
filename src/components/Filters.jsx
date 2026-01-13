import React, {useMemo} from "react";
import "../styles/FilterStyles.css";
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

  const getList = () => props.unfilteredProd && props.unfilteredProd.length ? props.unfilteredProd : (props.allProducts || []);
  const safeMin = (list) => list && list.length ? Math.min(...list.map(item => item.price)) : 0;
  const safeMax = (list) => list && list.length ? Math.max(...list.map(item => item.price)) : 0;

    //user will move these
  const [priceMin, setPriceMin] = React.useState(safeMin(getList()));
  const [priceMax, setPriceMax] = React.useState(safeMax(getList()));

  //min max for range
  const [min, setMin] = React.useState(safeMin(getList()));
  const [max, setMax] = React.useState(safeMax(getList()));

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
     /* const handleCheckboxChange = (data) => {
      setCheckedCheckboxes(prev => {
        if (prev.some(checked => checked === data)) {
          return prev.filter(checked => checked !== data);
        } else {
          return prev.concat(data);
        }
      });
    };*/
/*
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
          ///{ 
          ///  item.brand === checkedCheckboxes[i]
          ///  if (checkedCheckboxes[i] == "Other")
          ///  {
         ///     item.brand == null
          //  }
         //}
        ))
          
          }
          //props.setAllProducts(temp ? temp.filter(item => item.price >= priceMin && item.price <= priceMax) 
         // :
         //  allProducts.filter(item => item.price >= priceMin && item.price <= priceMax)  );
         /// console.log(temp);

            props.setAllProducts(temp); 
       }

      //props.setProducts(temp); 
    // props.setAllProducts(props.allProducts.filter(item => item.price >= priceMin && item.price <= priceMax))

    },[checkedCheckboxes]);*/

//i only came up with this way, get the json array again, to restore products
/*async function cancelFilters()
{
   fetch(props.source)
  .then(res => res.json())
  .then(data => props.setAllProducts(data.products))
}*/


// restore original product list using the backup (unfilteredProd) when possible
async function cancelFilters()
{
   const base = (props.unfilteredProd && props.unfilteredProd.length) ? props.unfilteredProd : null;

   if (base) {
     setCheckedCheckboxes([]);
     const baseMin = safeMin(base);
     const baseMax = safeMax(base);

     setMin(baseMin);
     setMax(baseMax);
     setPriceMin(baseMin);
     setPriceMax(baseMax);

     if (props.setAllProducts) props.setAllProducts(base);
     //if (props.setProducts) props.setProducts(base.slice(0, 20));
   } else {
     // fallback to fetch only if no backup provided
     fetch(props.source)
      .then(res => res.json())
      .then(data => {
         const products = data.products || [];
         if (props.setUnfilteredProd) props.setUnfilteredProd(products); // optional, if parent has this setter
         setCheckedCheckboxes([]);
         const baseMin = safeMin(products);
         const baseMax = safeMax(products);

         setMin(baseMin);
         setMax(baseMax);
         setPriceMin(baseMin);
         setPriceMax(baseMax);

         if (props.setAllProducts) props.setAllProducts(products);
         //prob dont need that// if (props.setProducts) props.setProducts(products.slice(0, 20));
      });
   }
}

/*async function cancelAllFilters() {

  //props.setAllProducts(props.unfilteredProd)

  setCheckedCheckboxes([]);
//this wont reset the range inputs...
  setPriceMin(Math.min(...props.allProducts.map(item => item.price)))
         setPriceMax(Math.max(...props.allProducts.map(item => item.price)))
  
}*/

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
/*
React.useEffect(() => {
  //range values
  setMin(safeMin(getList()))
    setMax(safeMax(getList()))
    //just the initial values
       setPriceMin(safeMin(getList()))
         setPriceMax(safeMax(getList()))
         console.log("render 142?")

    },[props.unfilteredProd, checkedCheckboxes]);

    React.useEffect(() => {

  // filter by selected range

  props.setAllProducts(props.allProducts.filter(item => item.price >= priceMin && item.price <= priceMax))

    },[priceMin, priceMax]);*/

      // keep min/max synced whenever the original backup list changes (or allProducts as fallback)
  React.useEffect(() => {
    const base = getList();

    //console.log(base);
    //console.log("render 158")
    if (!base || base.length === 0) return;
      //console.log("base is here")
    const newMin = safeMin(base);
    const newMax = safeMax(base);

    setMin(newMin);
    setMax(newMax);

    // if there are no brand filters applied, reset the price bounds to the base bounds
    if (checkedCheckboxes.length === 0) {
      setPriceMin(newMin);
      setPriceMax(newMax);
      // set products and allProducts to base (show initial full list)
    //why if stmt needed?
      if (props.setAllProducts) props.setAllProducts(base);
      //if (props.setProducts) props.setProducts(base.slice(0, 20));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.unfilteredProd]);

  // Apply filters: brand and price. Update both the "allProducts" and the visible page slice
  React.useEffect(() => {
    //console.log("render 180");
    const base = getList();

    if (!base) return;

    // Filter by brands first (if any). Support "Other" meaning null/undefined brand.
    let byBrands = base;
    if (checkedCheckboxes.length > 0) {
      byBrands = base.filter(item =>
        checkedCheckboxes.some(brand => brand === "Other" ? (item.brand == null) : (item.brand === brand))
      );
    }

    // Update slider min/max to reflect available products after brand filtering
    const brandMin = byBrands.length ? Math.min(...byBrands.map(i => i.price)) : safeMin(base);
    const brandMax = byBrands.length ? Math.max(...byBrands.map(i => i.price)) : safeMax(base);

    setMin(brandMin);
    setMax(brandMax);

    // clamp the current priceMin/priceMax to the brand bounds
    const clampedPriceMin = Math.max(brandMin, Math.min(priceMin, brandMax));
    const clampedPriceMax = Math.min(brandMax, Math.max(priceMax, brandMin));

    //not needed!!
    // Avoid extraneous state updates (and infinite loops) by only setting if changed
    //if (clampedPriceMin !== priceMin) setPriceMin(clampedPriceMin);
   // if (clampedPriceMax !== priceMax) setPriceMax(clampedPriceMax);
   //BUG: ^^^^^^ shows only one product with min price?
  
   //do i need these clampled state vars?
    // Now apply price filtering on top of brand filter
    const finalList = byBrands.filter(item => item.price >= clampedPriceMin && item.price <= clampedPriceMax);

    if (props.setAllProducts) props.setAllProducts(finalList);
    //if (props.setProducts) props.setProducts(finalList.slice(0, 20));

    // console.log("Filters applied:", { checkedCheckboxes, clampedPriceMin, clampedPriceMax, finalCount: finalList.length })
  // priceMin/priceMax intentionally in deps so effect triggers when slider changes
  }, [checkedCheckboxes, priceMin, priceMax, props.unfilteredProd]);


        return(
          <>
        {props.width < 768 && 
           <div className="dropdown"  ref={container}>
            <button onClick={handleButtonClick} className="filter-dropdown-btn">Filters</button>
              {open &&   <div id="filter-dropdown" className="filter-pane">
                {/* <button onClick={cancelAllFilters}>Cancel Filters</button>*/}
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
             { /*<button onClick={cancelAllFilters}>Cancel Filters</button>*/}
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
                                             /*allProducts={props.allProducts} 
                                             setAllProducts={props.setAllProducts}
                                              unfilteredProd={props.unfilteredProd}*/
                                              />
}
                   
                        </div>
                  </div> 
        }
          </>
         
        )
}