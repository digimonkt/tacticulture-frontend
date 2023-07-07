import { SVG } from "@/assets/svg";
import { Row } from "antd";
import React, { useState } from "react";
import UserHeaderComponent from "@/component/header/user-header";
import styles from "./layout.module.css";
import Link from "next/link";

interface IChildren {
  activeLink: string;
  // handleLinkClick: (link: string) => void;
  children: React.ReactNode;
}

function InstructorLayout({
  activeLink,
  children,
}: // handleLinkClick,
IChildren) {
  return (
    <div>
      <UserHeaderComponent />
      <Row>
        <div className={`${styles.workspaceSidebar}`}>
          <div>
            <ul className="p-0">
              <Link href="/instructor/home">
                <li
                  className={activeLink === "/" ? "active" : ""}
                  // onClick={() => handleLinkClick("/")}
                  style={activeLink === "/" ? { color: "red" } : {}}
                >
                  <SVG.Home /> Instructor Home
                </li>
              </Link>
              <Link
                className="workspaceSidebarLink"
                href="/instructor/manage-event"
              >
                <li
                  className={
                    activeLink === "/instructor/manage-event" ? "active" : ""
                  }
                  // onClick={() => handleLinkClick("/instructor/manage-event")}
                  style={
                    activeLink === "/instructor/manage-event"
                      ? { color: "red" }
                      : {}
                  }
                >
                  <SVG.Managevent /> Manage Events
                </li>
              </Link>
              <Link
                className="workspaceSidebarLink"
                href="/instructor/availability"
              >
                <li
                  // onClick={() => handleLinkClick("/instructor/availability")}
                  style={
                    activeLink === "/instructor/availability"
                      ? { color: "red" }
                      : {}
                  }
                >
                  <SVG.Clock /> Availability
                </li>
              </Link>
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
