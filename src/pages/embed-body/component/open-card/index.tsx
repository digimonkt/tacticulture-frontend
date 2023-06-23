/* eslint-disable @typescript-eslint/ban-ts-comment */
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

interface IOpenCardComponent {
  schedule: { weekdays: string };
  index?: number;
}

function OpenCardComponent({ schedule, index }: IOpenCardComponent) {
  // Get the current date
  const currentDate = moment();

  // Find the first occurrence of "MON" in the current week

  const targetDate = currentDate
    .clone()
    // @ts-ignore
    .startOf("isoweek")
    .isoWeekday(schedule.weekdays);
  console.log(targetDate, "target");
  return (
    <div key={index} className={`${styles.registerCard}`}>
      <div className="d-block">
        <h6>{moment(targetDate.toString()).format("MMMM DD, YYYY")}</h6>
        <span>Open Availability</span>
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

export default OpenCardComponent;
