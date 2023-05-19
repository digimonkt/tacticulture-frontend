import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./apprenticeHeader.module.css";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/svg";
import { LabeledInput } from "@/component/input";
import { handleLogout } from "@/api/auth";

function ApprenticeHeaderComponent() {
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
              <Nav className="me-auto justify-content-end w-100">
                <Nav.Link href="#" className={`${styles.link}`}>
                  Browse Events
                </Nav.Link>
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
                      <Image src={IMAGES.ProfilePic} alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        className={`${styles.listDropdown}`}
                      >
                        <SVG.Home /> Apprentice Home
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        className={`${styles.listDropdown}`}
                      >
                        <SVG.UpcomingEvent />
                        Upcoming Events
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-3"
                        className={`${styles.listDropdown}`}
                      >
                        <SVG.Apprenticeprofile />
                        Apprentice Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-4"
                        className={`${styles.listDropdown}`}
                      >
                        <SVG.Switch />
                        Switch to Instructor
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-5"
                        className={`${styles.listDropdown}`}
                      >
                        <SVG.Setting />
                        Account Settings
                      </Dropdown.Item>
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

export default ApprenticeHeaderComponent;
