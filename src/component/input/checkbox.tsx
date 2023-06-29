import React from "react";
import { Checkbox } from "antd";

function CheckBoxComponent({ ...rest }) {
  // const onChange = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };
  return (
    <div>
      <Checkbox {...rest}></Checkbox>
    </div>
  );
}

export default CheckBoxComponent;
