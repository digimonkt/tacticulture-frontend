import React from "react";
import EventHeaderComponent from "../event-header";
import TextareaComponent from "@/component/textarea";
import styles from "../course.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Row, Col } from "antd";
import SelectInputComponent from "@/component/input/selectInput";
import { eventGuestList, eventQuestionList } from "@/utils/constant";
import { CheckInput, LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";

function EventRequirement() {
  return (
    <div>
      {/* <EventHeaderComponent heading="Policies, Questions and Waiver" /> */}
      <div className="eventRequirement">
        <h5>Requirements</h5>
        <p className="mb-0">
          ex. Necessary equipment, physical requirements or any additional event
          restrictions the user should consider when booking this event.
        </p>
        <TextareaComponent />
        <div>
          <h5>Cancellation</h5>

          <TextareaComponent />
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
        <FilledButton className={`${styles.btnAdd}`}>
          + Add Questions
        </FilledButton>
      </div>
      <div className={`${styles.question}`}>
        <h3 className={`${styles.titles}`}>Custom Question #1:</h3>
        <Row>
          <Col md={17}>
            <div className="questionBox">
              <Row>
                <Col md={12}>
                  <div style={{ marginLeft: "22px", marginBottom: "20px" }}>
                    <SelectInputComponent
                      label="Field Type"
                      className="antSelectDropdown"
                      options={eventQuestionList}
                    />
                  </div>
                </Col>
                <Col md={12}>
                  <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                    <SelectInputComponent
                      label="Paid Upgrade?"
                      className="antSelectDropdown"
                      options={eventQuestionList}
                    />
                  </div>
                </Col>
                <span
                  style={{
                    fontSize: "13px",
                    width: "498px",
                    margin: "0 auto 16px",
                  }}
                >
                  We’ll prompt the user registering to invite guests via email
                  to complete required waivers and basic profile information.{" "}
                </span>
                <Col md={24}>
                  <div className={`${styles.labelInput}`}>
                    <LabeledInput label="Question Prompt / Label" />
                  </div>
                </Col>
                <div className={`${styles.requiredCheckbox}`}>
                  <CheckInput />
                  <p>Is an answer required?</p>
                </div>
                <div className={`${styles.upgradeCost}`}>
                  <div style={{ width: "237px" }}>
                    <SVG.Dollar width="24px" />
                    <LabeledInput label="Upgrade Cost" />
                  </div>
                </div>
              </Row>

              <Row
                className="mb-3 pt-3"
                style={{ borderTop: "1px solid #454545" }}
              >
                <Col md={14}>
                  <div className={`${styles.selectionInput}`}>
                    <LabeledInput label="Selection Answer #1" />
                  </div>
                </Col>
                <Col md={10}>
                  <div className={`${styles.priceSection}`}>
                    <div className={`${styles.cost}`}>
                      <SVG.Dollar width="24px" />
                      <LabeledInput label="Upgrade Cost" />
                    </div>
                    <div className={`${styles.icon}`}>
                      <SVG.Trash width="24px" />
                      <SVG.File width="24px" />
                      <SVG.Plus width="24px" />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row
                className="mb-3 pt-3"
                style={{ borderTop: "1px solid #454545" }}
              >
                <Col md={12}>
                  <div className={`${styles.upgradeCosts}`}>
                    <div style={{ width: "237px" }}>
                      <SVG.Dollar width="24px" />
                      <LabeledInput label="Cost Per Guest" />
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                    <SelectInputComponent
                      label="Max Guests?"
                      className="antSelectDropdown"
                      options={eventGuestList}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={7}>
            <div className={`${styles.icon}`}>
              <SVG.SwitchIcon width="20px" />
              <SVG.Trash width="24px" />
              <SVG.File width="24px" />
              <SVG.Plus width="24px" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="waiverSetting">
        <div className={`${styles.waiverHeader}`}>
          <h3>Waiver Settings</h3>
          <OutlinedButton className={`${styles.btnDefault}`}>
            Use Tacticulture Default
          </OutlinedButton>
          <OutlinedButton className={`${styles.btnCustom}`}>
            Set Custom Waiver
          </OutlinedButton>
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
