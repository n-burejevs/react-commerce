import React from "react";
import { nanoid } from "nanoid";
const { useState } = React;

export default function Test() {
    //https://stackoverflow.com/questions/69195359/how-to-work-with-multiple-checkboxes-in-react-and-collect-the-checked-checkboxes
  // With this useState I wan't to collect the checked checkboxes
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // This is my handler method that gets triggered when a checkbox get's checked/unchecked
  // ..and toggles the state of the checkbox
  const handleCheckboxChange = (data) => {
    const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.value === data.value)
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          (checkedCheckbox) => checkedCheckbox.value !== data.value
        )
      );
    } else {
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
    }
  };

  const receivedData = [{ value: "Annibale Colombo" }, { value: "Furniture Co." }, { value: "Bath Trends" }, { value: "Knoll" }];

  return (
    <>
      <div className="checkboxes">
        <h1>Checkboxes:</h1>
        {receivedData?.map((data, index) => (
     <div key={nanoid()}>
       <label>{data.value}</label>
          <input
            key={`cb-${index}`}
            value={data.value}
            type="checkbox"
            checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.value === data.value)}
            onChange={() => handleCheckboxChange(data)}
          />
     </div>
          
        ))}
      </div>
      <div>
        <h1>State:</h1>
        <pre>{JSON.stringify(checkedCheckboxes, null, 2)}</pre>
        <div>

        </div>
      </div>
    </>
  );
};