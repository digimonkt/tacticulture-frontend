import { SVG } from "@/assets/svg";
import ApprenticeHeaderComponent from "@/component/header/apprentice-header";
import { Row } from "antd";
import React from "react";
import styles from "./layout.module.css";

interface IChildren {
  children: React.ReactNode;
}

function InstructorLayout({ children }: IChildren) {
  console.log({ children });
  return (
    <div>
      <ApprenticeHeaderComponent />
      <Row>
        <div className={`${styles.workspaceSidebar}`}>
          <div>
            <ul className="p-0">
              <li>
                <SVG.Home /> Instructor Home
              </li>

              <li>
                <SVG.Managevent /> Manage Events
              </li>

              <li>
                <SVG.Clock /> Availability
              </li>

              <li>
                <SVG.Bell />
                Notifications
              </li>
              <li>
                <SVG.Order /> Orders
              </li>
              <li>
                <SVG.Finance /> Finance
              </li>
              <li>
                <SVG.Community /> Community
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <div className={`${styles.BodyContent}`}>
        <div className={`${styles.main_page}`}>{children}</div>
      </div>
    </div>
  );
}

export default InstructorLayout;
