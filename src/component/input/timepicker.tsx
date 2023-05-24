import React from "react";
import { TimePicker } from "antd";

function TimePickerComponent({ ...rest }) {
  return (
    <div>
      <TimePicker
        {...rest}
        minuteStep={15}
        inputReadOnly
        secondStep={10}
        hourStep={1}
      />
    </div>
  );
}

export default TimePickerComponent;
