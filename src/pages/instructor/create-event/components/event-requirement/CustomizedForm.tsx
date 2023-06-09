import React, { useState } from "react";
import { Row, Col } from "antd";
import SelectInputComponent from "@/component/input/selectInput";
import {
  eventGuestList,
  eventQuestionList,
  paidUpgradeList,
} from "@/utils/constant";
import { CheckInput, LabeledInput } from "@/component/input";
import styles from "../course.module.css";
import { SVG } from "@/assets/svg";
import { createEvent } from "@/redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

const CustomizedForm = ({ index }) => {
  const dispatch = useAppDispatch();
  const [fieldType, setFieldType] = useState("ShortText");
  const [answerData, setAnswerData] = useState([{ id: 1 }]);

  const addSelectAnswer = (id, type) => {
    if (type === "delete" && answerData.length > 1) {
      setAnswerData(answerData.filter((da) => da.id !== id));
    } else if (type === "add") {
      setAnswerData([
        ...answerData,
        {
          id: answerData.length + 1,
        },
      ]);
    }
  };

  return (
    <div className={`${styles.question}`}>
      <h3 className={`${styles.titles}`}>Custom Question #:{index + 1}</h3>
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
                    onChange={(value) => setFieldType(value)}
                    value={fieldType}
                  />
                </div>
              </Col>
              {fieldType === "CheckBox" ||
              fieldType === "Select/Dropdown" ||
              fieldType === "OptionalGuest" ? (
                <Col md={12}>
                  <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                    <SelectInputComponent
                      label="Paid Upgrade?"
                      className="antSelectDropdown"
                      options={paidUpgradeList}
                    />
                  </div>
                </Col>
              ) : null}
              <span
                style={{
                  fontSize: "13px",
                  width: "498px",
                  margin: "0 auto 16px",
                }}
              >
                We’ll prompt the user registering to invite guests via email to
                complete required waivers and basic profile information.{" "}
              </span>

              {fieldType !== "OptionalGuest" ? (
                <Col md={24}>
                  <div className={`${styles.labelInput}`}>
                    <LabeledInput
                      label="Question Prompt / Label"
                      onChange={(e) => createEvent}
                    />
                  </div>
                </Col>
              ) : (
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
              )}

              {fieldType === "Select/Dropdown" && (
                <Row
                  className="mb-3 pt-3"
                  style={{ borderTop: "1px solid #454545" }}
                >
                  {answerData.map((el, idx) => {
                    return (
                      <Row key={el.id}>
                        <Col md={14}>
                          <div className={`${styles.selectionInput}`}>
                            <LabeledInput
                              label={`Selection Answer #${idx + 1}`}
                            />
                          </div>
                        </Col>
                        <Col md={10}>
                          <div className={`${styles.priceSection}`}>
                            <div className={`${styles.cost}`}>
                              <SVG.Dollar width="24px" />
                              <LabeledInput label="Upgrade Cost" />
                            </div>
                            <div className={`${styles.icon}`}>
                              <SVG.Trash
                                width="24px"
                                onClick={() => addSelectAnswer(el.id, "delete")}
                              />
                              <SVG.File width="24px" />
                              <SVG.Plus
                                width="24px"
                                onClick={() => addSelectAnswer(el.id, "add")}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                </Row>
              )}

              {fieldType === "ShortText" || fieldType === "LongText" ? (
                <div className={`${styles.requiredCheckbox}`}>
                  <CheckInput />
                  <p>Is an answer required?</p>
                </div>
              ) : null}

              {fieldType === "CheckBox" ? (
                <div className={`${styles.upgradeCost}`}>
                  <div style={{ width: "237px" }}>
                    <SVG.Dollar width="24px" />
                    <LabeledInput label="Upgrade Cost" />
                  </div>
                </div>
              ) : null}
            </Row>
          </div>
        </Col>
        <Col md={7}>
          <div className={`${styles.icon}`}>
            <SVG.Trash width="24px" />
            <SVG.File width="24px" />
            <SVG.Plus width="24px" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomizedForm;
