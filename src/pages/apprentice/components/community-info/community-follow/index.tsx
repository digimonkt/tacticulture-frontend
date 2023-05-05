import React from "react";
import styles from "./communityFollow.module.css";
import { IMAGES } from "@/assets/images";
import { Col, Row } from "antd";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import Image from "next/image";

function CommunityFollowComponent() {
  const Item = [
    {
      id: 1,
      image: IMAGES.Communityprofile,
      heading: "Eddie Gallagher",
      text: "Navy SEAL Chief and Firearms Instructor",
    },
    {
      id: 2,
      image: IMAGES.Communityprofile,
      heading: "Eddie Gallagher",
      text: "Navy SEAL Chief and Firearms Instructor",
    },
    {
      id: 3,
      image: IMAGES.Communityprofile,
      heading: "Eddie Gallagher",
      text: "Navy SEAL Chief and Firearms Instructor",
    },
  ];
  return (
    <div>
      <h6 className="mt-4 mb-3" style={{ fontSize: "21px" }}>
        Who to follow
      </h6>
      {Item.map((Item) => (
        <Row
          key={Item.id}
          className={`${styles.mainSection}`}
          style={{ cursor: "pointer" }}
        >
          {
            <Col md={3}>
              <div>
                <Image src={IMAGES.Communityprofile} alt="" />
              </div>
            </Col>
          }
          <Col md={17}>
            <div className={`${styles.detailsCommunity}`}>
              <div className="d-flex">
                <SVG.Guard className="me-2" width="16px" />
                <h6>{Item.heading}</h6>
              </div>
              <p>{Item.text}</p>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <FilledButton
                style={{
                  background: "#CB2C2C",
                  fontWeight: "700",
                  fontFamily: "Proxima Nova",
                  color: "#fff",
                  border: "0",
                  height: "37px",
                  width: "80px",
                  fontSize: "17px",
                  borderRadius: "4px",
                  letterSpacing: "2px",
                }}
              >
                Follow
              </FilledButton>
            </div>
          </Col>
        </Row>
      ))}
      <span
        style={{
          color: "#FF4646",
          fontSize: "16px",
          fontWeight: "700",
          letterSpacing: "1px",
          position: "relative",
          bottom: "3px",
        }}
      >
        Show more
      </span>
    </div>
  );
}

export default CommunityFollowComponent;
