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
import moment from "moment";
import { RadioButtonInput } from "@/component/input";

const CalendarModal = ({
  isModalOpen,
  handleCancel,
  eventDetail,
  showModal,
  handleOk,
}: any) => {
  const [schedule, setSchedule] = useState("all");
  const [defaultDate, setDefaultDate] = useState([]);
  const [timezoneData, setTimezoneData] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [testingData, setTestingData] = useState([]);
  const handleDateClick = (dates: Date[]) => {
    console.log(dates);
  };

  const selectSchedule = (value: string) => {
    setSchedule(value);
  };

  useEffect(() => {
    const date = eventDetail.eventScheduledDateTime.map(
      (el: any) => new Date(el.eventStartDate)
    );

    const currentDate = moment();
    const customDate = eventDetail.eventCustomAvailability.map(
      (el: any) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new Date(currentDate.clone().startOf("isoWeek").isoWeekday(el.weekdays))
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setDefaultDate([...date, ...customDate]);
  }, [schedule, eventDetail.id]);
  // console.log(eventDetail, "eventdea");

  useEffect(() => {
    const newData: any = [];
    // console.log(eventDetail.eventScheduledDateTime, "orhitdaf");
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
    // const formData =eventDetail.eventScheduledDateTime.map(schd=>)
  }, [eventDetail.eventScheduledDateTime]);

  // const formatData = [
  //   {
  //     eventEndDate: "2023-06-27",
  //     eventEndTime: "11:00:00",
  //     eventStartDate: "2023-06-27",
  //     eventStartTime: "10:00:00",
  //   },
  //   {
  //     eventEndDate: "2023-06-28",
  //     eventEndTime: "11:00:00",
  //     eventStartDate: "2023-06-28",
  //     eventStartTime: "10:00:00",
  //   },
  //   {
  //     eventEndDate: "2023-06-29",
  //     eventEndTime: "11:00:00",
  //     eventStartDate: "2023-06-29",
  //     eventStartTime: "10:00:00",
  //   },
  // ];
  console.log(testingData, "testingData");
  return (
    <Modal
      className="courseModal"
      showModal={showModal}
      handleOk={handleOk}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <ModalHeader title={eventDetail.name} />
      <div className={`${styles.mainBody}`}>
        <Row>
          <Col md={12}>
            <div style={{ background: "#fff", height: "100%" }}>
              <h3>Schedule Your Training:</h3>
              <div className="radioBtns">
                <RadioButtonInput />
              </div>
              <DatePicker
                onDayClick={handleDateClick}
                defaultDate={defaultDate}
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
                        scheduleEventPeriod={eventDetail.scheduleEventPeriod}
                        scheduleEventPeriodUnit={
                          eventDetail.scheduleEventPeriodUnit
                        }
                        key={index}
                        schedule={schedule}
                        index={index}
                      />
                    );
                  }
                )
              : null}

            {schedule === "all" || schedule === "open"
              ? eventDetail.eventCustomAvailability.map(
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
