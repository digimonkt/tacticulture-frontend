import React from "react";
import styles from "./userCard.module.css";
import { FilledButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import { ButtonProps } from "antd";

interface IUserCardComponent extends ButtonProps {
  heading: string;
  content: string;
  selected?: boolean;
}

function UserCardComponent({
  heading,
  content,
  selected,
  ...rest
}: IUserCardComponent) {
  return (
    <div style={{ marginInline: "15px" }}>
      <div className={`${styles.apprenticeCard}`}>
        <h4>{heading}</h4>
        <p>{content}</p>
        <div className={`${selected ? styles.SelectBtn : ""}`}>
          <FilledButton
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "37px",
              color: selected ? "#fff" : "#CB2C2C",
              background: selected ? "#CB2C2C" : "#fff",
            }}
            icon={selected ? <SVG.TickIcon width="16px" /> : ""}
            className="btn selected mt-3"
            {...rest}
          >
            {selected ? "Selected" : "Select"}
          </FilledButton>
        </div>
      </div>
    </div>
  );
}

export default UserCardComponent;
