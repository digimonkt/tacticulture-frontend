import { Col, Row } from "antd";
import styles from "./community.module.css";
import React from "react";
import { LabeledInput } from "@/component/input";
import AvatarComponent from "@/component/AvatarComponent";

interface ICommunityInfoComponent {
  name: string;
  eventCount: number;
  eventName: string;
  followingCount: number;
  following: string;
  followersCount: number;
  followers: string;
  imageURL: string;
}

function CommunityInfoComponent({
  name,
  eventCount,
  eventName,
  followingCount,
  following,
  followers,
  followersCount,
  imageURL,
}: ICommunityInfoComponent) {
  return (
    <div>
      <Row>
        <Col md={10}>
          <div className="d-flex align-items-center">
            <AvatarComponent
              style={{
                marginRight: "18px",
                lineHeight: "30px",
                fontSize: "22px",
              }}
              size="large"
              src={imageURL}
              title={name && name[0]}
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
                    <span style={{ color: "#FF3030" }}>0</span>
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
