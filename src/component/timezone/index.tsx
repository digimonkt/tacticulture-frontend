import React from "react";
import TimezoneSelect, { Props as ITimezoneProps } from "react-timezone-select";
import styles from "./timeZone.module.css";

interface timezoneI extends ITimezoneProps {
  title?: string;
}

function TimeZoneComponent({ title, ...rest }: timezoneI) {
  return (
    <div className="pe-4 ps-4">
      <div className={`${styles.selectWrapper}`}>
        {title && <h1>{title}</h1>}
        <TimezoneSelect {...rest} />
      </div>
    </div>
  );
}

export default TimeZoneComponent;
