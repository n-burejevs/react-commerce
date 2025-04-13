import { nanoid } from "nanoid";
import React from "react";


export default function Dots(props)
{
    var dots = [];
    for(let i=0; i<props.amount; i++)
    {
       if (i === props.position) dots.push(<span key={nanoid} className="dot active"></span>)
        /*Encountered two children with the same key, `(size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
}`. Keys should be unique so that components maintain their identity across updates. 
Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.*/
//using id lenght - 10
        else  dots.push(<span key={nanoid(10)} className="dot" ></span>)
    }

    return(
        <>
         {dots}
        </>
    )
}