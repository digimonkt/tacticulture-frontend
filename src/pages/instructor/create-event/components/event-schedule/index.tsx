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
import {
  createEvent,
  updateOwnEventTypeSchedule,
} from "@/redux/reducers/event";
import { getUserDefaultAvailability } from "@/redux/reducers/user";
import { SVG } from "@/assets/svg";
// import EventHeaderComponent from "../event-header";

function EventScheduleComponent({ mode }: { mode: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [scheduleType, setScheduleType] = useState("schedule");
  const [errors, setErrors] = useState({});
  const [openSpan, setOpenSpan] = useState({
    scheduleAvailabilityPeriod: 1,
    scheduleAvailabilityPeriodUnit: "hours",
  });
  const [scheduleSpan, setScheduleSpan] = useState({
    scheduleAvailabilityPeriod: 0,
    scheduleAvailabilityPeriodUnit: "",
  });
  const { eventData } = useAppSelector((state) => state.EventReducer);
  const { ownEventDetail }: any = useAppSelector((state) => state.EventReducer);

  // console.log(ownEventDetail, "ownEventDetail");
  const [scheduleData, setScheduleData] = useState(
    eventData.eventScheduledDateTime
  );
  const [customeEvent, setCustomEvent] = useState(
    eventData.eventCustomAvailability
  );

  useEffect(() => {
    if (mode === "update") {
      setScheduleType(ownEventDetail.eventTypeAndScheduleId);
      setScheduleData(ownEventDetail.eventScheduledDateTime);
      setCustomEvent(ownEventDetail.eventCustomAvailability);
      setScheduleSpan({
        scheduleAvailabilityPeriod: ownEventDetail.scheduleEventPeriod,
        scheduleAvailabilityPeriodUnit: ownEventDetail.scheduleEventPeriodUnit,
      });
    } else {
      setScheduleType(eventData.eventTypeAndScheduleId);
      setScheduleData(eventData.eventScheduledDateTime);
      setCustomEvent(eventData.eventCustomAvailability);
    }
  }, []);

  console.log(mode, "mode", scheduleSpan, "scheSpan");

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
    const errors: any = [];

    scheduleData?.forEach((item, index) => {
      const itemErrors: any = {};

      if (item.eventStartDate === "") {
        itemErrors.eventStartDate = "this field should not be blank";
      }
      if (item.eventStartTime === "") {
        itemErrors.eventStartTime = "this field should not be blank";
      }
      if (item.eventEndDate === "") {
        itemErrors.eventEndDate = "this field should not be blank";
      }
      if (item.eventEndTime === "") {
        itemErrors.eventEndTime = "this field should not be blank";
      }

      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors;
      }
    });

    if (errors.length > 0 && scheduleType !== "open") {
      setErrors(errors);
    } else {
      if (mode === "update") {
        dispatch(
          updateOwnEventTypeSchedule({
            id: ownEventDetail.id,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: {
              scheduleType,
              scheduleData,
              customeEvent,
              openSpan,
              scheduleSpan,
            },
          })
        );
      } else {
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
      }
    }
  };

  const deleteItem = (id: any) => {
    setScheduleData(scheduleData?.filter((el) => el.id !== id));
  };
  // const handleFormError = () => {
  //   // Handle form errors here
  //   // console.log(errors, "error");
  // };

  return (
    <div className="schedule">
      {mode === "update" ? (
        <div className="btnUpdates">
          <FilledButton onClick={nextPage}>Update</FilledButton>
        </div>
      ) : (
        // <p onClick={nextPage}>update</p>
        <EventHeaderComponent heading="Event Detail" onPress={nextPage} />
      )}
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
          ? scheduleData?.map((el, index) => {
              return (
                <div key={el.id}>
                  <ScheduleDateComponent
                    index={index}
                    key={el.id}
                    eventData={el}
                    errorsData={errors}
                    spanDefaultValue={scheduleSpan}
                    scheduleSpan={(value: any) => setScheduleSpan(value)}
                    getChildValue={(value: any) =>
                      updateScheduleEvent(el.id, value)
                    }
                  />
                  {scheduleData.length > 1 && (
                    <SVG.Trash
                      color="white "
                      className="whiteTrash"
                      onClick={() => deleteItem(el.id)}
                      width="24px"
                    />
                  )}
                </div>
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
              width: "auto",
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
        {mode === "update" ? null : (
          // <p onClick={nextPage}>update</p>
          <EventHeaderComponent onPress={nextPage} />
        )}
      </div>
    </div>
  );
}

export default EventScheduleComponent;
