//read for fun: https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816
//guide to follow:
//https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1
const MultiRangeSlider = () => {

return (
    <>
      <input
        type="range"
        min="0"
        max="1000"
        className="thumb thumb--zindex-3"
      />
      <input
        type="range"
        min="0"
        max="1000"
        className="thumb thumb--zindex-4"
      />
    </>
  );
};

export default MultiRangeSlider;