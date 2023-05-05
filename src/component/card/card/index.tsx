import React from "react";
import styles from "./card.module.css";

interface IEventCardComponent {
  title?: string;
  subTitle?: string;
  options?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function CardComponent({
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
      {subTitle && <h6 className="text-start pt-0 ps-2">{subTitle}</h6>}

      <div className={`${styles.events}`}>{children}</div>
    </div>
  );
}

export default CardComponent;
