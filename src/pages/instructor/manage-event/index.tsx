import React from "react";
import InstructorLayout from "../layout";

import { Col, Row } from "antd";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import styles from "./event.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import { OptionsInput } from "@/component/input";
import ForumCardComponent from "@/pages/apprentice/components/forum-card";
import { useRouter } from "next/router";

function ManageEvent() {
  // router
  const router = useRouter();

  const Data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ];
  return (
    <div>
      <InstructorLayout>
        <div>
          <h3
            style={{
              fontSize: "37px",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "1px",
              paddingTop: "10px",
              paddingBottom: "3px",
            }}
          >
            Manage Events
          </h3>
          <div
            style={{
              width: "815px",
              background: "#000",
              padding: "14px",
              borderRadius: "10px",
            }}
          >
            <Row>
              <Col md={14}>
                <div className="d-flex align-items-center">
                  <Image src={IMAGES.Communityprofile} alt="" />
                  <div className="ms-3">
                    <h6
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "800",
                        fontFamily: "Proxima Nova",
                      }}
                    >
                      Eddie Gallagher
                    </h6>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#FF3030",
                        marginBottom: "0",
                      }}
                      className={`${styles.text}`}
                    >
                      <SVG.Clip
                        width="20px"
                        className={`${styles.colorClip}`}
                      />{" "}
                      tacticulture.com/eddie-gallagher
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={10} className="dropdownlist">
                <div className={`${styles.rightSection}`}>
                  <OptionsInput title={<SVG.Setting />}>
                    <div className={`${styles.dropdownBox}`}>
                      <SVG.UserIcon width="20px" />
                      <span
                        style={{
                          fontFamily: "Proxima Nova",
                          color: "#444444",
                          fontWeight: "700",
                          letterSpacing: "1px",
                          paddingLeft: "10px",
                          position: "relative",
                          top: "2px",
                        }}
                      >
                        Edit Profile
                      </span>
                    </div>
                    <div className={`${styles.dropdownBox}`}>
                      <SVG.Clip width="20px" />
                      <span
                        style={{
                          fontFamily: "Proxima Nova",
                          color: "#444444",
                          fontWeight: "700",
                          letterSpacing: "1px",
                          paddingLeft: "10px",
                          position: "relative",
                          top: "2px",
                        }}
                      >
                        Copy Link
                      </span>
                    </div>
                  </OptionsInput>
                  <FilledButton
                    onClick={() => router.push("/instructor/create-event")}
                    className="btnEvents"
                    icon={<SVG.Plus width="20px" />}
                    style={{
                      background: "#CB2C2C",
                      fontWeight: "700",
                      fontFamily: "Proxima Nova",
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
                    Create New Event
                  </FilledButton>
                </div>
              </Col>
            </Row>
            {/* <CardComponent>
              <div className="text-center pt-3 pb-3">
                <p
                  className="mb-0"
                  style={{
                    color: "#fff",
                    fontFamily: "Proxima Nova",
                    fontWeight: "700",
                    letterSpacing: "1px",
                  }}
                >
                  You don’t have any events yet, let’s create one!
                </p>
              </div>
            </CardComponent> */}
            <Row>
              {Data.map((Data) => (
                <Col md={12} key={Data.id}>
                  <div className="manageCard">
                    <ForumCardComponent
                      Description="View Course Details"
                      Heading="Event Title Name Goes Here"
                      Content="[MM.DD.YYYY] + Open Availability"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </InstructorLayout>
    </div>
  );
}

export default ManageEvent;
