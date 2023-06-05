import { SVG } from "@/assets/svg";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import React from "react";

interface ISelectInput extends SelectProps<any> {
  label?: string;
  class?: string;
}

function SelectInputComponent({ label, ...rest }: ISelectInput) {
  return (
    <div>
      <p className="mb-1 mt-3">{label}</p>
      <Select
        suffixIcon={<SVG.DownChevron width="16px" />}
        style={{ width: 120 }}
        {...rest}
      />
    </div>
  );
}

export default SelectInputComponent;
