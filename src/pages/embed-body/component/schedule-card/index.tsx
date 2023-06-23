import React from "react";
import styles from "../../styles.module.css";
import moment from "moment";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { SVG } from "@/assets/svg";

const items: MenuProps["items"] = [
  {
    label: "Select Time",
    key: "0",
  },
  {
    label: "8:00 AM",
    key: "1",
  },

  {
    label: "9:00 AM",
    key: "3",
  },
  {
    label: "10:00 AM",
    key: "3",
  },
];

interface IScheduledCardComponent {
  schedule: { eventStartDate: string; eventStartTime: string };
  index?: number;
}

function ScheduledCardComponent({ schedule, index }: IScheduledCardComponent) {
  return (
    <div key={index} className={`${styles.registerCard}`}>
      <div className="d-block">
        <h6>{moment(schedule.eventStartDate).format("MMMM DD, yyyy")}</h6>
        <span>
          {moment(schedule.eventStartTime, "HH:mm:ss").format("HH:MM a")}
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
