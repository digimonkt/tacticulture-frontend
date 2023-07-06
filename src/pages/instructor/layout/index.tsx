import { SVG } from "@/assets/svg";
import { Row } from "antd";
import React, { useState } from "react";
import UserHeaderComponent from "@/component/header/user-header";
import styles from "./layout.module.css";
import Link from "next/link";
import { useRouter } from 'next/router'
interface IChildren {
  children: React.ReactNode;
}

function InstructorLayout({ children }: IChildren) {
  const [activeLink, setActiveLink] = useState("");
  const router= useRouter()
console.log(router.pathname)
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div>
      <UserHeaderComponent />
      <Row>
        <div className={`${styles.workspaceSidebar}`}>
          <div>
            <ul className="p-0">
              <Link href="/instructor/home">
                <li
                  className={router.pathname === "/instructor/home" ? "active" : ""}
                  onClick={() => handleLinkClick("/")}
                >
                  <SVG.Home style={{color:router.pathname === "/instructor/home"?  '#FF3030':"#fff" }} /> Instructor Home
                </li>
              </Link>
              <Link
                className="workspaceSidebarLink"
                href="/instructor/manage-event"
              >
                <li
                  className={
                    router.pathname === "/instructor/manage-event" ? "active" : ""
                  }
                  onClick={() => handleLinkClick("/instructor/manage-event")}
                >
                  <SVG.Managevent style={{color: router.pathname === "/instructor/manage-event"?  '#FF3030':"#fff" }} /> Manage Events
                </li>
              </Link>
              <Link
                className="workspaceSidebarLink"
                href="/instructor/availability"
              >
                <li className={
                    router.pathname === "/instructor/availability" ? "active" : ""
                  } onClick={() => handleLinkClick("/instructor/availability")}>
                  <SVG.Clock style={{color:  router.pathname === "/instructor/availability"?  '#FF3030':"#fff" }} /> Availability
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
