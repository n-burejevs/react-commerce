import React from "react";

function PriceRangeFilter(props)
{

    const updateRange = (eventTarget) =>
    {
      
      if (eventTarget.id == "min-range")
      {
          props.setPriceMin(eventTarget.value)
      }
      else if (eventTarget.id == "max-range")
      {
          props.setPriceMax(eventTarget.value)
      }
     //range.style.left = (priceMin / max) * 100 + "%";
     // range.style.right = 100 - (priceMax / max) * 100 + "%";
       // fillColor()
    }
function fillColor() {
  const range = document.querySelector(".range-selected");
  let percent1 = (priceMin / max) * 100;
  let percent2 = (priceMax / max) * 100;
  range.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}
/*
React.useEffect(() => {
  //range values
  props.setMin(Math.min(...props.unfilteredProd.map(item => item.price)))
     props.setMax(Math.max(...props.unfilteredProd.map(item => item.price)))
    //just the initial values, commented out, because deps
        props.setPriceMin(Math.min(...props.allProducts.map(item => item.price)))
         props.setPriceMax(Math.max(...props.allProducts.map(item => item.price)))

    },[props.unfilteredProd]);*/

    /*  React.useEffect(() => {
    //just the initial values
        props.setPriceMin(Math.min(...props.allProducts.map(item => item.price)))
          props.setPriceMax(Math.max(...props.allProducts.map(item => item.price)))

    },[]);*/

  //////  React.useEffect(() => {

 
      //worked, but setproducts should be only 20 items on page
   // props.setProducts(props.allProducts.filter( item => item.price >= priceMin && item.price <= priceMax))
   //testing
   
   //if(props.unfilteredProd) {
   // if(props.min != props.priceMin || props.max != props.priceMax) {
   //i imagine, taking items from unfiltred, makes other filters useless....
   //but using just allproducts wont show removed items if you move price slider back
 ////////     props.setAllProducts(props.unfilteredProd.filter( item => item.price >=  props.priceMin && item.price <=  props.priceMax))
    //}
   // }
  ///////  },[ props.priceMin,  props.priceMax]);
      
    return(
        <>
         <form className="price-form">
                      <div className="range">
                      <div className="range-slider">
                    <span className="range-selected"></span>
                     </div>
                         <div className="range-input">

                    <input type="range" id="min-range" className="min" min={props.min} max={props.max} 
                              value={props.priceMin} onInput={e => updateRange(e.target) }/>
                    <input type="range" id="max-range" className="max" min={props.min} max={props.max} 
                              value={props.priceMax} onInput={e => updateRange(e.target)}/>
                  <div className="range-price"> 
                    <label htmlFor="test-range">{props.priceMin}</label> - <label htmlFor="test-range">{props.priceMax}</label>
                     </div>

                         </div>
                     </div> 
                      </form>
        
        </>
    )
}

export default React.memo(PriceRangeFilter)