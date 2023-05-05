import React from "react";
import styles from "../../styles.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton, RadioButton } from "@/component/buttons";
import SelectInputComponent from "@/component/input/selectInput";

function EmailPreferenceComponent() {
  const List = [
    {
      id: 1,
      list: "All New Activity",
    },
    {
      id: 2,
      list: "Only Event Updates",
    },
    {
      id: 3,
      list: "Nothing",
    },
  ];
  const FrequencyList = [
    {
      id: 1,
      list: "Real-Time Updates",
    },
    {
      id: 2,
      list: "Once every day",
    },
    {
      id: 3,
      list: "One a week",
    },
  ];
  return (
    <div>
      <h3
        style={{
          fontSize: "24px",
          fontFamily: "Proxima Nova",
          letterSpacing: "1px",
          color: "#fff",
          fontWeight: "800",
        }}
      >
        Email Preferences
      </h3>
      <div className={`${styles.emailPreference}`}>
        <ul className="p-0">
          <h6>Send emails about...</h6>
          {List.map((List) => (
            <li key={List.id}>
              <RadioButton />
              {List.list}
            </li>
          ))}
        </ul>
        <ul className="p-0">
          <h6>Update Frequency:</h6>
          {FrequencyList.map((FrequencyList) => (
            <li key={FrequencyList.id}>
              <RadioButton />
              {FrequencyList.list}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.snooze}`}>
        <div>
          {" "}
          <SVG.ZSIGN width="26px" />
          <span
            style={{
              color: "#fff",
              fontFamily: "Proxima Nova",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Snooze Notifications:
          </span>
        </div>
        <div className="snoozedropdown">
          <SelectInputComponent />
        </div>
      </div>
      <div className="text-end">
        <FilledButton className={`${styles.saveChange}`}>
          Save Changes
        </FilledButton>
      </div>
    </div>
  );
}

export default EmailPreferenceComponent;
