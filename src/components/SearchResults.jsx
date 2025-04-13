import { nanoid } from "nanoid";
import React from "react";

export default function SearchResults(props)
{
/** search a single product
fetch('https://dummyjson.com/products/search?q=phone')
.then(res => res.json())
.then(console.log);
 */
   function printSearchedItems()
   {
   
    var searchedProd =[];
   // console.log(props.results);
       // for (var key in  props.results) {
       for(let i=0; i<props.results.length; i++)
        //if ( props.results.hasOwnProperty(key))
        {//3 key attributes????
            searchedProd.push(<div key={nanoid()}><img className="serached-prod-img" src={props.results[i].img}></img></div>);
            searchedProd.push(<div key={nanoid()} >{props.results[/*key*/i].title}</div>);
            searchedProd.push(<div key={nanoid()}>{props.results[i].price}</div>);
      // }
 
        return searchedProd;
}
   }
    return(
        <div className="search-result-popout">
        
            {printSearchedItems() }
            
        </div>
    )
}