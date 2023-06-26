import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import moment from "moment";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { SVG } from "@/assets/svg";

// const items: MenuProps["items"] = [
//   {
//     label: "8:00 AM",
//     key: 1,
//   },
// ];
// console.log(items, "ppppp");
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

function ScheduledCardComponent({
  schedule,
  index,
  scheduleEventPeriod,
  scheduleEventPeriodUnit,
}: IScheduledCardComponent) {
  const [items, setItems] = useState<MenuProps["items"]>([]);
  console.log(scheduleEventPeriod, "nu", schedule);

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
    while (currentTime <= endDate) {
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
  // console.log(items, "timre");
  return (
    <div key={index} className={`${styles.registerCard}`}>
      <div className="d-block">
        <h6>{moment(schedule.eventStartDate).format("MMMM DD, yyyy")}</h6>
        <span>
          {moment(schedule.eventStartTime, "HH:mm:ss").format("hh:mm A")}
        </span>
      </div>

      <Dropdown menu={{ items }} className="timeDropdown" trigger={["click"]}>
        <a className="menuList" onClick={(e) => e.preventDefault()}>
          <Space>
            Register
            <SVG.DownChevron width="12px" />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default ScheduledCardComponent;
