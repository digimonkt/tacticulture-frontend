import { FilledButton } from "@/component/buttons";
import { CheckInput, LabeledInput, TextInput } from "@/component/input";
import SelectInputComponent from "@/component/input/selectInput";
import { Col, Row } from "antd";
import React, { useState } from "react";

interface ICourseRequirement {
  handleStepNext: () => void;
  handleStepPrev: () => void;
}

function CourseRequirementComponent({
  handleStepNext,
  handleStepPrev,
}: ICourseRequirement) {
  const [count, setCount] = useState(1);

  const handleAddParagraph = () => {
    setCount(count + 1);
  };
  return (
    <div className="guestBody ">
      <div className="scheduleSteps pb-2">
        <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
          kris@kristopherray.com
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
          {Array.from({ length: count }, (_, index) => (
            <Row key={index}>
              <Col md={11}>
                <LabeledInput placeholder="Emergency Contact Name*" />
              </Col>
              <Col md={11}>
                <LabeledInput placeholder="Phone Number*" />
              </Col>
            </Row>
          ))}
          <button onClick={handleAddParagraph}>+</button>
        </div>
        <Row>
          <Col md={24}>
            <LabeledInput
              placeholder="Placeholder possible..."
              label="Custom Question Short Text*"
              className="w-100"
            />
          </Col>
          <Col md={24}>
            <TextInput
              text="Custom Question Long Text*"
              placeholder="Placeholder possible..."
            />
            <div className="publicView mt-3 mb-0">
              <CheckInput />
              <p className="mb-0">Additional Custom Question Checkbox (+$50)</p>
            </div>
          </Col>
          <Col md={24}>
            <SelectInputComponent
              label="Custom Question Dropdown Question*"
              className="w-100"
              options={[
                {
                  value: "Custom Question Selection (+$50)",
                  label: "Custom Question Selection (+$50)",
                },
                {
                  value: "Custom Question Selection",
                  label: "Custom Question Selection",
                },
              ]}
            />
            <div className="publicView mt-3 mb-0">
              <CheckInput />
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
          <FilledButton onClick={() => handleStepNext()}>
            Continue to Billing Information{" "}
          </FilledButton>
        </div>
      </div>
    </div>
  );
}

export default CourseRequirementComponent;
