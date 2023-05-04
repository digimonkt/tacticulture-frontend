import { Select } from "antd";
import React from "react";

function SelectInputComponent() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
        ]}
      />
    </div>
  );
}

export default SelectInputComponent;
