import { SVG } from "@/assets/svg";
import React from "react";
import styles from "./course.module.css";
import InstructorLayout from "../layout";
import EventHeaderComponent from "./components/event-header";
import EventDetailComponent from "./components/event-detail";
import { useRouter } from "next/router";
import EventScheduleComponent from "./components/event-schedule";
import CustomizeEventComponent from "./components/customize-event";
// import EventSummaryComponent from "./event-summary";

function CreateEvent() {
  // router
  const router = useRouter();

  const { step } = router.query;

  const getComponents = () => {
    switch (step) {
      case "1":
        return <EventDetailComponent />;
      case "2":
        return <EventScheduleComponent />;
      case "3":
        return <CustomizeEventComponent />;
      // case "4":
      //   return <EventSummaryComponent />;
      // case "5":
      //   return "step five";
      default:
        typeof window !== "undefined" &&
          router.push({
            pathname: router.pathname,
            query: { ...router.query, step: 1 },
          });
    }
  };
  return (
    <div>
      <InstructorLayout>
        <div className="headerMain">
          <div className={`${styles.accountSetup}`}>
            <span>
              <SVG.Leftarrow className="me-2" width="20px" />
              GO BACK
            </span>
            <h1 className="mt-2">Configure Your Event</h1>
          </div>
          <div className="profileSections">
            {/* <EventHeaderComponent heading="Event Details" /> */}
            <div>{getComponents()}</div>
            <div className="footer">
              <EventHeaderComponent />
            </div>
          </div>
        </div>
      </InstructorLayout>
    </div>
  );
}

export default CreateEvent;
