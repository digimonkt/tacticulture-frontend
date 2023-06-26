import React, { useEffect, useState } from "react";
import styles from "../../course.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { IMAGES } from "@/assets/images";
import { Col, Row } from "antd";
import Image from "next/image";
// import UploadProfileComponent from "@/component/upload-profile";
import EventHeaderComponent from "../event-header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { createEventData, resetEventError } from "@/redux/reducers/event";
import { EventPayload } from "@/api/types/event";
import { Spinner } from "react-bootstrap";

function CustomizeEventComponent() {
  const dispatch = useAppDispatch();
  const [fileSelect, setFileSelect] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [addImages, setAddImages] = useState<File>();

  const { eventData, eventCreated, eventCreatedError } = useAppSelector(
    (state) => state.EventReducer
  );

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      setAddImages(e.target.files[0]);

      reader.onloadend = function () {
        setFileSelect(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    let errorData: any;
    if (eventCreatedError?.status) {
      errorData = Object.keys(eventCreatedError.errors).map(
        (key) => (key = eventCreatedError.errors[key].join(", "))
      );
    }

    // alert(errorData);
    console.log(errorData, "errorData");
    if (errorData) {
      const userResponse = window.confirm(errorData);

      dispatch(resetEventError());
    }

    // if (userResponse) {
    //   dispatch(resetEventError());
    // } else {
    //   dispatch(resetEventError());
    // }
  }, [eventCreatedError]);

  // useEffect(() => {
  //   console.log(addImages);
  // }, [addImages]);

  const submitEvent = () => {
    const data = eventData?.eventCustomAvailability?.filter((eve) => {
      return eve.isChecked;
    });
    const newData = data?.map((eve) => {
      return {
        weekdays: eve.day,
        event_custom_availability_details: eve.schedules?.map((schedule) => {
          return { from_time: schedule.startTime, to_time: schedule.endTime };
        }),
      };
    });

    const payload: EventPayload = {
      name: eventData.name,
      course_category: eventData.courseCategory,
      description: eventData.description,
      location: eventData.location,
      course_url: `https://tacticulture.com/${eventData.name.replace(
        /\s/g,
        ""
      )}/}/`,
      is_private_event: eventData.isPrivateEvent,
      available_spots: eventData.availableSpots,
      cost_per_spot: eventData.perSpotCost,
      is_include_transaction_fee_in_cost:
        eventData.isIncludeTransactionFeeInCost,
      is_add_sales_tax: eventData.isAddSalesTax,
      event_type_and_schedule_id: eventData.eventTypeAndScheduleId,
      event_scheduled_datetime:
        eventData.eventTypeAndScheduleId !== "open"
          ? eventData?.eventScheduledDateTime?.map((el) => ({
              event_start_date: el.eventStartDate,
              event_start_time: el.eventStartTime,
              event_end_date: el.eventEndDate,
              event_end_time: el.eventEndTime,
            }))
          : [],
      event_custom_availability: !eventData.defaultAvailability
        ? newData?.map((el) => ({
            weekdays: el.weekdays,
            event_custom_availability_details:
              el.event_custom_availability_details,
            // specific_hours_date: undefined,
          }))
        : [],
      default_availability: eventData.defaultAvailability,
      requirements: eventData.requirements,
      cancellation_policies: eventData.cancellationPolicies,
      default_waiver_settings: eventData.defaultWaiverSettings,
      custom_waiver_settings: eventData.customWaiverSettings,
      custom_questions: eventData.customQuestions,
      // event_image: eventData.eventImage,
      // achievement_badge_image: eventData.achievementBadgeImage,
      publish_status: eventData.publishStatus,
      is_event_live: eventData.isEventLive,
      schedule_event_period:
        eventData.eventScheduleSpan.scheduleAvailabilityPeriod * 60,
      schedule_event_period_unit:
        eventData.eventScheduleSpan.scheduleAvailabilityPeriodUnit,
      open_availability_period_unit:
        eventData.eventOpenSpan.openAvailabilityPeriodUnit,
      open_availability_period:
        eventData.eventOpenSpan.openAvailabilityPeriod * 60,
    };
    console.log({ payload });
    console.log(JSON.stringify(payload));

    dispatch(createEventData(payload));
  };

  useEffect(() => {
    if (eventCreated === "success") {
      window.confirm("Event is created successfully.");
    }
    dispatch(resetEventError());
  }, [eventCreated]);

  return (
    <>
      <div className="position-relative">
        {eventCreated === "loading" && (
          <div className="loader">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
      </div>
      <div>
        <EventHeaderComponent
          heading="Customize Event Style"
          onPress={submitEvent}
        />
        <h6
          style={{
            fontSize: "16px",
            fontFamily: "Proxima Nova",
            fontWeight: "700",
            letterSpacing: "1px",
            marginLeft: "20px",
          }}
        >
          Event Image <span style={{ fontStyle: "italic" }}>(optional)</span>
        </h6>
        <div className={`${styles.eventImg}`}>
          {fileSelect ? (
            <>
              <div
                style={{ backgroundImage: `url(${fileSelect})` }}
                className={`${styles.preview}`}
              ></div>
            </>
          ) : (
            <>
              <h6>
                <SVG.Faupload width="16px" /> Drag and Drop Your Image Here to
                Upload
              </h6>
              <p>recommended image size 1200x628px</p>
            </>
          )}
          <OutlinedButton>or Choose a File</OutlinedButton>

          <input type="file" onChange={fileUpload} />
        </div>
        <h6
          style={{
            fontSize: "16px",
            fontFamily: "Proxima Nova",
            fontWeight: "700",
            letterSpacing: "1px",
            marginLeft: "20px",
          }}
        >
          Event Achievement Badge{" "}
          <span style={{ fontStyle: "italic" }}>(optional)</span>
        </h6>
        <div className={`${styles.achievementBadge}`}>
          <Row>
            <Col md={12}>
              <div className="d-flex align-items-center ps-3">
                <Image src={IMAGES.Badge} alt="" className="me-3 pe-1" />
                <p className="mb-0">
                  Event Badges are collectable achievement tokens unique to your
                  event that your users can share on their profile.{" "}
                  <span
                    style={{
                      color: "#FF3030",
                      fontSize: "14px",
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontFamily: "Proxima Nova",
                    }}
                  >
                    Learn More
                  </span>
                </p>
              </div>
              <div className="text-start mt-4 ms-4">
                <FilledButton className={`${styles.filledbtn}`}>
                  Browse Our Badge Library{" "}
                </FilledButton>
              </div>
            </Col>
            <Col md={12} className="hideProfile">
              {/* <UploadProfileComponent /> */}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default CustomizeEventComponent;
