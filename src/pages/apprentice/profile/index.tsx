import { SVG } from "@/assets/svg";
import ApprenticeHeaderComponent from "@/component/header/user-header";
import React from "react";
import styles from "./profile.module.css";
import { Tab, Tabs } from "react-bootstrap";
import CommunityInfoComponent from "../components/community-info";
import CardComponent from "@/component/card/card";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import EventCardComponent from "@/component/card/event-card";
import BadgeCardComponent from "@/component/card/badge-card";
import { Col, Row } from "antd";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import ForumCardComponent from "../components/forum-card";
import ApprenticeCommuntity from "../components/apprentice-community";
import EventForumComponent from "../components/event-forum";
import PrivatePages from "@/HOC/privatePages";

function ApprenticeLayout() {
  return (
    <PrivatePages>
      <div
        style={{
          background: "#212121",
          height: "100%",
          minHeight: "100vh",
          paddingBottom: "20px",
        }}
      >
        <ApprenticeHeaderComponent />
        <div
          style={{
            height: "100%",
            width: "815px",
            margin: "0 auto",
            paddingTop: "60px",
          }}
          className="tabs"
        >
          <Tabs
            defaultActiveKey=" Apprentice Home"
            id="uncontrolled-tab-example"
            className="mb-0 justify-content-around"
          >
            <Tab
              eventKey=" Apprentice Home"
              title={
                <span>
                  <SVG.Home width="20px" />
                  Apprentice Home
                </span>
              }
            >
              <div className={`${styles.mainBoxCard}`}>
                <CommunityInfoComponent
                  name="Shivesh Bhardwaj"
                  eventCount={2}
                  eventName="Events"
                  followingCount={2}
                  following="Following"
                  followers="Followers"
                  followersCount={9}
                />
                <CardComponent title="Upcoming Events">
                  <EventCardComponent
                    date=" January 7, 2023 -"
                    time="8:00 AM"
                    description="Title ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lorem pharetra, varius quam.
         (85 max)"
                    address="12345 Address Ave, Georgetown, TX 78628"
                  />
                </CardComponent>
                <CardComponent title="Achievement Badges">
                  <Row>
                    <Col md={12}>
                      <BadgeCardComponent>
                        <div className="d-flex align-items-center position-relative">
                          <Image src={IMAGES.Badge} alt="" />
                          <div>
                            <div className="d-flex ">
                              <SVG.CheckIcon
                                style={{
                                  width: "24px",
                                  marginRight: "6px",
                                  position: "relative",
                                  bottom: "17px",
                                }}
                              />
                              <p
                                className="mb-0"
                                style={{
                                  width: "100%",
                                  fontSize: "16px",
                                  color: "#333333",
                                  fontWeight: "700",
                                  letterSpacing: "2px",
                                  lineHeight: "20px",
                                }}
                              >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Etiam luctus orci.
                              </p>
                            </div>
                            <span
                              style={{
                                color: "#333333",
                                fontSize: "12px",
                                fontWeight: "700",
                                fontFamily: "Proxima Nova",
                                marginLeft: "24px",
                              }}
                            >
                              [Instructor Name]
                            </span>
                          </div>
                        </div>
                      </BadgeCardComponent>
                    </Col>
                    <Col md={12}>
                      <BadgeCardComponent>
                        <div className="d-flex align-items-center position-relative">
                          <Image src={IMAGES.Badge} alt="" />
                          <div>
                            <div className="d-flex ">
                              <SVG.CheckIcon
                                style={{
                                  width: "24px",
                                  marginRight: "6px",
                                  position: "relative",
                                  bottom: "17px",
                                }}
                              />
                              <p
                                className="mb-0"
                                style={{
                                  width: "100%",
                                  fontSize: "16px",
                                  color: "#333333",
                                  fontWeight: "700",
                                  letterSpacing: "2px",
                                  lineHeight: "20px",
                                }}
                              >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Etiam luctus orci.
                              </p>
                            </div>
                            <span
                              style={{
                                color: "#333333",
                                fontSize: "12px",
                                fontWeight: "700",
                                fontFamily: "Proxima Nova",
                                marginLeft: "24px",
                              }}
                            >
                              [Instructor Name]
                            </span>
                          </div>
                        </div>
                      </BadgeCardComponent>
                    </Col>
                  </Row>
                </CardComponent>
                <CardComponent
                  className={`${styles.class}`}
                  title="Interest"
                  subTitle="Tell us about event types you want to see more of"
                >
                  <OutlinedButton className={`${styles.intesertbtn}`}>
                    Manage Your Interest
                  </OutlinedButton>
                </CardComponent>
              </div>
            </Tab>
            <Tab
              eventKey=" Events / Orders"
              title={
                <span>
                  <SVG.Events width="20px" /> Events / Orders
                </span>
              }
            ></Tab>
            <Tab
              eventKey="Community"
              title={
                <span>
                  <SVG.Community width="20px" /> Community
                </span>
              }
            >
              <div className={`${styles.mainBoxCard}`}>
                <CommunityInfoComponent
                  name="Shivesh Bhardwaj"
                  eventCount={2}
                  eventName="Events"
                  followingCount={2}
                  following="Following"
                  followers="Followers"
                  followersCount={9}
                />
                <Row>
                  <Col md={15}>
                    <div className={`${styles.community}`}>
                      <h3>Community Updates</h3>
                      <p>
                        Your community updates will appear here.
                        <b>
                          Follow other Tacticulture Instructors and Members to
                          see updates!
                        </b>
                      </p>
                      {/* <CommunityFollowComponent /> */}
                      <ApprenticeCommuntity />
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="EventForum">
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: "21px",
                          fontWeight: "800",
                          fontFamily: "Proxima Nova",
                          margin: "26px 25px 12px",
                          letterSpacing: "1px",
                        }}
                      >
                        Your Event Forums
                      </h3>
                      <Row className="ms-4 ps-1">
                        <ForumCardComponent
                          Description="View Detail"
                          Heading="Event Title Name Goes Here"
                          Content="[MM.DD.YYYY] + Open Availability"
                        />
                        <FilledButton
                          style={{
                            background: "#CB2C2C",
                            fontWeight: "700",
                            fontFamily: "Proxima Nova",
                            color: "#fff",
                            border: "0",
                            height: "37px",
                            width: "250px",
                            fontSize: "17px",
                            borderRadius: "4px",
                            letterSpacing: "2px",
                          }}
                        >
                          View All Event Forums
                        </FilledButton>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab
              eventKey="Notification"
              title={
                <span>
                  <SVG.Bell width="20px" /> Notification
                </span>
              }
            >
              <div className={`${styles.mainBoxCard}`}>
                {/* <NotificationComponent /> */}
                <EventForumComponent
                  heading="Event Community Forum"
                  text="Engage with the instructor and event community before, during, and // after the event here."
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </PrivatePages>
  );
}

export default ApprenticeLayout;
