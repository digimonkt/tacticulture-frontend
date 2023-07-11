import React from "react";
import styles from "./eventCard.module.css";
import { Col, Row } from "antd";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { OptionsInput } from "@/component/input";

interface IEventCardComponent {
  date: string;
  time: string;
  description: string;
  address: string;
  Share?: string;
  CopyLink?: string;
  CourseText?: string;
}

function EventCardComponent({
  date,
  time,
  address,
  description,
  Share,
  CopyLink,
  CourseText,
}: IEventCardComponent) {
  return (
    <div
      style={{ background: "#fff", borderRadius: "8px" }}
      className="mb-3 ms-2 me-2"
    >
      <Row>
        <Col md={16}>
          <div className={`${styles.upcomingCard}`}>
            <h5>
              {date}
              <span style={{ color: "#CB2C2C" }}> {time}</span>
            </h5>
            <p>{description}</p>
            <h6>
              <SVG.Location width="16px" /> {address}
            </h6>
          </div>
        </Col>
        <Col md={8}>
          <div className="d-flex mt-3 justify-content-center">
            <OptionsInput title={<SVG.Setting />}>
              <div className={`${styles.dropdownBox}`}>
                <SVG.UserIcon />
                <span>Message Instructor</span>
              </div>
              <div className={`${styles.dropdownBox}`}>
                <SVG.Clip />
                <span>Request Cancellation</span>
              </div>
            </OptionsInput>
            <FilledButton
              style={{
                background: "#CB2C2C",
                fontWeight: "700",
                fontFamily: "Inter",
                color: "#fff",
                border: "0",
                height: "37px",
                width: "auto",
                fontSize: "17px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "4px",
              }}
            >
              Event Forum
            </FilledButton>
          </div>
          <div className="d-flex justify-content-end mt-1 me-4 pe-2">
            {Share && (
              <OutlinedButton className="me-2 ShareBtn">
                {" "}
                {Share}
              </OutlinedButton>
            )}
            {CopyLink && (
              <OutlinedButton className="CopyBtn">{CopyLink}</OutlinedButton>
            )}
          </div>
          <div className="text-end me-4 pe-2 mt-2 courseText">
            <p
              style={{
                color: "#CB2C2C",

                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              {CourseText}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EventCardComponent;
