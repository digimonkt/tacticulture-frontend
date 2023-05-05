import { Col, Row } from "antd";
import React, { useState } from "react";
import styles from "../../course.module.css";
import Image from "next/image";
import { FilledButton } from "@/component/buttons";
import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/svg";

function EventRosterComponent() {
  const [manageRegister, setManageregister] = useState(false);
  const Data = [
    {
      id: "1",
      heading: "Kristopher Ray Bolleter",

      children: "Manage Registration",
      component: "event details",
    },
    {
      id: "2",
      heading: "Kristopher Ray Bolleter",

      children: "Manage Registration",
      component: "event details",
    },
    {
      id: "3",
      heading: "Kristopher Ray Bolleter",

      children: "Manage Registration",
      component: "event details",
    },
  ];
  return (
    <div>
      <div className={`${styles.noData}`}>
        {manageRegister ? (
          <>
            {Data.map((Data) => (
              <Row className={`${styles.row}`} key={Data.id}>
                <Col md={20}>
                  <div className={`${styles.manageSection}`}>
                    <Image src={IMAGES.ProfilePic} alt="" className="me-3" />
                    <div className="d-block text-start">
                      <h6>{Data.heading}</h6>
                      <FilledButton>{Data.children}</FilledButton>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${styles.icons}`}>
                    <SVG.Message className="me-3" width="20px" />
                    <SVG.CheckIcon width="20px" />
                  </div>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <p onClick={() => setManageregister(true)}>
            You don’t have any registered apprentices yet,{" "}
            <span>Share this event</span>{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default EventRosterComponent;
