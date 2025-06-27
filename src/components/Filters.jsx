import React from "react";
import "../styles/FilterStyles.css"
import { nanoid } from "nanoid";

export default function Filters(props)
{   ///THIS component is rendered 3 times!? 5 now?
     //Source: https://www.codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked
      //brands wont update when switch to other category!!!!!!!!!!!!

    let container = React.createRef();
   
    const [open, setOpen] = React.useState(false);
    //getting window width from parent component app.jsx or viewcategory.jsx
    //const [width, SetWidth] = React.useState(window.innerWidth);
            
   //commented out because moved to parent, app jsx
/*const [allProducts, setAllProducts] = React.useState([]);
    
          React.useEffect(() =>{
          //'https://dummyjson.com/products?skip=10'
            fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setAllProducts(data.products))
            },[])*/

//populate filters with brand array items!
//get brand names from a big list
//state is empty because, setState is async?
const [brands, setBrands] = React.useState([]);
// the list is the same with all categiries....
//var brands = removeDuplicate(props.allProducts.map((prod) => prod.brand))

  //'products' is an array of 20 items only
  //when the other category is selected, filters need to be updated, re-rendered
  /*React.useEffect(() => {
     setBrands(removeDuplicate(props.products.map((prod) => prod.brand)))
    },[props.product]);*/
    
  //getting window width from parent component app.jsx or viewcategory.jsx
    /*React.useEffect(() => {
      SetWidth(window.innerWidth);
    },[window.innerWidth]);
    */
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
   
    //Hide dropdown when clicked outside of it
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

    const [inputs, setInputs] = React.useState([]);
//sumbitted after onChange
    function handleSubmit(formData)
    {
      event.preventDefault();
      console.log("submitted");
      console.log(formData);
      //console.log(inputs);
    }

    function handleChange(event)
    { 
      console.log('The checkbox was toggled');
    
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    var nameValuePair = {name: name, value: value };
    //console.log(nameValuePair)
    setInputs([...inputs, {nameValuePair}]);
  
    console.log(inputs);

      //sumbit form when checkbox is marked
    event.target.form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    
    }; 

//The JSON data has a lot of items without "brand", need to display list of distinct brands it in the filter menu
//https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    function removeDuplicate(array){
    var seen = {};
    var out = [];
    var len = array.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = array[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               //some items have no brand
               if(item === undefined) { out[j++] = "Other";}
                else out[j++] = item;
         }
    }
    return out;
    }


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
         //State is not updated here?! but is updated in the return part
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
    }
    //calling useEffect hook, that filters out products based on checked filters
   
  };
  //setting state is async...
  //display products, which corespond to 
    React.useEffect(() => {
       var temp = [];
       //restore original product lis
       if(checkedCheckboxes.length === 0) {cancelFilters(props.source)}
     for(let i=0; i<checkedCheckboxes.length; i++)
     {
        temp = temp.concat(props.allProducts.filter((item) => item.brand === checkedCheckboxes[i]))
     }
      props.setProducts(temp);
    },[checkedCheckboxes]);

//i only came up with this way, get the json array again, to restore products
async function cancelFilters(source)
{
   fetch(source)
  .then(res => res.json())
  .then(data => props.setProducts(data.products))
}
//did not work, which dependency to use? - Had to add "name" in the useEffect dependency,
//  which called fetch for allProducts
 React.useEffect(() => {

    setBrands(removeDuplicate(props.allProducts.map((prod) => prod.brand)));
    console.log(props.allProducts);
  }, [props.allProducts]);


        return(
          <>
        
        {props.width < 768 && 
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
        { props.width >= 768 && 
          <div className="dropdown">
            <div id="filter-dropdown" className="filter-pane">
        
                    <p className="filter-filters">Filters</p>
                    {/*console.log(checkedCheckboxes)*/}
                    <div className="filter-category-title">Brand</div>
                           <div className="brand-form">
                            {brands?.map((data, index) => (
                         <div key={nanoid()} className="inline-container">
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
                      </form>
                   
                        </div>
                  </div> 
        } {/*console.log(checkedCheckboxes)*/}
          </>
         
        )
}