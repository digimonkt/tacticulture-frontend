import React from "react";
import styles from "../../course.module.css";
import { LabeledInput } from "@/component/input";
import { FilledButton } from "@/component/buttons";
import { EventSchduledType } from "../event-schedule";

interface IScheduleDateComponent {
  eventScheduledList: EventSchduledType[];
  handleUpdateList: (args: EventSchduledType[]) => void;
}

type HandleUpdateScheduleListType = {
  index: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
};

function ScheduleDateComponent({
  eventScheduledList,
  handleUpdateList,
}: IScheduleDateComponent) {
  // handle update scheduled list
  const handleUpdateScheduledList = ({
    index,
    startDate,
    endDate,
    startTime,
    endTime,
  }: HandleUpdateScheduleListType) => {
    console.log({ startDate, endDate, startTime, endTime, index });
    if (!eventScheduledList.length) {
      // handleUpdateList([{}])
    }
  };

  return (
    <>
      <div className={`${styles.scheduleDate}`}>
        <div className={`${styles.eventDate}`}>
          <h3>Scheduled Event #1</h3>
        </div>
        <hr />
        <div className={`${styles.startTime}`}>
          <label>Event Start Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              onChange={(e) =>
                handleUpdateScheduledList({
                  index: 1,
                  startDate: e.target.value,
                })
              }
              type="date"
              className="me-3"
            />
            <LabeledInput
              type="time"
              onChange={(e) =>
                handleUpdateScheduledList({
                  index: 1,
                  startTime: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className={`${styles.startTime}`}>
          <label>Event End Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              onChange={(e) =>
                handleUpdateScheduledList({
                  index: 1,
                  endDate: e.target.value,
                })
              }
              type="date"
              className="me-3"
            />
            <LabeledInput
              type="time"
              onChange={(e) =>
                handleUpdateScheduledList({
                  index: 1,
                  endTime: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <FilledButton
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
      </FilledButton>
    </>
  );
}

export default ScheduleDateComponent;
