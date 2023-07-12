import { SVG } from "@/assets/svg";
import React from "react";
import styles from "./course.module.css";
import InstructorLayout from "../layout";
import { useRouter } from "next/router";
import EventDetailComponent from "@/pages/instructor/create-event/components/event-detail";
import EventScheduleComponent from "@/pages/instructor/create-event/components/event-schedule";
import CustomizeEventComponent from "@/pages/instructor/create-event/components/customize-event";
import EventRequirement from "./components/event-requirement";

// import EventSummaryComponent from "./event-summary";

function CreateEvent() {
  // router

  const router = useRouter();

  const { step } = router.query;

  const getComponents = () => {
    switch (step) {
      case "1":
        return <EventDetailComponent mode="create" />;
      case "2":
        return <EventScheduleComponent mode="create" />;
      case "3":
        return <EventRequirement mode="create" />;
      case "4":
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
            {Number(step) > 1 && (
              <span
                onClick={() =>
                  Number(step) > 1 &&
                  router.push(
                    `../instructor/create-event?step=${Number(step) - 1}`
                  )
                }
              >
                <SVG.Leftarrow className="me-2" width="20px" />
                GO BACK
              </span>
            )}
            <h1 className="mt-2">Configure Your Event</h1>
          </div>
          <div className="profileSections">
            {/* <EventHeaderComponent heading="Event Details" /> */}
            {/* <EventHeaderComponent
              heading="Event Detail"
              // onPress={() => formik.handleSubmit()}
            /> */}
            <div>{getComponents()}</div>

            <div className="footer">
              {/* <EventHeaderComponent
                heading="Event Detail"
                // onPress={() => formik.handleSubmit()}
              /> */}
            </div>
          </div>
        </div>
      </InstructorLayout>
    </div>
  );
}

export default CreateEvent;
