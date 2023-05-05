import { Col, Row } from "antd";
import React, { useState } from "react";
import styles from "../../profile.module.css";
import { LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";
import TextareaComponent from "@/component/textarea";
// import TimeZoneComponent from "@/component/timezone";
// import TextareaComponent from "@/component/textarea";

function Step1() {
  const [name, setName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div>
      <h5
        className="ms-4 me-4"
        style={{
          fontSize: "24px",
          fontWeight: "800",
          letterSpacing: "1px",
          fontFamily: "Proxima Nova",
        }}
      >
        Create your Tacticulture URL & Username
      </h5>
      <span
        className="ms-4 me-4 d-block"
        style={{ fontSize: "14px", letterSpacing: "1px", width: "80%" }}
      >
        Choose a URL that describes you or your business in a concise way. Make
        it short and easy to remember so you can share links with ease.
      </span>
      <Row className="mt-4" style={{ borderBottom: "1px solid #555555" }}>
        <Col md={8} className="ps-4">
          <div className={`${styles.lefthead}`}>
            <h5>tacticulture.com/</h5>
            <span>Username:</span>
            <h6>@kris</h6>
          </div>
        </Col>
        <Col md={16} className="pe-4">
          <div className={`${styles.Instruction}`}>
            <div className="position-relative Instructor">
              <LabeledInput onChange={onChange} />
              {name ? (
                <>
                  <SVG.ExclamanationIcon
                    style={{
                      position: "absolute",
                      right: "14px",
                      bottom: "14px",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <ul className="p-0">
              <li>
                <SVG.ExclamanationIcon
                  className={`${styles.firstLine}`}
                  width="15px"
                />
                That has already been reserved, please modify further
              </li>
              <li>
                <SVG.Fillcheck
                  className={`${styles.secondLine}`}
                  width="15px"
                />
                That URL is available
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      {/* <div className={`${styles.timeZone}`}>
        <TimeZoneComponent />
      </div> */}
      <div className={`${styles.textArea}`}>
        <TextareaComponent />
      </div>
    </div>
  );
}

export default Step1;
