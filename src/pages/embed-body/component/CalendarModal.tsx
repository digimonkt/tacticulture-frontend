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
  const handleDateClick = (dates: Date[]) => {
    console.log(dates);
  };

  const selectSchedule = (value: string) => {
    setSchedule(value);
  };

  useEffect(() => {
    console.log(eventDetail, "asdf");
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
              ? eventDetail.eventScheduledDateTime.map(
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
