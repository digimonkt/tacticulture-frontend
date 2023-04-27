import { SVG } from "@/assets/svg";
import ApprenticeHeaderComponent from "@/component/header/apprentice-header";
import React from "react";
import styles from "./profile.module.css";
import { Tab, Tabs } from "react-bootstrap";
import CommunityInfoComponent from "../components/community-info";
import EventCardComponent from "@/component/card/eventCard";
import { FilledButton, OutlinedButton } from "@/component/buttons";

function ApprenticeLayout() {
  return (
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
              <EventCardComponent title="Upcoming Events">
                <h4>No Upcoming Events</h4>
                <FilledButton className={`${styles.Eventsbtn}`}>
                  Browse Events
                </FilledButton>
                <div className="text-center">
                  <p
                    className="pt-3 mb-0"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#FF3030",
                      fontFamily: "Proxima Nova",
                      letterSpacing: "1px",
                    }}
                  >
                    See past events
                  </p>
                </div>
              </EventCardComponent>
              <EventCardComponent
                title="Achievement Badges"
                subTitle="Ready to start earning badges? Get rewarded for completing events and completing your goals, collect event-exclusive badges and showcase them on your profile."
              >
                <FilledButton className={`${styles.Eventsbtn}`}>
                  Schedule Your First Event
                </FilledButton>
              </EventCardComponent>
              <EventCardComponent
                className={`${styles.class}`}
                title="Interest"
                subTitle="Tell us about event types you want to see more of"
              >
                <OutlinedButton className={`${styles.intesertbtn}`}>
                  Manage Your Interest
                </OutlinedButton>
              </EventCardComponent>
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
          ></Tab>
          <Tab
            eventKey="Notification"
            title={
              <span>
                <SVG.Bell width="20px" /> Notification
              </span>
            }
          ></Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ApprenticeLayout;
