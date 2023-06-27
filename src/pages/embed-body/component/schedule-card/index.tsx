import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import moment from "moment";
import { Dropdown, Space, Menu } from "antd";
import type { MenuProps } from "antd";
import { SVG } from "@/assets/svg";
import RegistrationModal from "../RegistrationModal";

interface IScheduledCardComponent {
  schedule: {
    eventStartDate: string;
    eventStartTime: string;
    eventEndDate: string;
    eventEndTime: string;
  };
  scheduleEventPeriod: number;
  scheduleEventPeriodUnit: string;
  index?: number;
}
interface ISelectedItem {
  dateTime: any;
}

function ScheduledCardComponent({
  schedule,
  index,
  scheduleEventPeriod,
  scheduleEventPeriodUnit,
}: IScheduledCardComponent) {
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [registerModal, setRegisterModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<ISelectedItem>({
    dateTime: new Date(),
  });

  useEffect(() => {
    const startDate = new Date(
      schedule.eventStartDate + "T" + schedule.eventStartTime
    );
    const endDate = new Date(
      schedule.eventEndDate + "T" + schedule.eventEndTime
    );

    const array = [];

    let currentTime = startDate;
    let key = 1;
    while (currentTime < endDate) {
      const label = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      array.push({ label, key });
      currentTime = new Date(
        currentTime.getTime() + scheduleEventPeriod * 60000
      ); // Add duration in milliseconds
      key++;
    }
    setItems(array);
  }, []);

  function handleMenuItemClick(item: { label: string }, date: string) {
    const datee = new Date(date + " " + item.label);
    if (!isNaN(datee)) {
      setSelectedTime({ dateTime: datee });
      setRegisterModal(true);
    } else {
      console.log("Invalid date");
    }
  }

  const handleOk = () => {
    // setIsModalOpen(false);
    setRegisterModal(false);
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    setRegisterModal(false);
  };
  console.log(registerModal);
  return (
    <div key={index} className={`${styles.registerCard}`}>
      <div className="d-block">
        <h6>{moment(schedule.eventStartDate).format("MMMM DD, yyyy")}</h6>
        <span>
          {moment(schedule.eventStartTime, "HH:mm:ss").format("hh:mm A")}
        </span>
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
                onClick={() =>
                  handleMenuItemClick(item, schedule.eventStartDate)
                }
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
        <a className="menuList">
          <Space>
            Register
            <SVG.DownChevron width="12px" />
          </Space>
        </a>
      </Dropdown>
      <RegistrationModal
        // registerModalOpen={registerModal}
        registerModal={registerModal}
        handleCancel={() => setRegisterModal(false)}
        handleOk={handleOk}
      />
    </div>
  );
}

export default ScheduledCardComponent;
