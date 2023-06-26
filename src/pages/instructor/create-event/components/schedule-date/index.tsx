import React, { useEffect, useState } from "react";
import styles from "../../course.module.css";
import { LabeledInput, SelectInput } from "@/component/input";
// import { FilledButton } from "@/component/buttons";

interface IScheduleDate {
  eventData: {
    id?: number;
    eventStartDate: string;
    eventStartTime: string;
    eventEndDate: string;
    eventEndTime: string;
  };
  scheduleSpan: (period: string, periodUnit: string) => void;
  getChildValue: (arg: { key: string; value: string }) => void;
}

function ScheduleDateComponent({
  eventData,
  getChildValue,
  scheduleSpan,
}: IScheduleDate) {
  const [scheduleTimeSpan, setScheduleTimeSpan] = useState();

  useEffect(() => {
    scheduleSpan(scheduleTimeSpan);
  }, [scheduleTimeSpan]);
  return (
    <>
      <div className={`${styles.scheduleDate}`}>
        <div className={`${styles.eventDate}`}>
          <h3>Scheduled Event #{eventData.id}</h3>
        </div>
        <hr />
        <div className={`${styles.startTime}`}>
          <label>Event Start Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              type="date"
              className="me-3"
              value={eventData.eventStartDate}
              onChange={(e) =>
                getChildValue({ key: "eventStartDate", value: e.target.value })
              }
            />
            <LabeledInput
              type="time"
              value={eventData.eventStartTime}
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
              value={eventData.eventEndDate}
              onChange={(e) =>
                getChildValue({ key: "eventEndDate", value: e.target.value })
              }
            />
            <LabeledInput
              type="time"
              value={eventData.eventEndTime}
              onChange={(e) =>
                getChildValue({ key: "eventEndTime", value: e.target.value })
              }
            />
          </div>
          <div className="text-start">
            <label className="p-0">Set the event time span</label>
            <div className="startDate">
              <LabeledInput
                type="number"
                // value={}
                onChange={(e) =>
                  setScheduleTimeSpan({
                    ...scheduleTimeSpan,
                    scheduleAvailabilityPeriod: e.target.value,
                  })
                }
              />
              <SelectInput
                onChange={(value) =>
                  setScheduleTimeSpan({
                    ...scheduleTimeSpan,
                    scheduleAvailabilityPeriodUnit: value,
                  })
                }
                options={[
                  { value: "hours", label: "Hours" },
                  { value: "Time", label: "Time" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ScheduleDateComponent.defaultProps = {
  eventData: {},
};

export default ScheduleDateComponent;
