import React from "react";
import { Checkbox } from "antd";

function CheckBoxComponent({ ...rest }) {
  return (
    <div>
      <Checkbox {...rest}></Checkbox>
    </div>
  );
}

export default CheckBoxComponent;
