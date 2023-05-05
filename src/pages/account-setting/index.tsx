import ApprenticeHeaderComponent from "@/component/header/apprentice-header";
import React from "react";
import styles from "./styles.module.css";
import { SVG } from "@/assets/svg";
import { Col, Row } from "antd";
import ProfileSettingComponent from "./components/profile-info";
import { Nav, Tab } from "react-bootstrap";
import EmailChangeComponent from "./components/change-email";
import AccountLinkedComponent from "./components/account-linked";
import EmailPreferenceComponent from "./components/email-preference";
import BillingComponent from "./components/billing";

function AccountSetting() {
  return (
    <div>
      <ApprenticeHeaderComponent />
      <div className={`${styles.accountLayout}`}>
        <div className="mainAccount">
          <div
            className="d-flex align-items-center justify-content-between p-3"
            style={{ borderBottom: "1px solid #474747" }}
          >
            <div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#FF3030",
                  letterSpacing: "1px",
                  fontFamily: "Proxima Nova",
                  cursor: "pointer",
                }}
              >
                <SVG.Secondarrow
                  width="20px"
                  className="me-2 arrowclick"
                  style={{ position: "relative", bottom: "1px" }}
                />{" "}
                Go Back
              </span>
              <h3 className={`${styles.heading}`}>Account Settings</h3>
            </div>
            <span
              style={{
                fontSize: "13px",
                fontFamily: "Proxima Nova",
                color: "#fff",
                letterSpacing: "1px",
                fontWeight: "500",
              }}
            >
              Tacticulture member since 2/19/2023
            </span>
          </div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="pt-3 pb-4">
              <Col sm={6}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first" className={`${styles.links}`}>
                      <SVG.UserIcon /> Profile Info
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" className={`${styles.links}`}>
                      <SVG.Message /> Change Email
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third" className={`${styles.links}`}>
                      <SVG.Linked /> Accounts
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="four" className={`${styles.links}`}>
                      <SVG.Lock /> Password
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="five" className={`${styles.links}`}>
                      <SVG.Bell /> Email Preferences
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="six" className={`${styles.links}`}>
                      <SVG.S /> Billing
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="seven" className={`${styles.links}`}>
                      <SVG.Delete /> Close Account
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={18}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <ProfileSettingComponent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <EmailChangeComponent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <AccountLinkedComponent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <h1>no data</h1>
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    <EmailPreferenceComponent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="six">
                    <BillingComponent />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
