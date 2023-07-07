import { FilledButton } from "@/component/buttons";
import { CheckInput, LabeledInput, TextInput } from "@/component/input";
import SelectInputComponent from "@/component/input/selectInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SVG } from "@/assets/svg";
import {
  resetBookingData,
  setInformationAndRequirement,
} from "@/redux/reducers/booking";
import moment from "moment";
import Swal from "sweetalert";
import { guestBookingAPI } from "@/api/booking";
interface ICourseRequirement {
  handleStepNext: () => void;
  handleStepPrev: () => void;
}

function CourseRequirementComponent({
  handleStepNext,
  handleStepPrev,
}: ICourseRequirement) {
  const dispatch = useAppDispatch();
  const [waiverChecked, setWaiverChecked] = useState(false);
  const [contactDetails, setContactDetails] = useState([
    { name: "", phone: "" },
  ]);
  const { registrationData, bookingData } = useAppSelector(
    (state) => state.BookingReducer
  );
  const { eventDetail } = useAppSelector((state) => state.EventReducer);

  const formik = useFormik({
    initialValues: {
      answerShortText: "",
      answerLongText: "",
      contactDetails: [{ name: "", phone: "" }],
    },
    validationSchema: Yup.object({
      // answerShortText: Yup.string().required("short text is required"),
      // answerLongText: Yup.string().required("long text is required"),
      contactDetails: Yup.array().of(
        Yup.object({
          name: Yup.string().required("Emergency Contact Name  is required"),
          phone: Yup.string().required("Emergency Contact  number is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      handleStepNext();
    },
  });
  const handleAddParagraph = () => {
    setContactDetails([...contactDetails, { name: "", phone: "" }]);
  };
  const deleteItem = (index: number) => {
    setContactDetails((prevContactDetails) =>
      prevContactDetails.filter((_, i) => i !== index)
    );
  };

  const addContactDetail = (key: string, value: string, index: number) => {
    setContactDetails((prevState) => {
      const updatedContactDetails: any = [...prevState];
      updatedContactDetails[index][key] = value;
      formik.setFieldValue(`contactDetails[${index}].${key}`, value); // Update form values
      formik.setFieldError(`contactDetails[${index}].${key}`, ""); // Clear error
      return updatedContactDetails;
    });
  };

  return (
    <div className="guestBody ">
      <p onClick={handleStepPrev} style={{ color: "red", marginLeft: "10px" }}>
        Go Back
      </p>
      <div className="scheduleSteps pb-2">
        <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
          {registrationData.email}
        </span>
        <div className="counters">
          <span style={{ background: "#CB2C2C" }}></span>
          <span style={{ background: "#CB2C2C" }}></span>
          <span style={{ background: "#CB2C2C" }}></span>
          <span></span>
        </div>
      </div>
      <div className="guest">
        <h3>Event Information and Requirements</h3>
        <div className="appendSection position-relative">
          {contactDetails.map((el, index) => {
            const contactDetailErrors: any =
              formik.errors.contactDetails?.[index] || {};
            return (
              <Row key={index}>
                <Col md={11}>
                  <div className="form-item">
                    <LabeledInput
                      onChange={(e) => {
                        addContactDetail("name", e.target.value, index);
                      }}
                      placeholder="Emergency Contact Name*"
                    />
                    {contactDetailErrors.name && (
                      <p className="error-message">
                        {contactDetailErrors.name}
                      </p>
                    )}
                  </div>
                </Col>
                <Col md={11}>
                  <div className="form-item">
                    <LabeledInput
                      onChange={(e) => {
                        addContactDetail("phone", e.target.value, index);
                      }}
                      placeholder="Phone Number*"
                    />
                    {contactDetailErrors.phone && (
                      <p className="error-message">
                        {contactDetailErrors.phone}
                      </p>
                    )}
                  </div>
                </Col>
                {index > 0 && (
                  <SVG.Trash
                    className="deleted"
                    onClick={() => deleteItem(index)}
                    width="20px"
                    color={"red"}
                  />
                )}
              </Row>
            );
          })}

          {/* {Array.from({ length: count }, (_, index) => (
            <Row key={index}>
              <Col md={11}>
                <LabeledInput
                  onChange={(e) =>
                    addContactDetail("name", e.target.value, index)
                  }
                  placeholder="Emergency Contact Name*"
                />
              </Col>
              <Col md={11}>
                <LabeledInput
                  onChange={(e) =>
                    addContactDetail("phone", e.target.value, index)
                  }
                  placeholder="Phone Number*"
                />
              </Col>
              {index > 0 && <SVG.Trash height={20} width={20} />}
            </Row>
          ))} */}
          <button onClick={handleAddParagraph}>+</button>
        </div>
        <Row>
          <Col md={24} className="ms-1">
            {eventDetail.customQuestions.map((el, idx) => {
              return el.fieldType === "ShortText" ? (
                <LabeledInput
                  {...formik.getFieldProps(`answerShortText${idx}`)}
                  placeholder="Placeholder possible..."
                  label={`${el.questionPromptLabel}`}
                  className="w-100"
                />
              ) : el.fieldType === "LongText" ? (
                <TextInput
                  {...formik.getFieldProps("answerLongText")}
                  text={`${el.questionPromptLabel}`}
                  placeholder="Placeholder possible..."
                />
              ) : el.fieldType === "CheckBox" ? (
                <Col md={24} className="ms-1">
                  <div className="publicView mt-3 mb-0">
                    <CheckInput
                      onClick={(e: any) =>
                        dispatch(
                          setInformationAndRequirement({
                            [el.questionPromptLabel]: e.target.checked
                              ? parseInt(el.upgradeCost)
                              : 0,
                          })
                        )
                      }
                    />
                    <p className="mb-0">
                      {el.questionPromptLabel} (+${el.upgradeCost})
                    </p>
                  </div>
                </Col>
              ) : el.fieldType === "Select/Dropdown" ? (
                <SelectInputComponent
                  label={el.questionPromptLabel}
                  className="w-100"
                  options={el.answerData.map((ans) => ({
                    value: `${ans.description}(+$${ans.upgradeCost}`,
                    label: `${ans.description}(+$${ans.upgradeCost})`,
                  }))}
                  onChange={(value) => {
                    const upgradeCost = value?.split("+$"); // Split the string and retrieve the second portion

                    dispatch(
                      setInformationAndRequirement({
                        [upgradeCost[0]]: parseInt(upgradeCost[1]),
                      })
                    );
                  }}
                />
              ) : null;
            })}
            {/* value: "Custom Question Selection (+$50)", */}
          </Col>

          <Col md={24} className="ms-1">
            <div className="publicView mt-3 mb-0">
              <CheckInput
                onClick={(e: any) => setWaiverChecked(e.target.checked)}
              />
              <p className="mb-0">
                Have you read and agree to our{" "}
                <span style={{ color: "#CB2C2C", fontStyle: "inherit" }}>
                  Course Requirements and Waiver?
                </span>
              </p>
            </div>
          </Col>
        </Row>
        <div className="billingInformation mt-2 mb-2">
          <span style={{ marginRight: "14px" }}>
            {" "}
            Check Course Requirements to continue
          </span>
          <FilledButton onClick={() => formik.handleSubmit()}>
            {/* Continue to Billing Information{" "} */}
            Next
          </FilledButton>
        </div>
      </div>
    </div>
  );
}

export default CourseRequirementComponent;
