import React from "react";
import '../styles/PaginationStyles.css'

function Pagination(props)
{
    const [pageNumber, SetPageNumber] = React.useState(1);
    const [activePage, setActivePage] = React.useState(1);

//how to combine this with Sort?
  function changeLink()
    {
        switch(pageNumber)
        {
            case 1:
            props.setSource('https://dummyjson.com/products?limit=20&skip=10');
            break;

            case 2:
            props.setSource('https://dummyjson.com/products?limit=20&skip=30');
            break;

            case 3:
            props.setSource('https://dummyjson.com/products?limit=20&skip=50');
            break;

            case 4:
            props.setSource('https://dummyjson.com/products?limit=20&skip=70');
            break;

            case 5:
            props.setSource('https://dummyjson.com/products?limit=20&skip=90');
            break;

            case 6:
            props.setSource('https://dummyjson.com/products?limit=20&skip=110');
            break;
            
            default:
            props.setSource('https://dummyjson.com/products?limit=20&skip=130');

        }
    }

  React.useEffect(() => {
    changeLink();
  }, [pageNumber]);

    function prevPage()
    {   if(pageNumber>1) {SetPageNumber(prevState => prevState -1); setActivePage(prevState => prevState -1);}
    }
    function nextPage()
    {
        if(pageNumber<6) {SetPageNumber(prevState => prevState +1); setActivePage(prevState => prevState +1);}
    }
    function setNumber(i)
    {
       SetPageNumber(i);
       setActivePage(i);
    }

    return (
        <>
        <div className="pagination-container">
    <div className="pagination">
        <a href="#" onClick={prevPage}>&laquo;</a>
        <a href="#" onClick={()=>setNumber(1)} id={activePage === 1 ? "on-this-page": "not-on-this-page"}>1</a>
        <a href="#" onClick={()=>setNumber(2)} id={activePage === 2 ? "on-this-page": "not-on-this-page"}>2</a>
        <a href="#" onClick={()=>setNumber(3)} id={activePage === 3 ? "on-this-page": "not-on-this-page"}>3</a>
        <a href="#" onClick={()=>setNumber(4)} id={activePage === 4 ? "on-this-page": "not-on-this-page"}>4</a>
        <a href="#" onClick={()=>setNumber(5)} id={activePage === 5 ? "on-this-page": "not-on-this-page"}>5</a>
        <a href="#" onClick={()=>setNumber(6)} id={activePage === 6 ? "on-this-page": "not-on-this-page"}>6</a>
        <a href="#" onClick={nextPage}>&raquo;</a>
    </div>
    </div>
        </>
    )
}
export default Pagination