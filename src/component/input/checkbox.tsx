import React from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

function CheckBoxComponent() {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      <Checkbox onChange={onChange}></Checkbox>
    </div>
  );
}

export default CheckBoxComponent;
