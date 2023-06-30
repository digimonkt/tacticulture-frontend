import React, { useState, useEffect } from "react";
import ModalHeader from "@/component/model/modalHeader";
import TimeZoneComponent from "@/component/timezone";
import FilledButtonComponent from "@/component/buttons/filledButton";
import DatePicker from "@/component/calendar";
import Modal from "@/component/model";
import styles from "../styles.module.css";
import { Col, Row } from "antd";
import { OutlinedButton } from "@/component/buttons";

import ScheduledCardComponent from "./schedule-card";
import OpenCardComponent from "./open-card";

const CalendarModal = ({
  isModalOpen,
  handleCancel,
  eventDetail,
  showModal,
  handleOk,
}: any) => {
  const [schedule, setSchedule] = useState("all");
  // const [defaultDate, setDefaultDate] = useState([]);
  const [timezoneData, setTimezoneData] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [testingData, setTestingData] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDateClick = (dates: Date[]) => {};

  const selectSchedule = (value: string) => {
    setSchedule(value);
  };

  // useEffect(() => {
  //   const date = eventDetail.eventScheduledDateTime.map(
  //     (el: any) => new Date(el.eventStartDate)
  //   );

  //   const currentDate: Date[] = moment().toDate();
  //   const customDate = eventDetail.eventCustomAvailability.map(
  //     (el: any) =>
  //       new Date(currentDate.clone().startOf("isoWeek").isoWeekday(el.weekdays))
  //   );

  //   setDefaultDate([...date, ...customDate]);
  // }, [schedule, eventDetail.id]);

  useEffect(() => {
    if (eventDetail && eventDetail.eventScheduledDateTime) {
      const newData: any = [];

      eventDetail.eventScheduledDateTime.forEach((item: any) => {
        const startDate = new Date(item.eventStartDate);
        const endDate = new Date(item.eventEndDate);
        const currentDate = new Date(startDate);

        // eslint-disable-next-line no-unmodified-loop-condition
        while (currentDate <= endDate) {
          newData.push({
            eventStartDate: currentDate.toISOString().split("T")[0],
            eventEndDate: currentDate.toISOString().split("T")[0],
            eventStartTime: item.eventStartTime,
            eventEndTime: item.eventEndTime,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setTestingData(newData);
    }
  }, [eventDetail?.eventScheduledDateTime]);

  return (
    <Modal
      className="courseModal"
      showModal={showModal}
      handleOk={handleOk}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <ModalHeader
        title={eventDetail?.name || ""}
        text="Upcoming Events + Open Availability"
      />
      <div className={`${styles.mainBody}`}>
        <Row>
          <Col md={12}>
            <div style={{ background: "#fff", height: "100%" }}>
              <h3>Schedule Your Training:</h3>
              <div className="radioBtns">
                {/* <RadioButtonInput /> */}
                <div className="d-flex me-2">
                  <span className={`${styles.redDots}`}></span>
                  &nbsp;
                  <h6>Schedule Events</h6>
                </div>
                <div className="d-flex">
                  <span className={`${styles.whiteDots}`}></span>
                  &nbsp;
                  <h6>Open Availiability</h6>
                </div>
              </div>
              <DatePicker
                onDayClick={handleDateClick}
                // defaultDate={defaultDate}
              />
              <div className="timezoneData">
                <TimeZoneComponent
                  title=""
                  value={timezoneData}
                  onChange={(vl) => setTimezoneData(vl.value)}
                />
              </div>
            </div>
          </Col>
          <Col md={12} className="pt-3">
            <div className="d-flex align-items-center ms-3 ps-1">
              <FilledButtonComponent
                onClick={() => selectSchedule("all")}
                className={`${
                  schedule === "all" ? styles.btnAll : styles.btnSchedule
                }`}
              >
                All
              </FilledButtonComponent>
              <OutlinedButton
                onClick={() => selectSchedule("scheduled")}
                className={`${
                  schedule === "scheduled" ? styles.btnAll : styles.btnSchedule
                }`}
              >
                Scheduled
              </OutlinedButton>
              <OutlinedButton
                onClick={() => selectSchedule("open")}
                className={`${
                  schedule === "open" ? styles.btnAll : styles.btnSchedule
                }`}
              >
                Open
              </OutlinedButton>
            </div>
            {schedule === "all" || schedule === "scheduled"
              ? testingData.map(
                  // ? eventDetail.eventScheduledDateTime.map(
                  (schedule: any, index: any) => {
                    return (
                      <ScheduledCardComponent
                        eventId={eventDetail.id}
                        scheduleEventPeriod={eventDetail.scheduleEventPeriod}
                        // scheduleEventPeriodUnit={
                        //   eventDetail.scheduleEventPeriodUnit
                        // }
                        key={index}
                        schedule={schedule}
                        index={index}
                      />
                    );
                  }
                )
              : null}

            {schedule === "all" || schedule === "open"
              ? eventDetail?.eventCustomAvailability?.map(
                  (schedule: any, index: any) => {
                    return (
                      <OpenCardComponent
                        key={index}
                        schedule={schedule}
                        index={index}
                      />
                    );
                  }
                )
              : null}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default CalendarModal;
