import React, { useState, useEffect } from "react";
// import styles from " @/pages/instructor/create-event/course.module.css";
import styles from "../../../../course.module.css";
import { OutlinedButton } from "@/component/buttons";
import ScheduleEventComponent, {
  IScheduleEvent,
} from "@/component/schedule-event";
import { createEvent } from "@/redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { WEEKDAYS } from "@/utils/enum";
import { LabeledInput, SelectInput } from "@/component/input";

const scheduleEvents: IScheduleEvent[] = [
  {
    id: "sun",
    day: "SUN",
    value: WEEKDAYS.sunday,
    isChecked: false,
    schedules: [],
  },
  {
    id: "mon",
    day: "MON",
    value: WEEKDAYS.monday,
    isChecked: false,
    schedules: [],
  },
  {
    id: "tue",
    day: "TUE",
    value: WEEKDAYS.tuesday,
    isChecked: false,
    schedules: [],
  },
  {
    id: "wed",
    day: "WED",
    value: WEEKDAYS.wednesday,
    isChecked: false,
    schedules: [],
  },
  {
    id: "thu",
    day: "THU",
    value: WEEKDAYS.thursday,
    isChecked: false,
    schedules: [],
  },
  {
    id: "fri",
    day: "FRI",
    value: WEEKDAYS.friday,
    isChecked: false,
    schedules: [],
  },
  {
    id: "sat",
    day: "SAT",
    value: WEEKDAYS.saturday,
    isChecked: false,
    schedules: [],
  },
];

export type availabilityType = {
  id: string;
  day: string;
  value: string;
  isChecked: boolean;
  schedules: { startDate: string }[];
};

function OpenAvailabilityComponent({ customAvailabilityData }: any) {
  const dispatch = useAppDispatch();
  const [isComponent, setIsComponent] = useState("default");
  const [availability, setAvailability] = useState(scheduleEvents);
  const [availabilityId, setAvailabilityId] = useState(0);

  useEffect(() => {
    customAvailabilityData(availability);
  }, [availability]);

  useEffect(() => {
    getAvailabilityId();
  }, [isComponent]);

  useEffect(() => {
    dispatch(
      createEvent({
        defaultAvailability:
          availabilityId > 0 && isComponent === "default"
            ? availabilityId
            : null,
      })
    );
  }, [isComponent]);

  const getAvailabilityId = async () => {
    const id = await localStorage.getItem("defaultAvailabilityId");
    if (id) {
      setAvailabilityId(parseInt(id));
    }
  };

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
    (idx: number) => async (scheduleIndex: number, value: string) => {
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
    // console.log(at, "atttt");
    at?.schedules?.push({
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

  const { eventData } = useAppSelector((state) => state.EventReducer);
  const { currentUser, defaultAvailability } = useAppSelector(
    (state) => state.userReducer
  );
  // console.log(defaultAvailability);
  return (
    <>
      <div className={`${styles.scheduleDate}`}>
        <div className={`${styles.eventDate}`}>
          <div className="d-flex justify-content-between align-items-baseline p-0">
            <h3>Open Availability</h3>
            <div className="d-flex">
              <OutlinedButton
                className={
                  isComponent === "default"
                    ? "w-auto mt-0 me-2 activeborder openbtn"
                    : "w-auto mt-0 me-2 openbtn"
                }
                onClick={() => setIsComponent("default")}
              >
                Use My Default Availability
              </OutlinedButton>
              <OutlinedButton
                className={
                  isComponent === "custom"
                    ? "w-auto mt-0 me-2 activeborder openbtn"
                    : "w-auto mt-0 me-2 openbtn"
                }
                onClick={() => setIsComponent("custom")}
              >
                Set Custom Hours
              </OutlinedButton>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-start">
          <label className="p-0">Set the event time span</label>
          <div className="startDate">
            <LabeledInput />
            <SelectInput
              options={[
                { value: "Hours", label: "Hours" },
                { value: "Time", label: "Time" },
              ]}
            />
          </div>
        </div>
        {/* </div> */}
        <div className="scheduleSection">
          {isComponent === "custom" && (
            <div>
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
            </div>
          )}
          {/* <h1
            onClick={() =>
              dispatch(createEvent({ eventCustomAvailability: availability }))
            }
          >
            submit
          </h1> */}
        </div>
      </div>
    </>
  );
}

export default OpenAvailabilityComponent;
