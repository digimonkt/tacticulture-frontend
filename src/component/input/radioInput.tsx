import React from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

interface IRadioInput {
  label?: React.ReactNode;
}

export default function RadioButtons({ label }: IRadioInput) {
  const [value, setValue] = React.useState();
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Schedule Events</Radio>
        <Radio value={2}>Open Availiability</Radio>
      </Radio.Group>
    </>
  );
}
