import React, { useState, useEffect } from "react";
import InstructorLayout from "../layout";
import { SVG } from "@/assets/svg";
import { Button, Checkbox } from "antd";
import styles from "./availability.module.css";
import ScheduleEventComponent, {
  IScheduleEvent,
  ISpecificData,
} from "@/component/schedule-event";
import { OutlinedButton } from "@/component/buttons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { updateUserAvailability } from "@/redux/reducers/user";
import { AvailabilityPayloadType } from "@/api/types/user";
import { WEEKDAYS } from "@/utils/enum";

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
const specificData: ISpecificData[] = [
  {
    date: "2023-07-01",
    timeZone: "asia",
    availableHours: [
      {
        fromTime: "12:00",
        toTime: "13:00",
      },
    ],
  },
];

function Availability() {
  const dispatch = useAppDispatch();
  const [availability, setAvailability] = useState(scheduleEvents);
  const [timezoneData, setTimezoneData] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const { defaultAvailability } = useAppSelector((state) => state.userReducer);

  // console.log(defaultAvailability, "deff");
  useEffect(() => {
    // setAvailability(defaultEvent);
    const updatedAvailability = availability.map((avail) => {
      const matchingEvent = defaultAvailability.userCustomAvailability.find(
        (event: any) => event.day === avail.value
      );

      if (matchingEvent) {
        return {
          ...avail,
          schedules: matchingEvent.timeArray.map((detail: any) => ({
            startTime: detail.fromTime,
            endTime: detail.toTime,
          })),
          isChecked: true,
        };
      }

      return avail;
    });

    setAvailability(updatedAvailability);
  }, []);

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

  const submitData = () => {
    const data = availability.filter((el) => {
      return el.isChecked;
    });
    const availableArray = data.map((eve) => {
      return {
        day: eve.value,
        timeArray: eve.schedules.map((schedule) => {
          return { fromTime: schedule.startTime, toTime: schedule.endTime };
        }),
      };
    });

    const payload: AvailabilityPayloadType = {
      timeZone: "asia",
      userCustomAvailability: availableArray,
      specificDate: specificData,
    };
    dispatch(updateUserAvailability(payload));
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
                {/* <TimeZoneComponent
                  value={timezoneData}
                  onChange={(vl) => setTimezoneData(vl.value)}
                /> */}
              </div>
            </div>
            {availability.map((available, idx) => {
              return (
                <ScheduleEventComponent
                  errors={[]}
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
                className={`${styles.widthBtn}`}
                // onClick={() => setOpencalendar(!opencalendar)}
                style={{
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
              <Button
                onClick={submitData}
                title="Save"
                style={{ color: "#000" }}
              />
            </div>
          </div>
        </div>
        {/* {opencalendar && (
          <div className={`${styles.calendarPopup}`}>
            <h3>Select the date(s) you want to assign specific hours</h3>
            <DatePicker onDayClick={handleDateClick} />
            <div className="timezoneData">
              <SVG.EarthIcon width="18px" />
              <label>Timezone:</label>
              <div className="timeSelect">
                <TimeZoneComponent
                  value={timezoneData}
                  onChange={(vl) => setTimezoneData(vl.value)}
                />
              </div>
            </div>
            <div className={`${styles.hourSection}`}>
              <h6>What hours are you available?</h6>
              <div className="timeZone">
                <TimePickerComponent />
                <span
                  style={{
                    margin: "0 7px",
                    color: "#333333",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  -
                </span>
                <TimePickerComponent />
                <div className={`${styles.appendIcon}`}>
                  <SVG.Trash width="20px" className={`${styles.trashIcon}`} />
                  <SVG.Plus width="20px" className={`${styles.plusIcon}`} />
                </div>
              </div>
            </div>
          </div>
        )} */}
      </InstructorLayout>
    </div>
  );
}

export default Availability;
