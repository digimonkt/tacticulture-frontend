import React, { useEffect, useState } from "react";
import styles from "../../course.module.css";
import { LabeledInput, SelectInput } from "@/component/input";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { FilledButton } from "@/component/buttons";

interface IScheduleDate {
  errorsData: any;
  index: number;
  eventData: {
    id?: number;
    eventStartDate?: string;
    eventStartTime?: string;
    eventEndDate?: string;
    eventEndTime?: string;
  };
  // formError: (errors: any) => void;
  spanDefaultValue: {
    scheduleAvailabilityPeriod: number;
    scheduleAvailabilityPeriodUnit: string;
  };
  // scheduleSpan: (scheduleTimeSpan: {
  //   scheduleAvailabilityPeriod: number;
  //   scheduleAvailabilityPeriodUnit: string;
  // }) => void;
  getChildValue: (arg: { key: string; value: string }) => void;
}

function ScheduleDateComponent({
  eventData,
  index,
  errorsData,
  getChildValue,
  spanDefaultValue,
}: // scheduleSpan,
IScheduleDate) {
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
      // eventStartTime: Yup.string().required("Start time is required"),
      // eventEndDate: Yup.string().required("End date is required"),
      // eventEndTime: Yup.string().required("End time is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    setScheduleTimeSpan(spanDefaultValue);
  }, []);

  // useEffect(() => {
  //   scheduleSpan(scheduleTimeSpan);
  // }, [scheduleTimeSpan]);

  return (
    <>
      <div className={`${styles.scheduleDate}`}>
        <div className={`${styles.eventDate}`}>
          <h3>Scheduled Event #{eventData?.id}</h3>
        </div>
        <hr />
        <div className={`${styles.startTime}`}>
          <label>Event Start Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              type="date"
              className="me-3"
              value={eventData?.eventStartDate}
              onChange={(e) => {
                formik.setFieldValue("eventStartDate", e.target.value);
                getChildValue({ key: "eventStartDate", value: e.target.value });
              }}
            />
            {/* {errorsData &&
              errorsData[index] &&
              errorsData[index].eventStartDate && (
                <p style={{ color: "red" }}>
                  {errorsData[index].eventStartDate}
                </p>
              )} */}

            <LabeledInput
              type="time"
              value={eventData?.eventStartTime}
              onChange={(e) => {
                formik.setFieldValue("eventStartTime", e.target.value);
                getChildValue({ key: "eventStartTime", value: e.target.value });
              }}
            />
          </div>
          <div className="alerts">
            <p style={{ color: "red" }}>
              {errorsData?.[index]?.eventStartDate || ""}
            </p>
            <p style={{ color: "red" }}>
              {errorsData?.[index]?.eventStartTime || ""}
            </p>
          </div>
        </div>
        <div className={`${styles.startTime}`}>
          <label>Event End Date / Time*</label>
          <div className="d-flex align-items-center">
            <LabeledInput
              type="date"
              className="me-3"
              value={eventData?.eventEndDate}
              onChange={(e) => {
                formik.setFieldValue("eventEndDate", e.target.value);
                getChildValue({ key: "eventEndDate", value: e.target.value });
              }}
            />

            <LabeledInput
              type="time"
              value={eventData?.eventEndTime}
              onChange={(e) => {
                formik.setFieldValue("eventEndTime", e.target.value);
                getChildValue({ key: "eventEndTime", value: e.target.value });
              }}
            />
          </div>
          <div className="alerts">
            <p style={{ color: "red" }}>
              {errorsData?.[index]?.eventEndDate || ""}
            </p>
            <p style={{ color: "red" }}>
              {errorsData?.[index]?.eventEndTime || ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ScheduleDateComponent.defaultProps = {
//   eventData: {},
// };

export default ScheduleDateComponent;
