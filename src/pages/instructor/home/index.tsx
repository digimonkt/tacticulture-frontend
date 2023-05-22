import React from "react";
import InstructorLayout from "../layout";
import CommunityInfoComponent from "@/pages/apprentice/components/community-info";
import CardComponent from "@/component/card/card";
import { FilledButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import styles from "./home.module.css";
import { Checkbox, Col, Row } from "antd";
import EventCardComponent from "@/component/card/event-card";
import NotificationComponent from "@/pages/apprentice/components/notification";
import PrivateRoute from "@/HOC/privatePages";

function Home() {
  const Data = [
    {
      id: 1,
      icon: (
        <>
          <SVG.Plusevent width="18px" />
        </>
      ),
      heading: "Creating an Event",
    },
    {
      id: 2,
      icon: (
        <>
          <SVG.Setting width="18px" />
        </>
      ),
      heading: "Your account",
    },
    {
      id: 3,
      icon: (
        <>
          <SVG.Magic width="18px" />
        </>
      ),
      heading: "Marketing",
    },
    {
      id: 4,
      icon: (
        <>
          <SVG.Card width="18px" />
        </>
      ),
      heading: "Payouts and Taxes",
    },
  ];
  return (
    <PrivateRoute>
      <>
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
              Instructor Home
            </h3>
            <div
              style={{
                background: "#000000",
                borderRadius: "8px",
                width: "810px",
                padding: "14px",
              }}
            >
              <CommunityInfoComponent
                name="Eddie Gallagher"
                eventCount={2}
                eventName="Events"
                followingCount={2}
                following="Following"
                followers="Followers"
                followersCount={9}
              />
              <CardComponent title="Upcoming Events">
                <FilledButton className={`${styles.BtnEvent}`}>
                  <SVG.Plus width="15px" /> Create New Event
                </FilledButton>

                <div>
                  {/* <p
                  className="mb-0 pt-4 pb-5"
                  style={{
                    fontWeight: "700",
                    color: "#fff",
                    fontFamily: "Proxima Nova",
                    letterSpacing: "1px",
                  }}
                >
                  You don’t have any events yet,{" "}
                  <span style={{ color: "#FF3030" }}>let’s create one!</span>
                </p> */}
                  <EventCardComponent
                    date=" January 7, 2023 -"
                    time="8:00 AM"
                    Share="Share"
                    CopyLink="Copy Link"
                    CourseText="View Course Page"
                    description="Title ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lorem pharetra, varius quam.
         (85 max)"
                    address="12345 Address Ave, Georgetown, TX 78628"
                  />
                </div>
              </CardComponent>
              <CardComponent title="Recent Event Activity">
                <div className={`${styles.RecentActivity}`}>
                  {/* <p
                  className="mb-0 "
                  style={{
                    fontWeight: "700",
                    color: "#fff",
                    fontFamily: "Proxima Nova",
                    letterSpacing: "1px",
                  }}
                >
                  Once you have events, you’ll see questions and registration
                  updates here.
                </p> */}
                  <NotificationComponent />
                </div>
              </CardComponent>
              <CardComponent
                title="Your Event Checklist"
                subTitle="Get started quickly, Here’s how!"
              >
                <div className={`${styles.recentActivity}`}>
                  <div className="customcheck">
                    <div className={`${styles.sectionChecklist}`}>
                      <Checkbox />
                      <div className="d-block ms-2">
                        <span>Create event</span>
                        <p>
                          Publish your event to reach the Tacticulture community
                          and embed on your site
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.sectionChecklist}`}>
                      <Checkbox />
                      <div className="d-block ms-2">
                        <p className="mb-0">
                          Set up your <span> Instructor Profile</span>
                        </p>
                        <p>
                          Stand out on Tacticulture and on your embedded sites
                          by adding your name, image, and bio.
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.sectionChecklist}`}>
                      <Checkbox />
                      <div className="d-block ms-2">
                        <span>Add Your Financial Information</span>
                        <p>
                          Get paid for your event sales by filling our your
                          banking information
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardComponent>
              <CardComponent title="How can we help?">
                <Row className="pb-2 pt-2">
                  {Data.map((Data) => (
                    <Col md={6} key={Data.id}>
                      <div className={`${styles.boxEvent}`}>
                        <span>{Data.icon}</span>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#fff",
                            fontWeight: "700",
                            fontFamily: "Proxima Nova",
                            letterSpacing: "1px",
                            marginBottom: "0",
                            whiteSpace: "nowrap",
                            position: "relative",
                            top: "16px",
                          }}
                        >
                          {Data.heading}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardComponent>
            </div>
          </div>
        </InstructorLayout>
      </>
    </PrivateRoute>
  );
}

export default Home;