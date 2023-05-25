import React from "react";
import InstructorLayout from "../layout";
import CommunityInfoComponent from "@/pages/apprentice/components/community-info";
import CardComponent from "@/component/card/card";
import { FilledButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import styles from "./home.module.css";
import { Checkbox, Col, Row } from "antd";
// import EventCardComponent from "@/component/card/event-card";
// import NotificationComponent from "@/pages/apprentice/components/notification";
import PrivateRoute from "@/HOC/privatePages";
import { useRouter } from "next/router";
import { Data } from "@/utils/constant";
import { useAppSelector } from "@/redux/hooks/hooks";
import { currentUser } from "@/redux/reducers/user";

function Home() {
  // route
  const router = useRouter();

  // redux
  const currentUserDetails = useAppSelector(currentUser);

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
                name={`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}
                imageURL={currentUserDetails.profileImage}
                eventCount={0}
                eventName="Events"
                followingCount={0}
                following="Following"
                followers="Followers"
                followersCount={0}
              />
              <CardComponent title="Upcoming Events">
                <FilledButton
                  onClick={() => router.push("/instructor/create-event")}
                  className={`${styles.BtnEvent}`}
                >
                  <SVG.Plus width="15px" /> Create New Event
                </FilledButton>
                <div style={{ marginTop: "72px", marginBottom: "72px" }}>
                  <span className={styles.instructorHomeEmptyEventStyle}>
                    You don’t have any events yet,{" "}
                    <span
                      onClick={() => router.push("/instructor/create-event")}
                      style={{ color: "#FF3030", cursor: "pointer" }}
                    >
                      let’s create one!
                    </span>
                  </span>
                </div>

                <div>
                  {/* <EventCardComponent
                    date=" January 7, 2023 -"
                    time="8:00 AM"
                    Share="Share"
                    CopyLink="Copy Link"
                    CourseText="View Course Page"
                    description="Title ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lorem pharetra, varius quam.
         (85 max)"
                    address="12345 Address Ave, Georgetown, TX 78628"
                  /> */}
                </div>
              </CardComponent>
              <CardComponent title="Recent Event Activity">
                <div className={`${styles.RecentActivity}`}>
                  <span
                    style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}
                  >
                    Once you have events, you’ll see questions and registration
                    updates here.
                  </span>
                  {/* <NotificationComponent /> */}
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
                  {Data.map((typeItem) => (
                    <Col md={6} key={typeItem.id}>
                      <div className={`${styles.boxEvent}`}>
                        <span>
                          <typeItem.icon width="18px" />
                        </span>
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
                          {typeItem.heading}
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
