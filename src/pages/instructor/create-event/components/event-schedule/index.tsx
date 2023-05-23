import UserCardComponent from "@/component/card/user-card";
import { Col, Row } from "antd";
import React, { useState } from "react";
import styles from "../../course.module.css";
import ScheduleDateComponent from "../schedule-date";
import OpenAvailabilityComponent from "./components/open-avalability";
import EventHeaderComponent from "../event-header";

function EventScheduleComponent() {
  const [show, setShow] = useState(false);
  return (
    <div className="schedule">
      <EventHeaderComponent heading="Event Details" />
      <div className={`${styles.headerComponent}`}>
        <Row className="userBoxed">
          <Col md={8}>
            <UserCardComponent
              heading="Scheduled Event(s) "
              content="A single-date calendar event with limited availability."
            />
          </Col>
          <Col md={8}>
            <UserCardComponent
              heading="Open Schedule"
              content="A user can schedule an event based on your availability."
            />
          </Col>
          <Col md={8}>
            <UserCardComponent
              heading="Combined"
              content="Both event types, all your availability in one event."
              onClick={() => setShow(!show)}
              selected={show}
            />
          </Col>
        </Row>
        {show && <ScheduleDateComponent />}
        <OpenAvailabilityComponent />
      </div>
    </div>
  );
}

export default EventScheduleComponent;
