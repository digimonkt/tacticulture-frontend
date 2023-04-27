import React, { useState } from "react";
import styles from "./userCard.module.css";
import { FilledButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import { ButtonProps } from "antd";

interface IUserCardComponent extends ButtonProps {
  heading: string;
  content: string;
  selected: boolean;
}

function UserCardComponent({
  heading,
  content,
  selected,
  ...rest
}: IUserCardComponent) {
  return (
    <div>
      <div className={`${styles.apprenticeCard}`}>
        <h4>{heading}</h4>
        <p>{content}</p>
        <div className={`${selected ? styles.SelectBtn : ""}`}>
          <FilledButton
            icon={selected ? <SVG.TickIcon width="20px" /> : ""}
            className="btn selected mt-3"
            color="#fff"
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
