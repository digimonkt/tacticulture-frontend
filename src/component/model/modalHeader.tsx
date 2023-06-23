import { SVG } from "@/assets/svg";
import React from "react";
import styles from "./modal.module.css";

function ModalHeader({ title }: any) {
  return (
    <div className="position-relative">
      <div className={`${styles.eventTitle}`}>
        <div className="pt-2">
          <h6> {`${title || "Course or Event Title Goes Here"}`}</h6>
          <p className="mb-0">
            <SVG.Clock width="18px" className={`${styles.clockIcon}`} />
            Upcoming Events + Open Availability
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalHeader;
