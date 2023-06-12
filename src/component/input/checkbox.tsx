import React from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

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
