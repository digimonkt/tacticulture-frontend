import React, { useState } from "react";
import InstructorLayout from "../layout";
import { SVG } from "@/assets/svg";
import { Checkbox } from "antd";
import styles from "./availability.module.css";
import ScheduleEventComponent, {
  IScheduleEvent,
} from "@/component/schedule-event";
import { OutlinedButton } from "@/component/buttons";

const scheduleEvents: IScheduleEvent[] = [
  { id: "sun", day: "SUN", isChecked: false, schedules: [] },
  { id: "mon", day: "MON", isChecked: false, schedules: [] },
  { id: "tue", day: "TUE", isChecked: false, schedules: [] },
  { id: "wed", day: "WED", isChecked: false, schedules: [] },
  { id: "thu", day: "THU", isChecked: false, schedules: [] },
  { id: "fri", day: "FRI", isChecked: false, schedules: [] },
  { id: "sat", day: "SAT", isChecked: false, schedules: [] },
];

function Availability() {
  const [availability, setAvailability] = useState(scheduleEvents);

  //   handleRemoveSchedule,

  const handleRemoveSchedule = (idx: number) => (scheduleIndex: number) => {
    const newAvailability = [...availability];
    const at = { ...newAvailability[idx] };
    at.schedules.splice(scheduleIndex, 1);
    setAvailability(newAvailability);
  };
  const handleUpdateStart =
    (idx: number) => (scheduleIndex: number, value: string) => {
      const newAvailability = [...availability];
      const at = { ...newAvailability[idx] };
      const scheduleAt = at.schedules[scheduleIndex];
      scheduleAt.startTime = value;

      newAvailability[idx] = at;
      setAvailability(newAvailability);
    };
  const handleUpdateEnd =
    (idx: number) => (scheduleIndex: number, value: string) => {
      const newAvailability = [...availability];
      const at = { ...newAvailability[idx] };
      const scheduleAt = at.schedules[scheduleIndex];
      scheduleAt.endTime = value;

      newAvailability[idx] = at;
      setAvailability(newAvailability);
    };

  const handleAddSchedule = (idx: number) => () => {
    const newAvailability = [...availability];
    const at = { ...newAvailability[idx] };
    at.schedules.push({
      startTime: "",
      endTime: "",
    });

    at.isChecked = true;

    newAvailability[idx] = at;
    setAvailability(newAvailability);
  };

  const handleChangeChecked = (idx: number) => (value: boolean) => {
    const newAvailability = [...availability];
    const at = { ...newAvailability[idx] };
    at.isChecked = value;
    newAvailability[idx] = at;
    setAvailability(newAvailability);
  };

  return (
    <div>
      <InstructorLayout>
        <div>
          <h3
            style={{
              fontSize: "37px",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "1px",
              paddingTop: "10px",
              paddingBottom: "0px",
            }}
          >
            Set Your Availability
          </h3>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            Define your availability for your Open Schedule Events{" "}
            <SVG.InfoIcon width="18px" />
          </p>
          <div className={`${styles.Availability}`}>
            <div className="d-flex text-white align-items-center">
              <Checkbox />
              <p
                className="mb-0 ms-2"
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#fff",
                  letterSpacing: "1px",
                }}
              >
                Auto-detect Location-defined Time zone
              </p>
              <div style={{ position: "relative", bottom: "10px" }}>
                {/* <TimezoneComponent /> */}
              </div>
            </div>
            {availability.map((available, idx) => {
              return (
                <ScheduleEventComponent
                  key={idx}
                  {...available}
                  handleAddSchedule={handleAddSchedule(idx)}
                  handleChangeChecked={handleChangeChecked(idx)}
                  handleUpdateStart={handleUpdateStart(idx)}
                  handleUpdateEnd={handleUpdateEnd(idx)}
                  handleRemoveSchedule={handleRemoveSchedule(idx)}
                />
              );
            })}
            <div className="d-flex align-items-center pt-3">
              <OutlinedButton
                className={`${styles.WidthBtn}`}
                style={{
                  fontSize: "17px",

                  height: "35px",
                  fontWeight: "700",
                  color: "#fff",
                  letterSpacing: "1px",
                  background: "transparent",
                  borderRadius: "4px",
                  border: "1px solid #fff",
                  fontFamily: "Proxima Nova",
                }}
              >
                + Add a Date Override{" "}
              </OutlinedButton>
              <span
                className="text-white"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Add specific dates when your availability
                <br /> changes from your weekly hours
              </span>
            </div>
          </div>
        </div>
      </InstructorLayout>
    </div>
  );
}

export default Availability;
