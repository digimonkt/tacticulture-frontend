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
import { getUserDefaultAvailability } from "@/redux/reducers/user";
// import EventHeaderComponent from "../event-header";

function EventScheduleComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [scheduleType, setScheduleType] = useState("schedule");
  const [openSpan, setOpenSpan] = useState();
  const [scheduleSpan, setScheduleSpan] = useState();
  const { eventData } = useAppSelector((state) => state.EventReducer);
  // const { defaultAvailability } = useAppSelector((state) => state.userReducer);
  const [scheduleData, setScheduleData] = useState(
    eventData.eventScheduledDateTime
  );
  const [customeEvent, setCustomEvent] = useState(
    eventData.eventCustomAvailability
  );

  useEffect(() => {
    // console.log("hihiihhihihi");
    setScheduleType(eventData.eventTypeAndScheduleId);
    setScheduleData(eventData.eventScheduledDateTime);
    setCustomEvent(eventData.eventCustomAvailability);
  }, []);

  // console.log(scheduleData, "asldkjf");
  const addScheduleEvent = () => {
    if (scheduleData) {
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
    }
  };

  const updateScheduleEvent = (id: any, value: any) => {
    if (scheduleData) {
      const index = scheduleData.findIndex((el) => el.id === id);
      const updatedData = [...scheduleData];
      updatedData[index] = {
        ...updatedData[index],
        [value.key]: value.value,
      };
      setScheduleData(updatedData);
    }
  };

  const nextPage = () => {
    dispatch(
      createEvent({
        eventTypeAndScheduleId: scheduleType,
        eventScheduledDateTime: scheduleData,
        eventCustomAvailability: customeEvent,
        eventOpenSpan: openSpan,
        eventScheduleSpan: scheduleSpan,
      })
    );
    router.push(`../instructor/create-event?step=${3}`);
  };
  console.log(customeEvent, "event-schedule-data");
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

                dispatch(getUserDefaultAvailability());

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
          ? scheduleData?.map((el) => {
              return (
                <ScheduleDateComponent
                  key={el.id}
                  eventData={el}
                  scheduleSpan={(value: any) => setScheduleSpan(value)}
                  getChildValue={(value: any) =>
                    updateScheduleEvent(el.id, value)
                  }
                />
              );
            })
          : null}

        {scheduleType === "schedule" || scheduleType === "combined" ? (
          <FilledButton
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
          <OpenAvailabilityComponent
            openSpan={(value: any) => setOpenSpan(value)}
            customAvailabilityData={(value: any) => setCustomEvent(value)}
          />
        ) : null}
        <EventHeaderComponent heading="Event Details" onPress={nextPage} />
      </div>
    </div>
  );
}

export default EventScheduleComponent;
