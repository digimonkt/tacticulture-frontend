import React, { useState, useEffect } from "react";
import styles from "../../styles.module.css";
import moment from "moment";
import { Dropdown, Space, Menu } from "antd";
import type { MenuProps } from "antd";
import { SVG } from "@/assets/svg";
import { setBookingData } from "@/redux/reducers/booking";
import RegistrationModal from "../RegistrationModal";
import { useAppDispatch } from "@/redux/hooks/hooks";

// const items: MenuProps["items"] = [
//   {
//     label: "8:00 AM",
//     key: "1",
//   },
// ];

interface IOpenCardComponent {
  schedule: {
    weekdays: string;
    eventCustomAvailabilityDetails: { fromTime: string; toTime: string }[];
  };
  index?: number;
  scheduleEventPeriod: number;
  closeModal: () => void;
  eventId: number;
  title: string
}
interface ISelectedItem {
  dateTime: any;
  key?: string;
  lable?: string;
}

function OpenCardComponent({
  schedule,
  index,
  scheduleEventPeriod,
  closeModal,
  eventId,
  title
}: IOpenCardComponent) {
  const dispatch = useAppDispatch();
  // Get the current date
  const currentDate = moment();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [registerModal, setRegisterModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<ISelectedItem>({
    dateTime: new Date(),
  });

  console.log(scheduleEventPeriod);
  // Find the first occurrence of "MON" in the current week

  const targetDate = currentDate
    .clone()
    .startOf("week")
    .isoWeekday(schedule?.weekdays);
  const curretnData = moment(targetDate).format("YYYY-MM-DD");

  useEffect(() => {
    const result = schedule.eventCustomAvailabilityDetails.flatMap((detail) => {
      const startTime = new Date(`${curretnData}T${detail.fromTime}`);
      const endTime = new Date(`${curretnData}T${detail.toTime}`);

      const timeIntervals = [];
      let currentTime = new Date(startTime);

      while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const timeObject: any = {
          label: formattedTime,
          key: timeIntervals.length + 1,
        };

        timeIntervals.push(timeObject);

        // Increment the current time by the specified interval
        currentTime = new Date(
          currentTime.getTime() + scheduleEventPeriod * 60000
        );
      }

      return timeIntervals;
    });
    setItems(result);
  }, []);

  function handleMenuItemClick(item: { label: string }, date: string) {
    dispatch(setBookingData({ eventId, date, item, type: "schedule", title }));
    const datee = new Date(date + " " + item.label);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!isNaN(datee)) {
      setSelectedTime({ dateTime: datee });
      setRegisterModal(true);
    } else {
      console.log("Invalid date");
    }
  }
  const handleOk = () => {
    setRegisterModal(false);
  };

  return (
    <div key={index} className={`${styles.registerCard}`}>
      <div className="d-block">
        <h6>{moment(targetDate.toString()).format("MMMM DD, YYYY")}</h6>
        <span>Open Availability</span>
      </div>

      <Dropdown
        overlay={
          <Menu>
            {items?.map((item: any) => (
              <Menu.Item
                style={{
                  backgroundColor:
                    item.key === selectedTime?.key &&
                      item.label === selectedTime?.lable
                      ? "red"
                      : "#FFF",
                }}
                onClick={() => handleMenuItemClick(item, curretnData)}
                key={(item.key, item.label)}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
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
      <RegistrationModal
        registerModalOpen={() => console.log("sd")}
        registerModal={registerModal}
        handleCancel={() => {
          setRegisterModal(false);
          closeModal();
        }}
        handleOk={handleOk}
      />
    </div>
  );
}

export default OpenCardComponent;
