import React from "react";
import '../styles/PaginationStyles.css'
import { nanoid } from "nanoid";
/**/
function Pagination(props)
{
    const [pageNumber, SetPageNumber] = React.useState(1);
    //this will help to identify and style currently selected page number
    const [activePage, setActivePage] = React.useState(1);
   // const [pageAmount, setPageAmount] = React.useState();/*Math.ceil(props.numberOfProd / 20)*;*/
   //dont need to make this a state?
    const pageAmount = Math.ceil(props.numberOfProd / 20);
  
//how to combine this with Sort?
  function changeLink()
    {
        //display 20 items on each page
        var skipAmount= pageNumber * 20 - 10;
         props.setSource(`https://dummyjson.com/products?limit=20&skip=${skipAmount}`);
    }

  React.useEffect(() => {
    changeLink();
  }, [pageNumber]);

    function prevPage()
    {   if(pageNumber>1) {SetPageNumber(prevState => prevState -1); setActivePage(prevState => prevState -1);}
    }
    function nextPage()
    {
        if(pageNumber<pageAmount) {SetPageNumber(prevState => prevState +1); setActivePage(prevState => prevState +1);}
    }
    /*clicking on a page number*/
    function setNumber(i)
    {
       SetPageNumber(i);
       setActivePage(i);
    }
    function printPageLinks()
    {
        var links = [];

       for (let i=1; i<=pageAmount; i++)
        {
            links.push(<a href="#" key={nanoid(4)} onClick={()=>setNumber(i)} id={activePage === i ? "on-this-page": "not-on-this-page"}>{i}</a>)
        }
        return links;
        
    }

    return (
        <>
        <div className="pagination-container">
    <div className="pagination">
        <a href="#" onClick={prevPage}>&laquo;</a>
        {
            printPageLinks()
        }
        <a href="#" onClick={nextPage}>&raquo;</a>
    </div>
    </div>
        </>
    )
}
export default Pagination