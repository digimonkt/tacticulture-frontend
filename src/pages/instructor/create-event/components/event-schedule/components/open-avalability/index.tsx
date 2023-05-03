import React, { useState } from "react";
import styles from "../../../../course.module.css";
import { OutlinedButton } from "@/component/buttons";
import ScheduleEventComponent, {
  IScheduleEvent,
} from "@/component/schedule-event";

const scheduleEvents: IScheduleEvent[] = [
  { id: "sun", day: "SUN", isChecked: false, schedules: [] },
  { id: "mon", day: "MON", isChecked: false, schedules: [] },
  { id: "tue", day: "TUE", isChecked: false, schedules: [] },
  { id: "wed", day: "WED", isChecked: false, schedules: [] },
  { id: "thu", day: "THU", isChecked: false, schedules: [] },
  { id: "fri", day: "FRI", isChecked: false, schedules: [] },
  { id: "sat", day: "SAT", isChecked: false, schedules: [] },
];

function OpenAvailabilityComponent() {
  const [isComponent, setIsComponent] = useState(false);
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
    <>
      <div className={`${styles.scheduleDate}`}>
        <div className={`${styles.eventDate}`}>
          <div className="d-flex justify-content-between align-items-baseline p-0">
            <h3>Open Availability</h3>
            <div className="d-flex">
              <OutlinedButton
                className={
                  isComponent
                    ? "w-auto mt-0 me-2 openbtn"
                    : "w-auto mt-0 me-2 activeborder openbtn"
                }
              >
                Use My Default Availability
              </OutlinedButton>
              <OutlinedButton
                className={
                  isComponent
                    ? "w-auto mt-0 me-2 activeborder openbtn"
                    : "w-auto mt-0 me-2 openbtn"
                }
                onClick={() => setIsComponent(!isComponent)}
              >
                Set Custom Hours
              </OutlinedButton>
            </div>
          </div>
        </div>
        <hr />
        <div className="scheduleSection">
          {isComponent && (
            <>
              {" "}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OpenAvailabilityComponent;
