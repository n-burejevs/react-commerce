import React from "react";
import '../styles/PaginationStyles.css'

/**/
function Pagination(props)
{
    const [pageNumber, SetPageNumber] = React.useState(1);
    //this will help to identify and style currently selected page number
    const [activePage, setActivePage] = React.useState(1);
   //dont need to make this a state?
    var pageAmount = Math.ceil(props.numberOfProd / 20)
  //console.log(pageAmount, "pages", props.numberOfProd, "prods",  props.products, "filtered count:", props.filteredItemsCount);
function changeLink()
{
    //take and display 20 items from the whole list 
    props.setProducts(props.allProducts.slice((20*pageNumber)-20,20*pageNumber))
}

  React.useEffect(() => {
    changeLink();
  }, [pageNumber]);

  //set page to 1 after sorted, otherwise it will show cheapest product on current page(like 2 or 10s)
  React.useEffect(() => {
        SetPageNumber(1);
       setActivePage(1);
  }, [props.allProducts]);

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
            links.push(<a href="#" key={i} onClick={()=>setNumber(i)} id={activePage === i ? "on-this-page": "not-on-this-page"}>{i}</a>)
        }
        
      
        let firstLinks = links.slice(activePage > 0 ? activePage-1 : activePage, activePage < pageAmount ? activePage+1 : activePage);
        let lastLinks = [];  
        if (activePage + 3 >= pageAmount)
        {
            firstLinks = links.slice(-4);
        }
        else
        {
            lastLinks = links.slice(pageAmount -2 , pageAmount);
            firstLinks.push(<a key={'...'} id="not-on-this-page">...</a>)
        }

        links = firstLinks.concat(lastLinks)

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