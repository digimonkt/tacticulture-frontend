import * as React from "react";
import { Radio } from "antd";

interface IRadioInput {
  label?: React.ReactNode;
}

export default function RadioButtons({ label }: IRadioInput) {
  return (
    <>
      <Radio>{label}</Radio>
    </>
  );
}
