import { SVG } from "@/assets/svg";
import React, { useState, useEffect } from "react";
// import styles from "../course.module.css";
import { FilledButton } from "@/component/buttons";
import { Col, Row } from "antd";
// import styles from "./summary.module.css";
import { OptionsInput } from "@/component/input";
import styles from "../../pages/instructor/create-event/course.module.css";
import EventForumComponent from "@/pages/apprentice/components/event-forum";
import InstructorLayout from "../instructor/layout";
import EventRosterComponent from "../instructor/create-event/components/event-roster";
import EventDetailComponent from "../instructor/create-event/components/event-detail";
import EventScheduleComponent from "../instructor/create-event/components/event-schedule";
import EventRequirement from "../instructor/create-event/components/event-requirement";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { getOwnEventDetail } from "@/redux/reducers/event";

function EventSummaryComponent() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get("eventId");
  const dispatch = useAppDispatch();

  const [eventroster, setEventroster] = useState("");

  useEffect(() => {
    if (eventId) {
      dispatch(getOwnEventDetail({ id: eventId }));
    }
  }, [eventId, dispatch]);

  const Plan = [
    {
      id: "1",
      heading: "Event Details",
      content: "What event is this, location, and basic overview",
      children: "Edit",
      component: <EventDetailComponent mode="update" />,
    },
    {
      id: "2",
      heading: "Event Type and Schedule",
      content: "Customize your event-specific availability",
      children: "Edit",
      component: <EventScheduleComponent mode="update" />,
    },
    {
      id: "3",
      heading: "Event Questions and Waiver",
      content: "What event is this, location, and basic overview",
      children: "Edit",
      component: <EventRequirement />,
    },
    {
      id: "4",
      heading: "Customize Event Style",
      content: "What event is this, location, and basic overview",
      children: "Edit",
      component: <EventRequirement />,
    },
    {
      id: "5",
      heading: "Event Roster",
      content: "What event is this, location, and basic overview",
      children: "View",

      component: <EventRosterComponent />,
    },
    {
      id: "6",
      heading: "Event Community Forum",
      content: "What event is this, location, and basic overview",
      children: "View",
      component: <EventForumComponent />,
    },
  ];
  // console.log(ownEventDetail, "owndata");
  return (
    <>
      <InstructorLayout>
        <div className="publishSummary">
          <div className={`${styles.eventHeader}`}>
            <h3>Edit Your Event</h3>
            <div>
              <span>View Live Page</span>
              <FilledButton> Share This Event</FilledButton>
            </div>
          </div>
          <div
            className={`${styles.eventsummary}`}
            style={{ border: "1px solid #FF3030" }}
          >
            <SVG.CheckIcon className="me-3 ms-2" width="44px" />
            <p className="mb-0 me-5 pe-3">
              <span style={{ color: "#FF3030" }}>Event Live:</span>{" "}
              <b>Your Event Page is ready to accept registrants.</b> Share your
              event, embed on your website or Edit more options below.
            </p>
            <div className="ListPublish">
              <OptionsInput title={<SVG.Setting />}>
                <div className={`${styles.dropdownBox}`}>
                  <SVG.Iframe width="20px" />
                  <span
                    style={{
                      fontFamily: "Proxima Nova",
                      color: "#444444",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      paddingLeft: "10px",
                      position: "relative",
                      top: "2px",
                    }}
                  >
                    Add to Website
                  </span>
                </div>
                <div className={`${styles.dropdownBox}`}>
                  <SVG.Clone width="20px" />
                  <span
                    style={{
                      fontFamily: "Proxima Nova",
                      color: "#444444",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      paddingLeft: "10px",
                      position: "relative",
                      top: "2px",
                    }}
                  >
                    Clone
                  </span>
                </div>
                <div className={`${styles.dropdownBox}`}>
                  <SVG.Delete width="20px" />
                  <span
                    style={{
                      fontFamily: "Proxima Nova",
                      color: "#444444",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      paddingLeft: "10px",
                      position: "relative",
                      top: "2px",
                    }}
                  >
                    Delete
                  </span>
                </div>
              </OptionsInput>
            </div>
          </div>
          <>
            {Plan.map((Plan) => (
              <div className="mainComponent" key={Plan.id}>
                <div
                  style={{
                    border: "1px solid #fff",
                    width: "800px",
                    borderRadius: "8px",
                    marginTop: "18px",
                    marginBottom: "18px",
                    color: "#fff",
                  }}
                  className={`${styles.eventDetails}`}
                >
                  <Row style={{ borderBottom: "1px solid #474747" }}>
                    <Col md={20}>
                      <div>
                        <h3>{Plan.heading}</h3>
                        <p>{Plan.content}</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center mt-3 pt-1 ms-4 ps-1">
                        <FilledButton
                          onClick={() => setEventroster(Plan.id)}
                          style={{
                            width: "64px",
                            height: "37px",
                            borderRadius: "4px",
                            fontSize: "17px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            fontFamily: "Proxima Nova",
                            color: "#fff",
                            background: "transparent",
                            border: "1px solid #fff",
                          }}
                          className={`${styles.editBtn}`}
                        >
                          {Plan.children}
                        </FilledButton>
                      </div>
                    </Col>
                  </Row>
                  {eventroster === Plan.id && (
                    <div className="eventForms">
                      <div className={`${styles.nodata}`}>{Plan.component}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        </div>
      </InstructorLayout>
    </>
  );
}

export default EventSummaryComponent;
