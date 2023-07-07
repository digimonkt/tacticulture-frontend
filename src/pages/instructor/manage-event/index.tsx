import React, { useEffect } from "react";
import InstructorLayout from "../layout";

import { Col, Row } from "antd";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import styles from "./event.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { OptionsInput, SwitchInput } from "@/component/input";
import ForumCardComponent from "@/pages/apprentice/components/forum-card";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { currentUser } from "@/redux/reducers/user";
import { useRouter } from "next/router";

import event, {
  availableEventData,
  getEventData,
  resetEventData,
} from "@/redux/reducers/event";
import { Card } from "react-bootstrap";
import OpenCard from "@/pages/apprentice/components/latest-card/OpenCard";
import ScheduleCard from "@/pages/apprentice/components/latest-card/ScheduleCard";

function ManageEvent() {
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();

  const userDetail = useAppSelector(currentUser);
  const eventData = useAppSelector(availableEventData);

  useEffect(() => {
    dispatch(getEventData());
  }, []);

  return (
    <div>
      <InstructorLayout activeLink="/instructor/manage-event">
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
                      {userDetail.firstName} {userDetail.lastName}
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
                      {userDetail.username}
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
                    onClick={() => {
                      dispatch(resetEventData());
                      router.push("/instructor/create-event");
                    }}
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

            <Row>
              {eventData?.results?.map((Data) => {
                return Data.eventTypeAndScheduleId === "schedule" &&
                  Data.name ? (
                  <Col md={12} key={Data.id}>
                    <div className="manageCard">
                      <ScheduleCard data={Data} />
                    </div>
                  </Col>
                ) : (
                  <Col md={12} key={Data.id}>
                    <div className="manageCard">
                      <OpenCard data={Data} />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </InstructorLayout>
    </div>
  );
}

export default ManageEvent;
