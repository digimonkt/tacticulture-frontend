import React from "react";
import TimezoneSelect, { ITimezone } from "react-timezone-select";
import styles from "./timeZone.module.css";

interface timezoneI {
  timeZoneValue: ITimezone | string;
  handleTimeZoneValue: (arg: ITimezone | string) => void;
}

function TimeZoneComponent({ timeZoneValue, handleTimeZoneValue }: timezoneI) {
  return (
    <div className="pe-4 ps-4">
      <div className={`${styles.selectWrapper}`}>
        <h1>Time zone</h1>
        <TimezoneSelect
          value={timeZoneValue}
          onChange={(e) => handleTimeZoneValue(e.value)}
        />
      </div>
    </div>
  );
}

export default TimeZoneComponent;
