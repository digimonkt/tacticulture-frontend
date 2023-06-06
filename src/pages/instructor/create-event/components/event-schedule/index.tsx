import UserCardComponent from "@/component/card/user-card";
import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import styles from "../../course.module.css";
import EventHeaderComponent from "../event-header";
import { useRouter } from "next/router";
import ScheduleDateComponent from "../schedule-date";
import OpenAvailabilityComponent from "./components/open-avalability";
import { FilledButton } from "@/component/buttons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { createEvent } from "@/redux/reducers/event";
// import EventHeaderComponent from "../event-header";

function EventScheduleComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [scheduleType, setScheduleType] = useState("schedule");

  const { eventData } = useAppSelector((state) => state.EventReducer);
  const [scheduleData, setScheduleData] = useState(
    eventData.eventScheduledDateTime
  );
  // console.log(eventData, "eventData");
  useEffect(() => {
    // console.log("hihiihhihihi");
    setScheduleType(eventData.eventTypeAndScheduleId);
    setScheduleData(eventData.eventScheduledDateTime);
  }, []);

  useEffect(() => {
    console.log({ scheduleData, eventData });
  }, [scheduleData]);
  // console.log(scheduleData, "asldkjf");
  const addScheduleEvent = () => {
    setScheduleData([
      ...scheduleData,
      {
        id: scheduleData.length + 1,
        eventStartDate: "",
        eventStartTime: "",
        eventEndDate: "",
        eventEndTime: "",
      },
    ]);
  };

  const updateScheduleEvent = (id: any, value: any) => {
    const index = scheduleData.findIndex((el) => el.id === id);
    const updatedData = [...scheduleData];
    updatedData[index] = {
      ...updatedData[index],
      [value.key]: value.value,
    };
    setScheduleData(updatedData);
  };

  const nextPage = () => {
    dispatch(
      createEvent({
        eventTypeAndScheduleId: scheduleType,
        eventScheduledDateTime: scheduleData,
      })
    );
    router.push(`../instructor/create-event?step=${3}`);
  };
  console.log(scheduleData, "dddd");
  return (
    <div className="schedule">
      <EventHeaderComponent heading="Event Details" onPress={nextPage} />
      <div className={`${styles.headerComponent}`}>
        <Row className="userBoxed">
          <Col md={8}>
            <UserCardComponent
              heading="Scheduled Event(s) "
              content="A single-date calendar event with limited availability."
              onClick={() => setScheduleType("schedule")}
              selected={scheduleType === "schedule"}
            />
          </Col>
          <Col md={8}>
            <UserCardComponent
              heading="Open Schedule"
              content="A user can schedule an event based on your availability."
              onClick={() => {
                setScheduleType("open");
                setScheduleData([
                  {
                    id: 1,
                    eventStartDate: "",
                    eventStartTime: "",
                    eventEndDate: "",
                    eventEndTime: "",
                  },
                ]);
              }}
              selected={scheduleType === "open"}
            />
          </Col>
          <Col md={8}>
            <UserCardComponent
              heading="Combined"
              content="Both event types, all your availability in one event."
              onClick={() => setScheduleType("combined")}
              selected={scheduleType === "combined"}
            />
          </Col>
        </Row>
        {scheduleType === "schedule" || scheduleType === "combined"
          ? scheduleData.map((el) => {
              // console.log(el.eventStartDate, "kya data");
              return (
                <ScheduleDateComponent
                  key={el.id}
                  value={el.id}
                  startDate={el.eventStartDate}
                  getChildValue={(value: any) =>
                    updateScheduleEvent(el.id, value)
                  }
                />
              );
            })
          : null}

        {scheduleType === "schedule" || scheduleType === "combined" ? (
          <FilledButton
            className={`${styles.btnSchedule}`}
            onClick={() => addScheduleEvent()}
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
        ) : null}
        {scheduleType === "open" || scheduleType === "combined" ? (
          <OpenAvailabilityComponent />
        ) : null}
        <EventHeaderComponent heading="Event Details" onPress={nextPage} />
      </div>
    </div>
  );
}

export default EventScheduleComponent;
