import React from "react";
import Navbar from '../components/Navbar'
import Sidemenu from "../components/Sidemenu";

export default function Contact(){

    //get width
    //  why do i need width????????????
  /*const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);*/
    
    return (
        <div>
             <Navbar/>
               <div className='main-content-container'>
            
                <div className='sidemenu-filterpane-mobile'> 
                <Sidemenu show={()=>toggleShowHide("myDropdown")}/>  
                  
                </div>
                <div className="contact-page">
                   <h1>
                    Contacts:
                   </h1>
                </div>
               {/* elements for contact page here here */}

              
                </div>
        </div>
    );
}