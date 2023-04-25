import { IInput } from "@/component/input";
import { Input, InputProps } from "antd";
import React from "react";
interface ILabeledInput extends IInput {
  label?: React.ReactNode;
}
function LabeledInputComponent({ label, ...rest }: ILabeledInput) {
  return (
    <>
      {label ? <label>{label}</label> : ""}
      <Input {...rest} />
    </>
  );
}

export default LabeledInputComponent;
