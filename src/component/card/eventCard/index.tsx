import React from "react";
import styles from "./eventCard.module.css";

interface IEventCardComponent {
  title: string;
  subTitle?: string;
  options?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function EventCardComponent({
  title,
  subTitle,
  options,
  children,
  className,
}: IEventCardComponent) {
  return (
    <div className={`${styles.mainCard} ${className || ""} `}>
      <h3>{title}</h3>
      {options && <div>{options}</div>}
      {subTitle && <h6>{subTitle}</h6>}

      <div className={`${styles.events}`}>{children}</div>
    </div>
  );
}

export default EventCardComponent;
