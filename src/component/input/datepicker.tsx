import React from "react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";

function Datepicker({ ...rest }) {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <DatePicker onChange={onChange} {...rest} />
    </div>
  );
}

export default Datepicker;
