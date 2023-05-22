import ApprenticeHeaderComponent from "@/component/header/user-header";
import React from "react";
import styles from "./styles.module.css";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import { Col, Row } from "antd";
import EmbedCardComponent from "./component/embed-card";

function EmbedBody() {
  return (
    <div>
      <ApprenticeHeaderComponent />
      <div className={`${styles.body}`}>
        <div className={`${styles.content}`}>
          <div className="embedBody position-relative">
            <Image src={IMAGES.Images} alt="" />
            <div className={`${styles.eventTitle}`}>
              <div>
                <h6>Course or Event Title Goes Here</h6>
                <p>
                  <SVG.Clock
                    width="16px"
                    style={{ position: "relative", bottom: "3px" }}
                  />
                  <span> Next Event:</span> January 28th, 2023 + Open
                  Availability
                </p>
              </div>

              <FilledButton icon={<SVG.Arrow width="20px" />}>
                Share This Event
              </FilledButton>
            </div>
          </div>
          <div className="embedcontent">
            <Row>
              <Col md={12}>
                <div className={`${styles.embedtitle}`}>
                  <Image
                    src={IMAGES.Communityprofile}
                    alt=""
                    className="me-3"
                  />
                  <div>
                    <span>Instructor</span>
                    <h6>
                      <SVG.Guard width="14px" /> Eddie Gallagher
                    </h6>
                    <FilledButton
                      className="p-0"
                      style={{
                        width: "55px",
                        height: "23px",
                        border: "1px solid #000",
                        borderRadius: "3px",
                        fontSize: "12px",
                        background: "#fff",
                        fontWeight: "700",
                        color: "#000000",
                        letterSpacing: "1px",
                      }}
                    >
                      Follow
                    </FilledButton>
                  </div>
                </div>
                <EmbedCardComponent
                  icon={<SVG.Location width="16px" />}
                  heading="Location Name"
                  address="12345 Address Ave Georgetown, TX 78628"
                  label="View Map"
                />
                <EmbedCardComponent
                  icon={<SVG.Timer width="16px" />}
                  text="[Event Duration]"
                />
                <EmbedCardComponent
                  icon={<SVG.Risk width="16px" />}
                  text="Requirements"
                  label="View Details"
                />
                <EmbedCardComponent
                  icon={<SVG.Fee width="16px" />}
                  text="Course Fee"
                />
                <EmbedCardComponent
                  heading="Completion Badge"
                  address="How it works"
                  classname="color"
                />
                <div className={`${styles.coursecategory}`}>
                  <h5>Course Categories</h5>
                  <FilledButton>Category</FilledButton>
                  <FilledButton>Category</FilledButton>
                  <FilledButton>Category</FilledButton>
                </div>
              </Col>
              <Col md={12}>
                <div className={`${styles.rightbody}`}>
                  <FilledButton
                    style={{
                      background: "#CB2C2C",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "700",
                      fontFamily: "Proxima Nova",
                      borderRadius: "3px",
                      border: "0",
                      width: "100%",
                      letterSpacing: "1px",
                      height: "38px",
                    }}
                  >
                    Register Now{" "}
                  </FilledButton>
                  <h6>Course Summary</h6>
                  <p className="pb-4">
                    Private pistol lessons are for individuals that want to
                    master concepts and skills in a private setting. Whether
                    you've never handled a gun before or are already seasoned,
                    we'll get you to the next level.
                  </p>
                  <p className="pb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin leo justo, convallis non sagittis vitae, gravida at
                    massa. Nunc placerat neque eu pellentesque tincidunt.
                  </p>
                  <ul className="p-0">
                    <li>
                      Lorem ipsum dolor sit amet Consectetur adipiscing elit.
                    </li>
                    <li>
                      {" "}
                      Quisque sem tortor, iaculis quis tortor ut ultricies
                      condimentum enim.
                    </li>
                    <li>
                      Fusce et neque viverra, consequat justo sed, sollicitudin
                      leo.
                    </li>
                  </ul>
                  <span
                    style={{
                      color: "#CB2C2C",
                      fontWeight: "700",
                      textDecoration: "underline",
                    }}
                  >
                    Read the Full Course Description
                  </span>
                  <div className={`${styles.question}`}>
                    <FilledButton icon={<SVG.Question />}>
                      Ask a question{" "}
                    </FilledButton>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmbedBody;
