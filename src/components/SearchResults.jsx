import { nanoid } from "nanoid";
import React from "react";
import { Link  } from 'react-router-dom';

export default function SearchResults(props)
{
   function printSearchedItems()
   {
   
    /*var searchedProd =[];
       for(let i=0; i<props.results.length; i++)
        {
            searchedProd.push(<div key={nanoid()}><Link to={`/viewproduct/${props.results[i].id}`}> 
                                 <img className="serached-prod-img" src={props.results[i].thumbnail}></img>
                                                </Link></div>);
            searchedProd.push(<div key={nanoid()} >{props.results[i].title}</div>);
            searchedProd.push(<div key={nanoid()}>{props.results[i].price}</div>);
             
       }*/
 //console.log(searchedProd);
       // return searchedProd;
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