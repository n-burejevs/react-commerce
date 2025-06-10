import { nanoid } from "nanoid";
import React from "react";
import { Link  } from 'react-router-dom';

export default function SearchResults(props)
{
   function printSearchedItems()
   {
   
       return <>
       {props.results.map(product => (
        <div key={nanoid()} className="search-prod-hover">
          <div key={nanoid()}>
            <Link to={`/viewproduct/${product.id}`}> 
                <img  className="serached-prod-img" src={product.thumbnail}></img>
            </Link></div>
             <Link to={`/viewproduct/${product.id}`}> <div key={nanoid()} className="search-prod-title">{product.title}</div></Link>
            <div key={nanoid()} className="search-prod-price">{product.price}</div>

        </div>      ))}
       </>

}
   
    return(
        <div className="search-result-popout">
        
            {printSearchedItems() }
            
        </div>
    )
}