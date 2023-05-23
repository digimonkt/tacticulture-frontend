import ApprenticeHeaderComponent from "@/component/header/user-header";
import React from "react";
import styles from "./styles.module.css";
import { Col, Row } from "antd";
import { SVG } from "@/assets/svg";
import { OutlinedButton } from "@/component/buttons";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { OptionsInput } from "@/component/input";
import { Dropdown } from "react-bootstrap";

function ApprenticeProfileLayout() {
  return (
    <div className="apprenticepage">
      <ApprenticeHeaderComponent />
      <div className={`${styles.bodySection}`}>
        <div className={`${styles.content}`}>
          <Row className="pt-5">
            <Col md={12} className="pt-5">
              <div className="profileBox">
                <div className="text-end d-flex justify-content-end">
                  <OutlinedButton
                    icon={<SVG.Dots width="20px" />}
                    className="me-2 bg-white "
                    style={{
                      border: "1px solid #5C5C5C",
                      borderRadius: "3px",
                      padding: "0px 6px 3px",
                    }}
                  ></OutlinedButton>
                  <OutlinedButton
                    className="bg-white "
                    style={{
                      border: "1px solid #5C5C5C",
                      borderRadius: "3px",
                      padding: "0px 6px 3px",
                      fontSize: "14px",
                      color: "#5C5C5C",
                      fontWeight: "700",
                      fontFamily: "Proxima Nova",
                      letterSpacing: "1px",
                    }}
                  >
                    Following{" "}
                  </OutlinedButton>
                </div>
                <div className="text-center">
                  <Image src={IMAGES.Ellipse} alt="" />
                  <h3>
                    <SVG.Guard /> Eddie Gallagher
                  </h3>
                  <span>INSTRUCTOR - @EddieGallagher</span>
                  <div className="pt-1 pb-1">
                    <Image src={IMAGES.Badge} alt="" />
                    <Image src={IMAGES.Badge} alt="" />
                  </div>

                  <div className={`${styles.following}`}>
                    <p className="me-3">
                      <span>
                        <b>20</b>
                      </span>{" "}
                      Following
                    </p>
                    <p>
                      <span>
                        <b>5000</b>
                      </span>{" "}
                      Followers
                    </p>
                  </div>
                  <div className={`${styles.embeded}`}>
                    <p>
                      <b>Full WYSIWG,</b> consectetur adipiscing elit. Curabitur
                      pharetra turpis ut augue euismod pulvinar. Quisque a
                      lacinia est. Nam vehicula scelerisque erat ac finibus.
                      Nulla viverra, mauris sed lobortis commodo, mauris justo
                      sollicitudin quam, vel suscipit nisl leo et magna. Nullam
                      tristique turpis imperdiet mattis pharetra. Donec accumsan
                      ullamcorper consectetur. Integer feugiat nisi et purus
                      volutpat tincidunt. Sed porttitor augue sed mi efficitur,
                      vitae ultricies ex hendrerit. Cras lacinia volutpat odio,
                      <span style={{ color: "#CB2C2C" }}>
                        sit amet auctor lorem pharetra nec.
                      </span>
                    </p>
                    <p>
                      Integer ornare dui ut dolor hendrerit maximus. Cras
                      imperdiet gravida libero id egestas. Cras vel pellentesque
                      tellus. Vivamus bibendum diam dui, a lobortis velit
                      pellentesque et. Duis aliquam erat sem, id viverra leo
                      tempus ut. Nulla facilisi. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Fusce vitae mollis nisl.
                    </p>
                  </div>
                  <div className="text-start ms-3 ps-1 socilemedia">
                    <OutlinedButton
                      icon={
                        <SVG.Question
                          width="20px"
                          style={{
                            position: "relative",
                            bottom: "2px",
                            right: "7px",
                          }}
                        />
                      }
                      style={{
                        color: "#333333",
                        fontSize: "15px",
                        fontWeight: "700",
                        fontFamily: "Proxima Nova",
                        width: "172px",
                        height: "34px",
                        border: "1px solid #666666",
                        borderRadius: "3px",
                      }}
                    >
                      Ask a Question{" "}
                    </OutlinedButton>
                    <div className={`${styles.IconsSocial}`}>
                      <div className="socilemedia">
                        {" "}
                        <SVG.Fb width="20px" />
                        <SVG.Insta width="20px" />
                        <SVG.Linkedin width="20px" />
                        <SVG.Twitter width="20px" />
                      </div>
                      <p className="socilemedia">
                        <SVG.Clip width="20px" /> TheEddieGallagher.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} className="pt-5 activityList ps-1">
              <OptionsInput title="Latest Activity ">
                <Dropdown.Item href="#/action-1">
                  Latest Activity{" "}
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Completed Courses
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Community Updates
                </Dropdown.Item>
              </OptionsInput>
              <div className={`${styles.profileCard}`}>
                <Image src={IMAGES.Badge} alt="" />
                <div>
                  <h3>
                    <SVG.CheckIcon width="20px" /> Event Title Name Goes Here
                  </h3>
                  <span>[Instructor Name]</span>
                </div>
              </div>
              <div className={`${styles.eventReview}`}>
                <div className={`${styles.profileCard}`}>
                  <Image src={IMAGES.Badge} alt="" />
                  <div>
                    <h3>
                      <SVG.CheckIcon width="20px" /> Event Title Name Goes Here
                    </h3>
                    <span>[Instructor Name]</span>
                  </div>
                </div>
                <div className={`${styles.reviewbody}`}>
                  <Image src={IMAGES.Communityprofile} alt="" />
                  <div>
                    <p className="mb-0">
                      “Kristopher is a fantastic designer, I’ve never seen him
                      shoot, but he say’s he’s a pretty decent shot.”
                    </p>
                    <h6>
                      <SVG.Guard width="20px" /> Eddie Gallagher
                    </h6>
                  </div>
                </div>
              </div>
              <div className={`${styles.reviewbody}`}>
                <Image src={IMAGES.Communityprofile} alt="" />
                <div>
                  <h6>
                    <b>Kristopher Ray Bolleter -</b> <span> Jan 1</span>
                  </h6>
                  <p className="mb-0">
                    “Kristopher is a fantastic designer, I’ve never seen him
                    shoot, but he say’s he’s a pretty decent shot.”
                  </p>
                  <span>
                    <SVG.Like width="20px" />0
                  </span>
                  <span className="ms-2">
                    <SVG.Comment width="20px" className="me-0" /> 0
                  </span>
                </div>
              </div>
            </Col>
            <span
              className="pt-3"
              style={{
                color: "#fff",
                fontSize: "12px",
                fontFamily: "Proxima Nova",
              }}
            >
              Cookie Settings
            </span>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ApprenticeProfileLayout;
