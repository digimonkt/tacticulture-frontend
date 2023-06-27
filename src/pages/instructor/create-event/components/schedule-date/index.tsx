import React, { useEffect, useState } from "react";
import styles from "../../course.module.css";
import { LabeledInput, SelectInput } from "@/component/input";
import { SVG } from "@/assets/svg";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { FilledButton } from "@/component/buttons";

interface IScheduleDate {
  eventData: {
    id?: number;
    eventStartDate: string;
    eventStartTime: string;
    eventEndDate: string;
    eventEndTime: string;
  };
  nextPress: () => void;
  scheduleSpan: (scheduleTimeSpan: {
    scheduleAvailabilityPeriod: number;
    scheduleAvailabilityPeriodUnit: string;
  }) => void;
  getChildValue: (arg: { key: string; value: string }) => void;
}

function ScheduleDateComponent({
  eventData,
  getChildValue,
  scheduleSpan,
  nextPress,
}: IScheduleDate) {
  const initialValues = { eventStartDate: "" };
  const [scheduleTimeSpan, setScheduleTimeSpan] = useState({
    scheduleAvailabilityPeriod: 1,
    scheduleAvailabilityPeriodUnit: "hours",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      eventStartDate: Yup.string().required("Start date is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
              onChange={(e) => {
                formik.setFieldValue("eventStartDate", e.target.value);
                getChildValue({ key: "eventStartDate", value: e.target.value });
              }}
            />
            <p style={{ color: "red" }}>{formik.errors.eventStartDate}</p>
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
                defaultValue={1}
                onChange={(e) =>
                  setScheduleTimeSpan({
                    ...scheduleTimeSpan,
                    scheduleAvailabilityPeriod: parseInt(e.target.value),
                  })
                }
              />
              <SelectInput
                defaultValue="hours"
                onChange={(value) =>
                  setScheduleTimeSpan({
                    ...scheduleTimeSpan,
                    scheduleAvailabilityPeriodUnit: value,
                  })
                }
                options={[
                  { value: "hours", label: "Hours" },
                  { value: "day", label: "Day" },
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
