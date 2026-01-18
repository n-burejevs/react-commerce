import  React from "react";
import '../styles/Sldieshow.css';
import MobileSwiper from "../components/mobile-swiper";
import arrow from '../assets/arrow.-btn.png';
import arrowReverse from '../assets/arrow.-btn-left.png';
import Dots from '../components/Dots'

export default function Slideshow(props){

    //someone might want to click on a Dot to view an image?
    function selectImageWithDot(id)
    {
        setImageSeqNum(id);
    }

   // const [singleProduct, SetSingleProduct] = React.useState([]);
    const [imageSeqNum, setImageSeqNum] = React.useState(0);
 /// is it better to have a ternary like that inside style?
 //and have whole array of img returened?
       const newImageArray = props.images.map((img, index)=><img key={index} alt="product-image" 
                                 className="single-prod-img" style={ imageSeqNum == index ? {display: "block"} :{display: "none"}} src={img}></img>)
        
        function showNext()
        {
           //console.log("next")
            if(imageSeqNum >= newImageArray.length-1) setImageSeqNum(0);
            else {
                setImageSeqNum(prevState => prevState + 1)
            }
        }
        function showPrev()
        {  // console.log("prev")
            if(imageSeqNum <= 0) setImageSeqNum(newImageArray.length-1)
            else {
                setImageSeqNum(prevState => prevState - 1)
            }
        }
        const handleSwipe = React.useCallback(({ deltaX, deltaY }) => {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    showPrev()
                } else {
                    showNext()
                }//vertical swipes
            } /*else {
                if (deltaY > 0) {
                    moveTiles("move_down")
                } else {
                    moveTiles("move_up")
                }
            }*/
        }, [imageSeqNum])

    return(
        <div>
             
  <div className="gallery-container">
      

     {/* <div className="movable-block" >*/}
      <MobileSwiper onSwipe={handleSwipe}>
      { <button className="next-btn" onClick={showNext}>
        <img className="arrow-btn" src={arrow} alt="Next"></img>
        </button>}

      { <button className="prev-btn" onClick={showPrev}>
        <img className="arrow-btn" src={arrowReverse} alt="Previous"></img>
        </button>}
            {newImageArray/*[imageSeqNum]*/}
            </MobileSwiper>
              
     {/* </div>*/}
     
        </div>
        <Dots amount={newImageArray.length} position={imageSeqNum} selectImageWithDot={selectImageWithDot}/>
        </div>
         
    )
}