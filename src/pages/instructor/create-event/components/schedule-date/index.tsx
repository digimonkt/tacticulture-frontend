import React from "react";
import styles from "../../course.module.css";
import { LabeledInput } from "@/component/input";
// import { FilledButton } from "@/component/buttons";

function ScheduleDateComponent({ value, getChildValue, startDate }) {
  return (
    <>
      <div className={`${styles.scheduleDate}`}>
        <div className={`${styles.eventDate}`}>
          <h3>Scheduled Event #{value}</h3>
        </div>
        <hr />
        <div className={`${styles.startTime}`}>
          <label>Event Start Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              type="date"
              className="me-3"
              value={startDate}
              onChange={(e) =>
                getChildValue({ key: "eventStartDate", value: e.target.value })
              }
            />
            <LabeledInput
              type="time"
              onChange={(e) =>
                getChildValue({ key: "eventStartTime", value: e.target.value })
              }
            />
          </div>
        </div>
        <div className={`${styles.startTime}`}>
          <label>Event End Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              type="date"
              className="me-3"
              onChange={(e) =>
                getChildValue({ key: "eventEndDate", value: e.target.value })
              }
            />
            <LabeledInput
              type="time"
              onChange={(e) =>
                getChildValue({ key: "eventEndTime", value: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      {/* <FilledButton
        style={{
          fontSize: " 17px",
          color: "#fff",
          fontWeight: "700",
          letterSpacing: "1px",
          width: "299px",
          height: "37px",
          borderRadius: "3px",
          marginLeft: " 21px",
          marginBottom: " 20px",
        }}
      >
        + Add Another Scheduled Event
      </FilledButton> */}
    </>
  );
}

export default ScheduleDateComponent;
