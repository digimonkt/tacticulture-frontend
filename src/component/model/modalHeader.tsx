import { SVG } from "@/assets/svg";
import React from "react";
import styles from "./modal.module.css";
import { OutlinedButton } from "../buttons";

function ModalHeader({ title, text, content }: any) {
  return (
    <div className="position-relative">
      <div className={`${styles.eventTitle}`}>
        <div className="pt-2">
          <h6> {`${title || "Course or Event Title Goes Here"}`}</h6>
          <div className="d-flex">
            <p className="mb-0">
              <SVG.Clock width="18px" className={`${styles.clockIcon}`} />
              &nbsp;
              {text}
            </p>
            {content && (
              <OutlinedButton className="viewBtn">{content}</OutlinedButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalHeader;
