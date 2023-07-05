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
// import RegistrationModal from "./component/RegistrationModal";
import moment, { Duration } from "moment";

interface IRouter {
  id: string;
}

function EmbedBody() {
  const router = useRouter();
  const { id } = router.query as unknown as IRouter;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showcontent, setShowcontent] = useState(false);
  const [showmap, setShowmap] = useState(false);
  const [duration, setDuration] = useState<undefined | number>(undefined);
  const [requirement, setRequirement] = useState(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { eventDetail } = useAppSelector((state) => state.EventReducer);
  useEffect(() => {
    dispatch(getEventDetail({ id }));
  }, [id]);

  useEffect(() => {
    console.log(eventDetail, "detail");
    if (
      eventDetail.eventScheduledDateTime &&
      eventDetail.eventScheduledDateTime.length > 0
    ) {
      const startTime = moment(
        eventDetail.eventScheduledDateTime[0].eventStartTime,
        "HH:mm:ss"
      );
      const endTime = moment(
        eventDetail.eventScheduledDateTime[0].eventEndTime,
        "HH:mm:ss"
      );

      const duration = moment.duration(endTime.diff(startTime)).asHours();
      setDuration(duration);
    } else if (eventDetail.eventCustomAvailability) {
      const startTime = moment(
        eventDetail.eventCustomAvailability[0].eventCustomAvailabilityDetails[0]
          .fromTime,
        "HH:mm:ss"
      );

      const endTime = moment(
        eventDetail.eventCustomAvailability[0].eventCustomAvailabilityDetails[0]
          .toTime,
        "HH:mm:ss"
      );

      const duration = moment.duration(endTime.diff(startTime)).asHours();

      setDuration(duration);
    }
  }, [eventDetail.eventScheduledDateTime]);

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
  console.log(eventDetail.description);
  return (
    <div>
      <ApprenticeHeaderComponent />
      <div className={`${styles.body}`}>
        <div className={`${styles.content}`}>
          <div className="embedBody position-relative">
            <Image
              src={eventDetail.eventImage || IMAGES.Images}
              alt="Event Image"
              width={800}
              height={300}
            />
            <div className={`${styles.eventTitle}`}>
              <div>
                <h6>{eventDetail.name}</h6>
                <p>
                  <SVG.Clock
                    width="16px"
                    style={{ position: "relative", bottom: "3px" }}
                  />
                  <span> Next Event:</span>
                  {eventDetail.eventScheduledDateTime.length > 0 &&
                    moment(
                      eventDetail.eventScheduledDateTime[0].eventStartDate
                    ).format("MMMM MM, YYYY")}{" "}
                  {eventDetail.eventTypeAndScheduleId} Availability
                </p>
              </div>

              <FilledButton
                className={`${styles.svgBtn}`}
                icon={<SVG.Arrow width="20px" className={`${styles.svg}`} />}
              >
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
                <div style={{ background: "#f3f3f3" }}>
                  <EmbedCardComponent
                    icon={<SVG.Location width="16px" />}
                    heading={eventDetail.location}
                    // address="12345 Address Ave Georgetown, TX 78628"
                    label="View Map"
                    onClick={() => setShowmap(!showmap)}
                  />
                  {showmap && (
                    <div style={{ position: "relative", bottom: "13px" }}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14311.222880382164!2d78.14503004999999!3d26.267968099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1688014954545!5m2!1sen!2sin"
                        width="100%"
                        height="300"
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}
                </div>
                <EmbedCardComponent
                  icon={<SVG.Timer width="16px" />}
                  text={duration + " hours"}
                />
                <div style={{ background: "#f3f3f3" }}>
                  <EmbedCardComponent
                    icon={<SVG.Risk width="16px" />}
                    text="Requirements"
                    label="View Details"
                    onClick={() => setRequirement(!requirement)}
                  />
                  {requirement && (
                    <div className="text-center">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: eventDetail.requirements,
                        }}
                      />
                    </div>
                  )}
                </div>

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
                  <div className="courseBtn">
                    {eventDetail.courseCategory?.map((el: any) => {
                      return (
                        <div key={el.slug_name}>
                          <FilledButton style={{ color: "#000" }}>
                            {el.event_categories}
                          </FilledButton>
                        </div>
                      );
                    })}
                  </div>
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
                  <p
                    className={
                      showcontent
                        ? "pb-4 courseContent show"
                        : "pb-4 courseContent"
                    }
                  >
                    {eventDetail && eventDetail.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: eventDetail.description,
                        }}
                      />
                    ) : null}
                  </p>

                  <span
                    style={{
                      color: "#CB2C2C",
                      fontWeight: "700",
                      textDecoration: "underline",
                    }}
                    onClick={() => setShowcontent(!showcontent)}
                  >
                    {!showcontent
                      ? "Read the Full Course Description"
                      : "Short Course Description"}
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
    </div>
  );
}

export default EmbedBody;
