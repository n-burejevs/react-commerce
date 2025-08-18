
/*Small dots uner the image gallery that indicate which image is the current one out of whats available*/
export default function Dots(props)
{
    var dots = [];
    for(let i=0; i<props.amount; i++)
    {
       if (i === props.position) dots.push(<span key={i} className="dot active" onClick={()=>props.selectImageWithDot(i)}></span>)
  
        else  dots.push(<span key={i} className="dot" onClick={()=>props.selectImageWithDot(i)}></span>)
    }

    return(
        <div className="dot-container">
         {dots}
        </div>
    )
}