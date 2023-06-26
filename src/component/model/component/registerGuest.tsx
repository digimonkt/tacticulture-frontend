import { FilledButton } from "@/component/buttons";
import { CheckInput, LabeledInput } from "@/component/input";
import { Col, Row } from "antd";
import React from "react";

interface IRegisterGuest {
  handleStepNext: () => void;
  handleStepPrev: () => void;
}

function RegisterGuestComponent({
  handleStepNext,
  handleStepPrev,
}: IRegisterGuest) {
  return (
    <div className="guestBody ">
      <div className="scheduleSteps pb-2">
        <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
          kris@kristopherray.com
        </span>
        <div className="counters">
          <span style={{ background: "#CB2C2C" }}></span>
          <span style={{ background: "#CB2C2C" }}></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="guest">
        <h3>Your Profile Information</h3>
        <Row>
          <Col md={12}>
            <LabeledInput placeholder="First Name*" />
          </Col>
          <Col md={12}>
            <LabeledInput placeholder="Last Name*" />
          </Col>
          <Col md={12}>
            <LabeledInput placeholder="Phone Number*" />
          </Col>
          <Col md={12}>
            <FilledButton onClick={() => handleStepNext()}>
              Continue to Event Information
            </FilledButton>
          </Col>

          <div className="publicView">
            <CheckInput />
            <p>
              Create a Tacticulture public profile to display my completed
              achievements <span>(uncheck for private)</span>
            </p>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default RegisterGuestComponent;
