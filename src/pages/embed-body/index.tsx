import ApprenticeHeaderComponent from "@/component/header/user-header";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import { Col, Row } from "antd";
import EmbedCardComponent from "./component/embed-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getEventDetail } from "@/redux/reducers/event";
import { useRouter } from "next/router";
import CalendarModal from "./component/CalendarModal";
import RegistrationModal from "./component/RegistrationModal";
import moment from "moment";

interface IRouter {
  id: string;
}

function EmbedBody() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duration, setDuration] = useState("");
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { eventDetail } = useAppSelector((state) => state.EventReducer);
  useEffect(() => {
    const { id } = router.query as unknown as IRouter;
    dispatch(getEventDetail({ id }));
  }, []);

  useEffect(() => {
    const startTime = moment(
      eventDetail.eventScheduledDateTime[0].eventStartTime,
      "HH:mm:ss"
    );
    const endTime = moment(
      eventDetail.eventScheduledDateTime[0].eventEndTime,
      "HH:mm:ss"
    );

    const duration = moment.duration(endTime.diff(startTime));
    setDuration(duration.asHours());
  }, [eventDetail.eventTypeAndScheduleId]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const registerModalOpen = () => {
    setRegisterModal(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  //   setRegisterModal(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
    // setRegisterModal(false);
  };
  console.log({ eventDetail });
  return (
    <div>
      <ApprenticeHeaderComponent />
      <div className={`${styles.body}`}>
        <div className={`${styles.content}`}>
          <div className="embedBody position-relative">
            <Image src={IMAGES.Images} alt="" />
            <div className={`${styles.eventTitle}`}>
              <div>
                <h6>{eventDetail.name}</h6>
                <p>
                  <SVG.Clock
                    width="16px"
                    style={{ position: "relative", bottom: "3px" }}
                  />
                  <span> Next Event:</span>
                  {moment(
                    eventDetail.eventScheduledDateTime[0].eventStartDate
                  ).format("MMMM MM, YYYY")}{" "}
                  {eventDetail.eventTypeAndScheduleId} Availability
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
                      <SVG.Guard width="14px" />{" "}
                      {`${eventDetail?.instructorDetails?.first_name} ${eventDetail?.instructorDetails?.last_name}`}
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
                  heading={eventDetail.location}
                  // address="12345 Address Ave Georgetown, TX 78628"
                  label="View Map"
                />
                <EmbedCardComponent
                  icon={<SVG.Timer width="16px" />}
                  text={duration + " hours"}
                />
                <EmbedCardComponent
                  icon={<SVG.Risk width="16px" />}
                  text="Requirements"
                  label="View Details"
                />
                <EmbedCardComponent
                  icon={<SVG.Fee width="16px" />}
                  text={eventDetail.perSpotCost + "$"}
                />
                <EmbedCardComponent
                  heading="Completion Badge"
                  address="How it works"
                  classname="color"
                />
                <div className={`${styles.coursecategory}`}>
                  <h5>Course Categories</h5>

                  {eventDetail.courseCategory?.map((el: any) => {
                    return (
                      <div key={el.slugName}>
                        <FilledButton style={{ color: "#000" }}>
                          {el.eventCategories}
                        </FilledButton>
                      </div>
                    );
                  })}
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
                    onClick={showModal}
                  >
                    Register Now{" "}
                  </FilledButton>
                  <h6>Course Summary</h6>
                  <p className="pb-4">
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: eventDetail.description,
                        }}
                      />
                    }
                  </p>

                  <span
                    style={{
                      color: "#CB2C2C",
                      fontWeight: "700",
                      textDecoration: "underline",
                    }}
                    onClick={registerModalOpen}
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
      <CalendarModal
        eventDetail={eventDetail}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
      {/* <RegistrationModal
        registerModalOpen={registerModalOpen}
        registerModal={registerModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
      /> */}
      {/* Event calendar modal end */}
    </div>
  );
}

export default EmbedBody;
