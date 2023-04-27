import { IMAGES } from "@/assets/images";
import { Col, Row } from "antd";
import styles from "./community.module.css";
import Image from "next/image";
import React from "react";
import { LabeledInput } from "@/component/input";

interface ICommunityInfoComponent {
  name: string;
  eventCount: number;
  eventName: string;
  followingCount: number;
  following: string;
  followersCount: number;
  followers: string;
}

function CommunityInfoComponent({
  name,
  eventCount,
  eventName,
  followingCount,
  following,
  followers,
  followersCount,
}: ICommunityInfoComponent) {
  return (
    <div>
      <Row>
        <Col md={10}>
          <div className="d-flex align-items-center">
            <Image
              src={IMAGES.ProfilePic}
              alt=""
              style={{ width: "50px", marginRight: "18px", height: "50px" }}
            />
            <div className={`${styles.followingDetail}`}>
              <h6 className="mb-0">{name}</h6>
              {eventName ? (
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Proxima Nova",
                    fontWeight: "700",
                    marginRight: "6px",
                    letterSpacing: "1px",
                  }}
                >
                  {eventCount ? (
                    <span style={{ color: "#FF3030" }}> {eventCount}</span>
                  ) : (
                    ""
                  )}
                  &nbsp;{eventName}
                </span>
              ) : (
                ""
              )}
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Proxima Nova",
                  fontWeight: "700",
                  marginRight: "6px",
                  letterSpacing: "1px",
                }}
              >
                <span style={{ color: "#FF3030" }}> {followingCount} </span>{" "}
                {following}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Proxima Nova",
                  fontWeight: "700",
                  marginRight: "6px",
                  letterSpacing: "1px",
                }}
              >
                <span style={{ color: "#FF3030" }}>{followersCount}</span>{" "}
                {followers}
              </span>
            </div>
          </div>
        </Col>
        <Col md={14}>
          <LabeledInput
            className={`${styles.InputField}`}
            placeholder="Kris, Share a community update..."
          />
        </Col>
      </Row>
    </div>
  );
}

export default CommunityInfoComponent;
