import React, { useState } from "react";
import styles from "../../styles.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Col, Row } from "antd";
import { SVG } from "@/assets/svg";

function BillingComponent() {
  const [check, setCheck] = useState(false);
  return (
    <div>
      <div className={`${styles.billing}`}>
        <h3>Billing</h3>
      </div>
      <div className={`${styles.accounts}`}>
        <h4>Apprentice Account:</h4>
        <p>
          <span>Free Forever!</span> Book your training and track your
          achievements totally free.
        </p>
        <div
          className="mt-3 d-flex align-items-center"
          style={{
            borderBottom: "1px solid #474747",
            paddingBottom: "22px",
            width: "565px",
          }}
        >
          <FilledButton className={`${styles.eventbtn}`}>
            Browse Events{" "}
          </FilledButton>
          <OutlinedButton className={`${styles.orderbtn}`}>
            Manage Orders
          </OutlinedButton>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-3 pe-4 ps-0">
          <h6
            className="mb-0 "
            style={{
              color: "#fff",
              fontFamily: "Proxima Nova",
              fontSize: "21px",
              letterSpacing: "1px",
              fontWeight: "800",
            }}
          >
            Instructor Account:
          </h6>
          <div>
            <FilledButton
              className={`${styles.planBtn}`}
              style={{
                color: "rgb(203, 44, 44)",
                fontSize: "15px",
                fontWeight: "700",
                background: "#FFFFFF",
                borderRadius: "3px",
                width: "133px",
                height: "34px",
                border: "0",
                letterSpacing: "1px",
                fontFamily: "Proxima Nova",
                marginRight: "14px",
              }}
            >
              {" "}
              Paid Annually{" "}
            </FilledButton>
            <FilledButton
              className={`${styles.annually}`}
              style={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
                background: "transparent",
                borderRadius: "3px",
                width: "133px",
                height: "34px",
                border: "1px solid #fff",
                letterSpacing: "1px",
                fontFamily: "Proxima Nova",
              }}
            >
              {" "}
              Paid Monthly{" "}
            </FilledButton>
          </div>
        </div>
        <Row>
          <Col md={12}>
            <div className={`${styles.billingBoxes}`}>
              <span className={`${styles.checkicons}`}>
                <SVG.Rightcheck width="30px" /> Current Plan
              </span>
              <h6>Instructor Basic</h6>
              <h1>$0</h1>
              <span>per month.</span>
              <p className="mb-0">
                All the best basic features and Tacticulture systems, free
                forever.
              </p>
              <div className={`${styles.planDownGrade}`}>
                {check ? (
                  <FilledButton className={`${styles.upgradebtn}`}>
                    Downgrade
                  </FilledButton>
                ) : (
                  <FilledButton
                    className={`${styles.currentplanbtn}`}
                    icon={<SVG.Rightcheck />}
                    onClick={() => setCheck(!check)}
                  >
                    {" "}
                    Current Plan
                  </FilledButton>
                )}
              </div>
              <span className="d-block pt-3">Compare Features</span>
            </div>
          </Col>
          <Col md={12}>
            <div className={`${styles.billingBoxes}`}>
              <span>Save 20% annually</span>
              <h6>
                <SVG.Guard />
                Instructor <span>Pro</span>
              </h6>
              <h1>$0</h1>
              <span>per month.</span>
              <p className="mb-0">
                All the best basic features and Tacticulture systems, free
                forever.
              </p>
              <div>
                <FilledButton className={`${styles.upgradebtn}`}>
                  Upgrade Now{" "}
                </FilledButton>
              </div>
              <span className="d-block pt-3">Compare Features</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BillingComponent;
