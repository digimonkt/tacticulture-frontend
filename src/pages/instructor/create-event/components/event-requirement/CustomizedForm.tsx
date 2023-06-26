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
import { createEvent, eventData } from "@/redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
// import { useFormik } from "formik";
// import * as Yup from "yup";

interface CustomizedFormProps {
  index: any;
  data: any;
  deleteQuestion: () => void;
  addMoreQuestion: () => void;
}

const CustomizedForm = ({
  index,
  data,
  deleteQuestion,
  addMoreQuestion,
}: CustomizedFormProps) => {
  const dispatch = useAppDispatch();
  // const [fieldType, setFieldType] = useState("ShortText");
  const [answerData, setAnswerData] = useState([
    { id: 1, description: "", upgradeCost: 0 },
  ]);

  const { eventData } = useAppSelector((state) => state.EventReducer);

  const addSelectAnswer = (id: number, type: string) => {
    if (type === "delete") {
      // eslint-disable-next-line array-callback-return
      const updatedData = eventData.customQuestions.map((quest, idx) => {
        if (idx === index) {
          return {
            answerData: quest?.answerData?.filter((el) => el.id !== id),
          };
        }
      });
      dispatch(createEvent({ customQuestions: updatedData }));
    } else if (type === "add") {
      let ans = [...answerData];
      ans = [
        ...ans,
        { id: answerData.length + 1, description: "", upgradeCost: 0 },
      ];
      setAnswerData(ans);
      const updatedData = eventData.customQuestions.map((el, idx) => {
        if (idx === index) {
          return {
            ...el,
            answerData: ans,
          };
        }
        return el;
      });

      dispatch(createEvent({ customQuestions: updatedData }));
    }
  };

  const addFieldType = (text: string) => {
    const updatedData = eventData.customQuestions.map((el, idx) => {
      if (idx === index) {
        return {
          ...el,
          fieldType: text,
        };
      }
      return el;
    });

    dispatch(createEvent({ customQuestions: updatedData }));
  };

  const addQuestionPromptData = (text: string) => {
    const updatedQuestions = eventData.customQuestions?.map((question, idx) => {
      if (idx === index) {
        return {
          ...question,
          questionPromptLabel: text,
        };
      }
      return question;
    });

    dispatch(createEvent({ customQuestions: updatedQuestions }));
  };

  const setAnswerRequired = (value: boolean) => {
    const updatedQuestions = eventData.customQuestions.map((question, idx) => {
      if (idx === index) {
        return { ...question, answerRequired: value };
      }
      return question;
    });

    dispatch(createEvent({ customQuestions: updatedQuestions }));
  };

  const addPaidUpgrade = (value: string) => {
    const updatedQuestions = eventData.customQuestions.map((question, idx) => {
      if (idx === index) {
        return { ...question, paidUpgrade: value };
      }
      return question;
    });

    dispatch(createEvent({ customQuestions: updatedQuestions }));
  };

  const addUpgradeCost = (value: number) => {
    const updatedQuestions = eventData.customQuestions.map((question, idx) => {
      if (idx === index) {
        return { ...question, upgradeCost: value };
      }
      return question;
    });

    dispatch(createEvent({ customQuestions: updatedQuestions }));
  };

  const addAnswerForDropDown = (text: string, indexx: number) => {
    const updatedData = answerData.map((el) => {
      if (el.id === indexx) {
        return {
          ...el,
          description: text,
        };
      }
      return el;
    });

    setAnswerData(updatedData);

    const updatedAnswer = eventData.customQuestions.map((answer, idx) => {
      if (idx === index) {
        return { ...answer, answerData: updatedData };
      }
      return answer;
    });

    dispatch(createEvent({ customQuestions: updatedAnswer }));
  };

  const addUpgradeCostForDropdown = (text: number, indexx: number) => {
    const updatedData = answerData.map((el) => {
      if (el.id === indexx) {
        return {
          ...el,
          upgradeCost: text,
        };
      }
      return el;
    });

    setAnswerData(updatedData);

    const updatedAnswer = eventData.customQuestions.map((answer, idx) => {
      if (idx === index) {
        return { ...answer, answerData: updatedData };
      }
      return answer;
    });

    dispatch(createEvent({ customQuestions: updatedAnswer }));
  };

  const addCostPerGuest = (value: number) => {
    const updatedData = eventData.customQuestions.map((el, idx) => {
      if (idx === index) {
        return {
          ...el,
          costPerGuest: value,
        };
      }
      return el;
    });

    dispatch(createEvent({ customQuestions: updatedData }));
  };

  const addMaxGuests = (value: number) => {
    const updatedData = eventData.customQuestions.map((el, idx) => {
      if (idx === index) {
        return {
          ...el,
          maxGuest: value,
        };
      }
      return el;
    });

    dispatch(createEvent({ customQuestions: updatedData }));
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
                    onChange={(value) => addFieldType(value)}
                    value={data?.fieldType}
                  />
                </div>
              </Col>
              {data?.fieldType === "CheckBox" ||
              data?.fieldType === "Select/Dropdown" ||
              data?.fieldType === "OptionalGuest" ? (
                <Col md={12}>
                  <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                    <SelectInputComponent
                      label="Paid Upgrade?"
                      className="antSelectDropdown"
                      options={paidUpgradeList}
                      value={data.paidUpgrade}
                      onChange={(value) => addPaidUpgrade(value)}
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

              {data?.fieldType !== "OptionalGuest" ? (
                <Col md={24}>
                  <div className={`${styles.labelInput}`}>
                    <LabeledInput
                      label="Question Prompt / Label"
                      onChange={(e) => addQuestionPromptData(e.target.value)}
                      value={data?.questionPromptLabel}
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
                        <LabeledInput
                          label="Cost Per Guest"
                          onChange={(e) =>
                            addCostPerGuest(parseInt(e.target.value))
                          }
                          value={data.costPerGuest}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                      <SelectInputComponent
                        label="Max Guests?"
                        className="antSelectDropdown"
                        options={eventGuestList}
                        onChange={(e) => addMaxGuests(parseInt(e))}
                        value={data.maxGuest}
                      />
                    </div>
                  </Col>
                </Row>
              )}

              {data?.fieldType === "Select/Dropdown" && (
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
                              onChange={(e) =>
                                addAnswerForDropDown(e.target.value, el.id)
                              }
                            />
                          </div>
                        </Col>
                        <Col md={10}>
                          <div className={`${styles.priceSection}`}>
                            <div className={`${styles.cost}`}>
                              <SVG.Dollar width="24px" />
                              <LabeledInput
                                label="Upgrade Cost"
                                onChange={(e) =>
                                  addUpgradeCostForDropdown(
                                    parseInt(e.target.value),
                                    el.id
                                  )
                                }
                              />
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

              {data?.fieldType === "ShortText" ||
              data?.fieldType === "LongText" ? (
                <div className={`${styles.requiredCheckbox}`}>
                  <CheckInput
                    checked={data.answerRequired}
                    onChange={() => setAnswerRequired(!data.answerRequired)}
                  />
                  <p>Is an answer required?</p>
                </div>
              ) : null}

              {data?.fieldType === "CheckBox" ? (
                <div className={`${styles.upgradeCost}`}>
                  <div style={{ width: "237px" }}>
                    <SVG.Dollar width="24px" />
                    <LabeledInput
                      label="Upgrade Cost"
                      onChange={(e) => addUpgradeCost(parseInt(e.target.value))}
                      value={data.upgradeCost}
                    />
                  </div>
                </div>
              ) : null}
            </Row>
          </div>
        </Col>
        <Col md={7}>
          <div className={`${styles.icon}`}>
            <SVG.Trash width="24px" onClick={deleteQuestion} />
            <SVG.File width="24px" />
            <SVG.Plus width="24px" onClick={addMoreQuestion} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomizedForm;
