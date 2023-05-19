import React from "react";
import styles from "../../styles.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
// import UploadProfileComponent from "@/component/upload-profile";
import { Col, Row } from "antd";
import { LabeledInput } from "@/component/input";
// import TextareaComponent from "@/component/textarea";

function ProfileSettingComponent() {
  return (
    <div className="profilePage">
      <div className={`${styles.profilehead}`}>
        <h3>
          Primary Account Type <SVG.InfoIcon width="18px" />{" "}
        </h3>
        <div className={`${styles.accountSectionbtn}`}>
          <OutlinedButton
            className="me-2"
            style={{
              fontSize: "17px",
              fontWeight: "700",
              background: "transparent",
              color: "#fff",
              fontFamily: "Proxima Nova",
              letterSpacing: "1px",
              border: "1px solid #FF3030",
              borderRadius: "3px",
              height: "37px",
              marginRight: "10px",
            }}
          >
            Apprentice
          </OutlinedButton>
          <OutlinedButton
            style={{
              fontSize: "17px",
              fontWeight: "700",
              background: "transparent",
              color: "#fff",
              fontFamily: "Proxima Nova",
              letterSpacing: "1px",
              border: "1px solid #fff",
              borderRadius: "3px",
              height: "37px",
              marginRight: "10px",
            }}
          >
            Instructor{" "}
          </OutlinedButton>
        </div>
      </div>
      <div>{/* <UploadProfileComponent /> */}</div>
      <div className={`${styles.contactField}`}>
        <h3>Your Account Information</h3>
        <Row>
          <Col md={12}>
            <LabeledInput placeholder="Eddie" label="First Name*" />
          </Col>
          <Col md={12}>
            <LabeledInput placeholder="Eddie" label="Last Name*" />
          </Col>
          <Col md={12}>
            <LabeledInput placeholder="Eddie" label="Email Address*" />
          </Col>
          <Col md={12}>
            <LabeledInput placeholder="Eddie" label="Phone Number" />
          </Col>
        </Row>
        <div className="eventsections">{/* <TextareaComponent /> */}</div>
        <div className="text-end pe-4 me-1">
          <FilledButton
            style={{
              width: "150px",
              height: "37px",
              background: "#CB2C2C",
              fontFamily: "Proxima Nova",
              color: "#fff",
              letterSpacing: "1px",
              fontSize: "17px",
              fontWeight: "700",
              border: "0",
              borderRadius: "3px",
            }}
          >
            Save Changes{" "}
          </FilledButton>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingComponent;
