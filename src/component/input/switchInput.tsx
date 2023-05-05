import React from "react";
import { Switch } from "antd";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};
function SwitchInputComponent() {
  return (
    <div>
      <Switch defaultChecked onChange={onChange} />
    </div>
  );
}

export default SwitchInputComponent;
