import { FilledButton } from "@/component/buttons";
import { LabeledInput, SelectInput } from "@/component/input";
import { Col, Radio, Row } from "antd";
import React from "react";

function BillingInformationComponent() {
  return (
    <div className="bg-white">
      <div className="guestBody">
        <div className="BillingBody ">
          <div className="scheduleSteps pb-2">
            <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
              kris@kristopherray.com
            </span>
          </div>
          <div className="guest">
            <h3>Checkout Billing Information</h3>
          </div>
          <Row>
            <Col md={12} className="input-1">
              <LabeledInput placeholder="First Name*" />
            </Col>
            <Col md={12} className="input-1">
              <LabeledInput placeholder="Last Name*" />
            </Col>
            <Col md={24} className="input-3">
              <LabeledInput placeholder="Address Line 1" />
            </Col>
            <Col md={12} className="input-4">
              <LabeledInput placeholder="City*" />
            </Col>
            <Col md={6} className="input-5">
              <SelectInput />
            </Col>
            <Col md={6} className="input-6">
              <LabeledInput placeholder="Zip Code*" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="billingDiv">
        <Row className="w-100 justify-content-between">
          <Col md={14}>
            <h4>Pay with</h4>
            <div className="creditSection mb-3">
              <div className="mb-2">
                <Radio />
                <span>
                  <b>Credit / Debit Card</b>
                </span>
              </div>
              <LabeledInput placeholder="Card Number*" />
              <div className="cvvSection">
                <LabeledInput placeholder="Exp. Date*" />
                <LabeledInput placeholder="CVV*" />
                <LabeledInput placeholder="Zip Code" />
              </div>
            </div>
            <div className="paypal">
              <div className="mb-2">
                <Radio />
                <span>Credit / Debit Card</span>
              </div>
            </div>
            <div className="orderBtn">
              <FilledButton>Place Order</FilledButton>
            </div>
          </Col>
          <Col md={8}>
            <div className="orderSummary">
              <span>Order Summary</span>
              <h6>Course or Event Title Goes Here</h6>
              <p> January 07, 2023</p>
              <p> Event Start: 8:00am</p>
              <h5>
                {" "}
                + Additional Custom Question Checkbox{" "}
                <span style={{ fontWeight: "bold" }}>(+$50)</span>
              </h5>
              <h5>
                {" "}
                + Custom Question Selection{" "}
                <span style={{ fontWeight: "bold" }}>(+$50)</span>
              </h5>
            </div>
            <div className="summary">
              <div className="d-flex align-items-center justify-content-between">
                <span>Subtotal</span>
                <span>$550.00</span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Fees</span>
                <span>$550.00</span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Sales Tax</span>
                <span>$550.00</span>
              </div>
            </div>
            <div className="total d-flex align-items-center justify-content-between">
              <span>Total</span>
              <span>$550.00</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BillingInformationComponent;
