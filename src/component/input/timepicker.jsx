import React from "react";
import { TimePicker } from "antd";

function TimePickerComponent({ className, ...rest }) {
  return (
    <div>
      <TimePicker
        {...rest}
        minuteStep={15}
        inputReadOnly
        className={className}
        secondStep={10}
        hourStep={1}
      />
    </div>
  );
}

export default TimePickerComponent;
