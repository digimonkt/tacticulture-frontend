import { Col, Radio, Row } from "antd";
import React from "react";
import styles from "../../profile.module.css";
import { LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
// import SelectDropdown from "@/component/select-dropdown";

function Step5() {
  return (
    <div>
      <div className="text-start">
        <h4 className="ps-4 ms-2">Billing Information</h4>
      </div>
      <Row
        style={{ borderBottom: "1px solid #5e5e5e" }}
        className={`${styles.billingForm}`}
      >
        <Col md={12}>
          <div className={`${styles.labeled}`}>
            <label>First Name*</label>
            <LabeledInput className={`${styles.registrationInput}`} />
          </div>
        </Col>
        <Col md={12}>
          <div className={`${styles.labeled}`}>
            <label>Last Name*</label>
            <LabeledInput className={`${styles.registrationInput}`} />
          </div>
        </Col>
        <Col md={24}>
          <div className={`${styles.labeled}`}>
            <label>Street Address*</label>
            <LabeledInput className={`${styles.registrationInput}`} />
          </div>
        </Col>

        <Col md={12}>
          <div className={`${styles.labeled}`}>
            <label>City*</label>
            <LabeledInput className={`${styles.registrationInput}`} />
          </div>
        </Col>
        <Col md={4}>
          <div className={`${styles.labeled}`}>
            <label>State*</label>
            {/* <SelectDropdown /> */}
          </div>
        </Col>
        <Col md={8}>
          <div className={`${styles.labeled}`}>
            <label>Zip Code*</label>
            <LabeledInput className={`${styles.registrationInput}`} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={16} className="text-start">
          <h4 style={{ marginLeft: "36px", paddingTop: "12px" }}>Pay with</h4>
          <div className={`${styles.BillingSection}`}>
            <div className="d-flex align-items-center justify-content-between pb-3 pt-1">
              <label>
                <Radio />
                Credit / Debit Card
              </label>
              <div>
                <SVG.Lock width="18px" />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: " 0 10px",
                    position: "relative",
                    top: "3px",
                  }}
                >
                  Secure Form
                </span>
              </div>
            </div>
            <Row>
              <Col md={24} className="mb-4">
                <LabeledInput
                  className={`${styles.registrationInput}`}
                  placeholder="0000 0000 0000 0000"
                />
              </Col>
              <Col md={8} className="me-3">
                <LabeledInput
                  className={`${styles.registrationInput}`}
                  type="date"
                />
              </Col>
              <Col md={6} className="me-3">
                <LabeledInput
                  className={`${styles.registrationInput}`}
                  placeholder="555"
                />
              </Col>
              <Col md={8}>
                <LabeledInput
                  className={`${styles.registrationInput}`}
                  placeholder="78619"
                />
              </Col>
            </Row>
          </div>
          <div className={`${styles.paypal}`}>
            <label>
              <Radio />
              Paypal
            </label>
          </div>
        </Col>
        <Col md={8}>
          <div className="text-start mt-5 pt-2 pe-4 ps-4">
            <span
              style={{
                fontSize: "14px",
                color: "#CCCCCC",
                fontWeight: "700",
                fontFamily: "Proxima Nova",
              }}
            >
              Order Summary
            </span>
            <p
              className="mb-0 pb-4"
              style={{
                fontFamily: "Proxima Nova",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Instructor Pro Annual Membership -
              <span style={{ fontWeight: "300" }}> $32/mo.</span>
            </p>
            <div
              style={{
                borderBottom: "1px solid #DDDDDD",
                borderTop: "1px solid #DDDDDD",
              }}
              className="pt-3 pb-3"
            >
              <div className="d-flex align-items-center justify-content-between pb-3">
                <span
                  style={{
                    fontFamily: "Proxima Nova",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#ddd",
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontFamily: "Proxima Nova",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  $384.00
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span
                  style={{
                    fontFamily: "Proxima Nova",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#ddd",
                  }}
                >
                  Sales Tax (6.6%)
                </span>
                <span
                  style={{
                    fontFamily: "Proxima Nova",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  $25.34
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
              <span
                style={{
                  fontFamily: "Proxima Nova",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#ddd",
                }}
              >
                Due Today
              </span>
              <span
                style={{
                  fontFamily: "Proxima Nova",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                $25.34
              </span>
            </div>
            <FilledButton
              style={{
                fontSize: "20px",
                background: "#CB2C2C",
                fontFamily: "Proxima Nova",
                fontWeight: "700",
                width: "216px",
                height: "56px",
                color: "#fff",
                borderRadius: "4px",
                border: "0",
              }}
            >
              Complete Checkout
            </FilledButton>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Step5;
