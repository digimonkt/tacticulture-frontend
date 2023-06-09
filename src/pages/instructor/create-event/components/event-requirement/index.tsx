import React, { useState } from "react";
// import EventHeaderComponent from "../event-header";
import TextareaComponent from "@/component/textarea";
import styles from "../course.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SVG } from "@/assets/svg";
import { EVENT_QUESTION_TYPE } from "@/utils/enum";
import CustomizedForm from "./CustomizedForm";
import { createEvent, eventData } from "@/redux/reducers/event";

function EventRequirement() {
  const dispatch = useAppDispatch();
  // const [eventQuestion, setEventQuestion] = useState([{ id: 1 }]);
  const [waiverSetting, setWaiverSetting] = useState("default");
  const { eventData } = useAppSelector((state) => state.EventReducer);
  const addEventQuestion = () => {
    // if (eventQuestion) {
    //   setEventQuestion([
    //     ...eventQuestion,
    //     {
    //       id: eventQuestion.length + 1,
    //     },
    //   ]);
    // }
  };
  // console.log(eventData, "ef");
  return (
    <div>
      {/* <EventHeaderComponent heading="Policies, Questions and Waiver" /> */}
      <div className="eventRequirement">
        <h5>Requirements</h5>
        <p className="mb-0">
          ex. Necessary equipment, physical requirements or any additional event
          restrictions the user should consider when booking this event.
        </p>
        <TextareaComponent
          onChange={(value) => dispatch(createEvent({ requirements: value }))}
        />
        <div>
          <h5>Cancellation</h5>

          <TextareaComponent
            onChange={(value) =>
              dispatch(createEvent({ cancellationPolicies: value }))
            }
          />
        </div>
      </div>
      <div className={`${styles.customEvents}`}>
        <h4>Custom Event Questions</h4>

        <p>
          Configure the information you’d like to collect. We automatically
          collect each users personal profile information in addition to
          requiring Emergency Contact Name and Phone information, but you can
          add additional questions, including paid additions.
        </p>
        <FilledButton
          onClick={() => addEventQuestion()}
          className={`${styles.btnAdd}`}
        >
          + Add Questions
        </FilledButton>
      </div>

      {eventData.customQuestions.map((el, index) => {
        return (
          <div key={el.id}>
            <CustomizedForm index={index} />
          </div>
        );
      })}
      <div className="waiverSetting">
        <div className={`${styles.waiverHeader}`}>
          <h3>Waiver Settings</h3>
          <div className={`${styles.waiverBtn}`}>
            <OutlinedButton
              onClick={() => setWaiverSetting("default")}
              className={
                waiverSetting === "default"
                  ? `${styles.btnCustom}`
                  : `${styles.btnDefault}`
              }
            >
              Use Tacticulture Default
            </OutlinedButton>
            <OutlinedButton
              onClick={() => setWaiverSetting("custom")}
              className={
                waiverSetting === "custom"
                  ? `${styles.btnCustom}`
                  : `${styles.btnDefault}`
              }
            >
              Set Custom Waiver
            </OutlinedButton>
          </div>
        </div>
        <div className={`${styles.waiverTextarea}`}>
          <TextareaComponent
            title="Set Your Custom Waiver Contents"
            className="mb-3"
          />
          <p className="mb-0">
            By publishing this event utilizing this this waiver you agree to the
            Tacticulture<span style={{ color: "#FF3030" }}> Terms of Use</span>{" "}
            and assume all liability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventRequirement;
