import { nanoid } from "nanoid";
import React from "react";

/*Small dots uner the image gallery that indicate which image is the current one out of whats available*/
export default function Dots(props)
{
    var dots = [];
    for(let i=0; i<props.amount; i++)
    {
       if (i === props.position) dots.push(<span key={nanoid} className="dot active" onClick={()=>props.selectImageWithDot(i)}></span>)
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
        else  dots.push(<span key={nanoid(10)} className="dot" onClick={()=>props.selectImageWithDot(i)}></span>)
    }

    return(
        <div className="dot-container">
         {dots}
        </div>
    )
}