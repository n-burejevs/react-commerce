import { nanoid } from "nanoid";
import React from "react";
import { Link  } from 'react-router-dom';

export default function SearchResults(props)
{
   function printSearchedItems()
   {
   
    var searchedProd =[];
    //console.log(props.results);
       // for (var key in  props.results) {
       for(let i=0; i<props.results.length; i++)
        //if ( props.results.hasOwnProperty(key))
        {//3 key attributes????
            searchedProd.push(<div key={nanoid()}><Link to={`/viewproduct/${props.results[i].id}`}> 
                                 <img className="serached-prod-img" src={props.results[i].img}></img>
                                                </Link></div>);
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