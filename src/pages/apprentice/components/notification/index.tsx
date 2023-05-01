import { IMAGES } from "@/assets/images";
import { FilledButton } from "@/component/buttons";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import styles from "./notification.module.css";
import { OptionsInput } from "@/component/input";
import { SVG } from "@/assets/svg";

function NotificationComponent() {
  const Notification = [
    {
      id: 1,
      image: IMAGES.ProfilePic,
      text: "You Scheduled an Event",
      date: "Event Date: January 7, 2023 - 8:00am",
    },
    {
      id: 2,
      image: IMAGES.ProfilePic,
      text: "You Scheduled an Event",
      date: "Event Date: January 7, 2023 - 8:00am",
    },
    {
      id: 3,
      image: IMAGES.ProfilePic,
      text: "You Scheduled an Event",
      date: "Event Date: January 7, 2023 - 8:00am",
    },
  ];
  return (
    <div className={`${styles.notification}`}>
      <h3>Notifications</h3>
      {Notification.map((Notification) => (
        <Row
          key={Notification.id}
          style={{
            padding: "18px 0",
            borderBottom: "1px solid #474747",
            margin: "0 18px 18px",
            paddingTop: "0",
          }}
        >
          <Col md={16}>
            <div className={`${styles.notificationCard}`}>
              <Image
                src={IMAGES.ProfilePic}
                alt=""
                style={{ width: "50px", marginRight: "18px" }}
              />
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Proxima Nova",
                    marginBottom: "4px",
                  }}
                >
                  {Notification.text}
                </h4>
                <span style={{ fontSize: "13px", fontFamily: "Proxima Nova" }}>
                  {Notification.date}
                </span>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="d-flex mt-2">
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
                  fontFamily: "Proxima Nova",
                  color: "#fff",
                  border: "0",
                  height: "37px",
                  width: "137px",
                  fontSize: "17px",
                  borderRadius: "4px",
                }}
              >
                Event Forum
              </FilledButton>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default NotificationComponent;
