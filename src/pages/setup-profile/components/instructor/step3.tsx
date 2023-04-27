import UploadProfileComponent from "@/component/upload-profile";
import React from "react";
import styles from "../../profile.module.css";
import { Checkbox, Col, Row } from "antd";
import { FormLabel } from "react-bootstrap";
import { LabeledInput } from "@/component/input";

function Step3() {
  return (
    <div style={{ borderBottom: "1px solid #555", paddingBottom: "24px" }}>
      <UploadProfileComponent />
      <div className="mt-4 mb-4 pt-2 pb-2 ps-4 pe-4">
        <h5 className={`${styles.accounthead}`}>Your Account Information</h5>
        <div className="d-flex align-items-center ">
          <Checkbox className="me-2" />
          Create a public profile to log achievements and engage with the
          community{" "}
          <span style={{ fontSize: "12px", fontStyle: "italic" }}>
            (uncheck for private)
          </span>
        </div>
      </div>
      <div className={`${styles.apprenticeForm}`}>
        <Row className="ps-4 pe-4">
          <Col md={12}>
            <div className="me-3 mb-3">
              <FormLabel>
                First Name<span>*</span>
              </FormLabel>
              <LabeledInput />
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <FormLabel>
                Last Name<span>*</span>
              </FormLabel>
              <LabeledInput />
            </div>
          </Col>
          <Col md={12}>
            <div className="me-3 mb-3">
              <FormLabel>
                Email Address<span>*</span>
              </FormLabel>
              <LabeledInput />
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <FormLabel>Password</FormLabel>
              <LabeledInput />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Step3;
