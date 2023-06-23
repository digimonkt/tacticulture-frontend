import ApprenticeHeaderComponent from "@/component/header/user-header";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Col, Row, Dropdown, Space } from "antd";
import EmbedCardComponent from "./component/embed-card";
import Modal from "@/component/model";
// import ModalHeader from "@/modal/modalHeader";
import DatePicker from "@/component/calendar";
import { RadioButtonInput } from "@/component/input";
import FilledButtonComponent from "@/component/buttons/filledButton";
import TimeZoneComponent from "@/component/timezone";
import type { MenuProps } from "antd";
import RegisterBodyComponent from "@/modal/component/registerBody";
import ModalHeader from "@/component/model/modalHeader";

function EmbedBody() {
  const items: MenuProps["items"] = [
    {
      label: "Select Time",
      key: "0",
    },
    {
      label: "8:00 AM",
      key: "1",
    },

    {
      label: "9:00 AM",
      key: "3",
    },
    {
      label: "10:00 AM",
      key: "3",
    },
  ];

  const [timezoneData, setTimezoneData] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleDateClick = (dates: Date[]) => {
    console.log(dates);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const [step, setStep] = useState(1);
  const [next, setNext] = useState(false);
  const [secondnext, setSecondnext] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showRegisterModal = () => {
    setRegisterModal(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setRegisterModal(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setRegisterModal(false);
  };

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
                  <FilledButton className={`${styles.categoryBtn}`}>
                    Category
                  </FilledButton>
                  <FilledButton className={`${styles.categoryBtn}`}>
                    Category
                  </FilledButton>
                  <FilledButton className={`${styles.categoryBtn}`}>
                    Category
                  </FilledButton>
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
                    onClick={showRegisterModal}
                  >
                    Register Now
                  </FilledButton>
                  <h6 onClick={showModal}>Course Summary</h6>
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
      {/* Event calendar modal start */}
      <Modal
        className="courseModal"
        showModal={showModal}
        handleOk={handleOk}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <ModalHeader />
        <div className={`${styles.mainBody}`}>
          <Row>
            <Col md={12}>
              <div style={{ background: "#fff", height: "100%" }}>
                <h3>Schedule Your Training:</h3>
                <div className="radioBtns">
                  <RadioButtonInput label="Schedule Events" />
                  <RadioButtonInput label="Open Availiability" />
                </div>
                <DatePicker onDayClick={handleDateClick} />
                <div className="timezoneData">
                  <TimeZoneComponent
                    value={timezoneData}
                    onChange={(vl) => setTimezoneData(vl.value)}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} className="pt-3">
              <div className="d-flex align-items-center ms-3 ps-1">
                <FilledButtonComponent className={`${styles.btnAll}`}>
                  All
                </FilledButtonComponent>
                <OutlinedButton className={`${styles.btnSchedule}`}>
                  Scheduled
                </OutlinedButton>
                <OutlinedButton className={`${styles.btnSchedule}`}>
                  Open
                </OutlinedButton>
              </div>
              <div className={`${styles.registerCard}`}>
                <div className="d-block">
                  <h6>January 1, 2023</h6>
                  <span>Open Availability</span>
                </div>

                <Dropdown
                  menu={{ items }}
                  className="timeDropdown"
                  trigger={["click"]}
                >
                  <a className="menuList" onClick={(e) => e.preventDefault()}>
                    <Space>
                      Register
                      <SVG.DownChevron width="12px" />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      {/* Event calendar modal end */}

      {/* Event register modal start */}
      <Modal
        className="courseModal"
        onCancel={handleCancel}
        handleOk={handleOk}
        open={registerModal}
        showModal={showRegisterModal}
      >
        <ModalHeader />
        <div className="modalBody">
          <div className="steppers">
            {/* {step === 1 ? "harsh" : "j"} */}
            <span>
              <SVG.AngleArrow width="16px" />
              Back to Schedule
            </span>
            <div>
              <span className="indicatorsStep"></span>
              <span className="indicatorsStep"></span>
              <span className="indicatorsStep"></span>
              <span className="indicatorsStep"></span>
            </div>
          </div>
          {step === 1 ? <RegisterBodyComponent /> : "null"}
        </div>
      </Modal>

      {/* Event register modal end */}
    </div>
  );
}

export default EmbedBody;
