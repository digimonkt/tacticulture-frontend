import UserCardComponent from "@/component/card/user-card";
import { Col, Row } from "antd";
import React, { useState } from "react";
import styles from "../../course.module.css";
import ScheduleDateComponent from "../schedule-date";
import OpenAvailabilityComponent from "./components/open-avalability";
import EventHeaderComponent from "../event-header";
import { EVENT_SCHEDULE_TYPES } from "@/utils/enum";
import { eventScheduleTypes } from "@/utils/constant";
import { useFormik } from "formik";

export type EventSchduledType = {
  eventStartDatetime: string;
  eventEndDatetime: string;
};

type initialValuesType = {
  eventScheduledList: EventSchduledType[];
};

function EventScheduleComponent() {
  // state management
  const [selectedType, setSelectedType] = useState("");

  // formik
  const formik = useFormik<initialValuesType>({
    initialValues: {
      eventScheduledList: [],
    },
    onSubmit: (values) => {
      console.log("vlaues ", values);
    },
  });

  return (
    <div className="schedule">
      <EventHeaderComponent heading="Event Details" />
      <div className={`${styles.headerComponent}`}>
        <Row>
          {eventScheduleTypes.map((type) => (
            <Col md={8} key={type.id}>
              <UserCardComponent
                onClick={() => setSelectedType(type.scheduleType)}
                selected={type.scheduleType === selectedType}
                heading={type.title}
                content={type.description}
              />
            </Col>
          ))}
        </Row>
        {(selectedType === EVENT_SCHEDULE_TYPES.scheduledEvent ||
          selectedType === EVENT_SCHEDULE_TYPES.combined) && (
          <ScheduleDateComponent
            eventScheduledList={formik.values.eventScheduledList || []}
            handleUpdateList={(values) =>
              formik.setFieldValue("eventScheduledList", values)
            }
          />
        )}
        {(selectedType === EVENT_SCHEDULE_TYPES.openScheduled ||
          selectedType === EVENT_SCHEDULE_TYPES.combined) && (
          <OpenAvailabilityComponent />
        )}
      </div>
    </div>
  );
}

export default EventScheduleComponent;
