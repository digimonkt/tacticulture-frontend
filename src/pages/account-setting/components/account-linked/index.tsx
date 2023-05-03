import { Col, Row } from "antd";
import React from "react";
import styles from "../../styles.module.css";
import { FilledButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import { SwitchInput } from "@/component/input";

function AccountLinkedComponent() {
  return (
    <div>
      <div className="linkedpage">
        <Row>
          <Col md={12}>
            <div className={`${styles.linked}`}>
              <h3>Linked Accounts 1/6</h3>
              <p>Manage your social logins</p>
            </div>
          </Col>
          <Col md={12} className="text-center">
            <div>
              <FilledButton className={`${styles.calenderbtn}`}>
                Add Calendar Account{" "}
              </FilledButton>
            </div>
          </Col>
        </Row>
        <div className={`${styles.linkBox}`}>
          <div className={`${styles.leftside}`}>
            <span>
              <SVG.GoogleIcon width="20px" /> Google
            </span>
            <p className="mb-0">kris@kristopherray.com</p>
          </div>
          <span className={`${styles.rightside}`}>
            Connected <SwitchInput />
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountLinkedComponent;
