import { IInput } from "@/component/input";
import { Input } from "antd";
import React from "react";
interface ILabeledInput extends IInput {
  label?: React.ReactNode;
}
function LabeledInputComponent({ label, ...rest }: ILabeledInput) {
  return (
    <>
      {label ? <label>{label}</label> : ""}
      <Input style={{ background: "#fff" }} {...rest} />
    </>
  );
}

export default LabeledInputComponent;
