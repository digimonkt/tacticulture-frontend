import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./userHeader.module.css";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/svg";
import { LabeledInput } from "@/component/input";
import { handleLogout } from "@/api/auth";
import { useAppSelector } from "@/redux/hooks/hooks";
import { currentUser } from "@/redux/reducers/user";
import { USER_ROLES } from "@/utils/enum";
import { OutlinedButton } from "@/component/buttons";
import AvatarComponent from "@/component/AvatarComponent";
import { useRouter } from "next/router";

const ApprenticeDropDownList = [
  {
    id: 1,
    title: "Apprentice Home",
    url: "",
    icon: (
      <>
        <SVG.Home />
      </>
    ),
  },
  {
    id: 2,
    title: "Upcoming Events",
    url: "",
    icon: (
      <>
        <SVG.UpcomingEvent />
      </>
    ),
  },
  {
    id: 3,
    title: "Apprentice Profile",
    url: "",
    icon: (
      <>
        <SVG.Apprenticeprofile />
      </>
    ),
  },
  {
    id: 4,
    title: "Switch to Instructor",
    url: "",
    icon: (
      <>
        <SVG.Switch />
      </>
    ),
  },

  {
    id: 5,
    title: "Account Settings",
    url: "",
    icon: (
      <>
        <SVG.Setting />
      </>
    ),
  },
];
const InstructorDropDownList = [
  {
    id: 1,
    title: "Instructor Home",
    url: "/instructor/home",
    icon: (
      <>
        <SVG.Home />
      </>
    ),
  },
  {
    id: 2,
    title: "Manage Events",
    url: "/instructor/manage-event",
    icon: (
      <>
        <SVG.UpcomingEvent />
      </>
    ),
  },
  {
    id: 3,
    title: "Instructor Profile",
    url: "",
    icon: (
      <>
        <SVG.Apprenticeprofile />
      </>
    ),
  },
  {
    id: 4,
    title: "Switch to Apprentice",
    url: "",
    icon: (
      <>
        <SVG.Switch />
      </>
    ),
  },

  {
    id: 5,
    title: "Account Settings",
    url: "",
    icon: (
      <>
        <SVG.Setting />
      </>
    ),
  },
];

function UserHeaderComponent() {
  // redux
  const currentUserDetail = useAppSelector(currentUser);

  // router
  const router = useRouter();

  return (
    <div>
      <div className={`${styles.navMenu}`}>
        <Navbar expand="lg" style={{ background: "#212121" }}>
          <Container fluid>
            <Navbar.Brand href="#home">
              <Image
                src={IMAGES.LogoIcon}
                alt=""
                className={`${styles.logoImg}`}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {currentUserDetail.defaultRole === USER_ROLES.apprentice && (
                <div className={`${styles.searchBar}`}>
                  <SVG.Searchbar
                    width="16px"
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "14px",
                      zIndex: " 9",
                    }}
                  />
                  <LabeledInput
                    type="search"
                    className="form-control"
                    placeholder="Search Tacticulture"
                    style={{ paddingLeft: "34px" }}
                  />
                  <SVG.Rightarrow
                    width="20px"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "14px",
                      zIndex: " 9",
                    }}
                  />
                </div>
              )}
              <Nav className="me-auto justify-content-end w-100">
                {currentUserDetail.defaultRole === USER_ROLES.apprentice ? (
                  <Nav.Link href="#" className={`${styles.link}`}>
                    Browse Events
                  </Nav.Link>
                ) : (
                  <Nav.Link href="#" className={`${styles.link}`}>
                    Manage Events
                  </Nav.Link>
                )}

                {currentUserDetail.defaultRole === USER_ROLES.instructor && (
                  <OutlinedButton
                    onClick={() => router.push("/instructor/create-event")}
                    className={`${styles.outline_eventtbn}`}
                    icon={<SVG.Plus />}
                  >
                    Create New Event
                  </OutlinedButton>
                )}

                <Nav.Link href="#" className={`${styles.mains}`}>
                  <SVG.Message width="18px" />
                  <span
                    style={{
                      background: "#CB2C2C",
                      padding: "2px 7px",
                      color: "#fff",
                      fontSize: "12px",
                      borderRadius: "100%",
                      position: "relative",
                      right: "3px",
                    }}
                  >
                    3
                  </span>
                </Nav.Link>
                <Nav.Link className="navDropdown">
                  <Dropdown className={`${styles.headerDropdown}`}>
                    <Dropdown.Toggle>
                      <AvatarComponent
                        src={currentUserDetail.profileImage}
                        title={currentUserDetail.email[0] || ""}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {currentUserDetail.defaultRole === USER_ROLES.apprentice
                        ? ApprenticeDropDownList.map((item) => (
                            <Dropdown.Item
                              key={item.id}
                              href={item.url}
                              className={`${styles.listDropdown}`}
                            >
                              {item.icon} {item.title}
                            </Dropdown.Item>
                          ))
                        : InstructorDropDownList.map((item) => (
                            <Dropdown.Item
                              key={item.id}
                              onClick={() => item.url && router.push(item.url)}
                              className={`${styles.listDropdown}`}
                            >
                              {item.icon} {item.title}
                            </Dropdown.Item>
                          ))}

                      <Dropdown.Item
                        onClick={() => handleLogout()}
                        className={`${styles.listDropdown}`}
                      >
                        <SVG.Logout /> Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default UserHeaderComponent;
