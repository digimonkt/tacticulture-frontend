import React from "react";
import { Select } from "antd";

const handleChange = (value: { value: string; label: React.ReactNode }) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
function SelectDropdown() {
  return (
    <div className="DropdownSelects">
      <Select
        labelInValue
        defaultValue={{ value: "lucy", label: "Lucy (101)" }}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack (100)",
          },
          {
            value: "lucy",
            label: "Lucy (101)",
          },
        ]}
      />
    </div>
  );
}

export default SelectDropdown;
