/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import styles from "../../course.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { IMAGES } from "@/assets/images";
import ImgCrop from "antd-img-crop";
import { Col, Row, Upload } from "antd";
import Image from "next/image";
// import UploadProfileComponent from "@/component/upload-profile";
import EventHeaderComponent from "../event-header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  createEventData,
  resetEventData,
  resetEventError,
} from "@/redux/reducers/event";
import { EventPayload } from "@/api/types/event";
import { Spinner } from "react-bootstrap";
import swal from "sweetalert";
import { useRouter } from "next/router";

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

function CustomizeEventComponent() {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }: any) => {
    console.log(fileList);
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      // @ts-ignore
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [fileSelect, setFileSelect] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [addImages, setAddImages] = useState<File>();

  const { eventData, eventCreated, eventCreatedError } = useAppSelector(
    (state) => state.EventReducer
  );

  // const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const reader = new FileReader();
  //     setAddImages(e.target.files[0]);

  //     reader.onloadend = function () {
  //       setFileSelect(reader.result);
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  useEffect(() => {
    // alert(errorData);
    // @ts-ignore
    const objectLength = Object.keys(eventCreatedError?.errors).length;

    const objectValue = Object.values(eventCreatedError?.errors).toString();

    if (objectLength > 0) {
      // @ts-ignore
      swal("Oops!", objectValue, "error").then((value) => {
        dispatch(resetEventError());
      });
    } else {
      // dispatch(resetEventError());
    }
    // @ts-ignore
  }, [eventCreatedError]);

  // useEffect(() => {
  //   console.log(addImages);
  // }, [addImages]);

  const submitEvent = async () => {
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
    // @ts-ignore
    const base64Image = await fileList[0]?.thumbUrl;

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
      is_include_transaction_fee_in_cost: eventData.isIncludeTransactionFeeInCost,
      is_add_sales_tax: eventData.isAddSalesTax,
      event_type_and_schedule_id: eventData.eventTypeAndScheduleId,
      event_scheduled_datetime: eventData.eventTypeAndScheduleId !== "open"
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
          event_custom_availability_details: el.event_custom_availability_details,
          // specific_hours_date: undefined,
        }))
        : [],
      default_availability: eventData.defaultAvailability,
      requirements: eventData.requirements,
      cancellation_policies: eventData.cancellationPolicies,
      default_waiver_settings: eventData.defaultWaiverSettings,
      custom_waiver_settings: eventData.customWaiverSettings,
      custom_questions: eventData.customQuestions,
      event_image: base64Image || null,
      // achievement_badge_image: eventData.achievementBadgeImage,
      publish_status: eventData.publishStatus,
      // is_event_live: true,
      // schedule_event_period:
      //   eventData.eventOpenSpan.scheduleAvailabilityPeriod * 60,
      // schedule_event_period_unit:
      //   eventData.eventScheduleSpan.scheduleAvailabilityPeriodUnit,
      open_availability_period_unit: eventData.eventOpenSpan.openAvailabilityPeriodUnit,
      open_availability_period: eventData.eventOpenSpan.openAvailabilityPeriod * 60,
      is_event_live: false
    };
    // console.log({ payload });
    // console.log(JSON.stringify(payload));
    JSON.stringify(payload);
    dispatch(createEventData(payload));
  };

  useEffect(() => {
    if (eventCreated === "success") {
      swal({
        title: "Event is created successfully",
        icon: "success",
      }).then((value) => {
        dispatch(resetEventData());
        router.push("/instructor/home");
        // handleStepNext();
        // dispatch(resetBookingData());
      });
    }
    // dispatch(resetEventError());
  }, [eventCreated]);
  // console.log(fileList[0].thumbUrl, "file");
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
        <div className="uploadFile">
          <div className={`${styles.eventImg}`}>
            <ImgCrop
              showGrid
              // rotationSlider
              aspectSlider
              showReset
              aspect={16 / 9}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                // @ts-ignore
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length ? (
                  ""
                ) : (
                  <>
                    <h6>
                      <SVG.Faupload width="16px" /> Drag and Drop Your Image
                      Here to Upload
                    </h6>
                    <p>recommended image size 1200x628px</p>{" "}
                  </>
                )}
                {fileList.length < 1 && (
                  <>
                    <OutlinedButton>or Choose a File</OutlinedButton>
                  </>
                )}
              </Upload>
            </ImgCrop>
          </div>
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
