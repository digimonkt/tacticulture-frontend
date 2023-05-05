import React from "react";
import styles from "./badgeCard.module.css";
interface IBadgeCardComponent {
  children: React.ReactNode;
}

function BadgeCardComponent({ children }: IBadgeCardComponent) {
  return (
    <div className={`${styles.badgeCard}`}>
      <div>{children}</div>
    </div>
  );
}

export default BadgeCardComponent;
