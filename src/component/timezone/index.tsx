import React from "react";
import TimezoneSelect, {
  ITimezone,
  TimezoneSelectOptions,
} from "react-timezone-select";
import styles from "./timeZone.module.css";

interface timezoneI extends TimezoneSelectOptions {
  timeZoneValue: ITimezone | string;
  handleTimeZoneValue: (arg: ITimezone | string) => void;
}

function TimeZoneComponent({
  timeZoneValue,
  handleTimeZoneValue,
  ...rest
}: timezoneI) {
  return (
    <div className="pe-4 ps-4">
      <div className={`${styles.selectWrapper}`}>
        <h1>Time zone</h1>
        <TimezoneSelect
          value={timeZoneValue}
          onChange={(e) => handleTimeZoneValue(e.value)}
          {...rest}
        />
      </div>
    </div>
  );
}

export default TimeZoneComponent;
