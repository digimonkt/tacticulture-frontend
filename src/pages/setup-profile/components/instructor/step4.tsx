import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Col, Row } from "antd";
import React from "react";
import styles from "../../profile.module.css";
import { SVG } from "@/assets/svg";

export default function Step4() {
  const Plan = [
    {
      id: "1",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "Unlimited Paid Events",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
    {
      id: "2",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "1 Calendar Integration",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
    {
      id: "3",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "Basic Event Promotion on the Tacticulture events library  ",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
    {
      id: "4",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "Basic Event Promotion on the Tacticulture events library  ",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
    {
      id: "5",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "Basic Event Promotion on the Tacticulture events library  ",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
    {
      id: "6",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "Basic Event Promotion on the Tacticulture events library  ",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
    {
      id: "7",
      check: (
        <>
          <SVG.Fillcheck />
        </>
      ),
      name: "Basic Event Promotion on the Tacticulture events library  ",
      info: (
        <>
          <SVG.InfoIcon />{" "}
        </>
      ),
    },
  ];
  return (
    <div>
      <Row className="pe-4 ps-4">
        <Col md={6}>
          <div>
            <h4 className="mb-0">Choose A Plan</h4>
          </div>
        </Col>
        <Col md={18}>
          <div className="d-flex justify-content-end">
            <FilledButton className={`${styles.btnannual}`}>
              Paid Annually
            </FilledButton>
            <OutlinedButton className={`${styles.btnmonthly}`}>
              Paid Monthly
            </OutlinedButton>
          </div>
        </Col>
        <Col md={12}>
          <div className={`${styles.planDetail}`}>
            <h5>Instructor Basic</h5>
            <h1 className="mb-0">$0</h1>
            <span className="mb-0 d-block">per month.</span>
            <br />
            <FilledButton
              style={{
                background: "#CB2C2C",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "3px",
                fontSize: "17px",
                color: "#fff",
                fontFamily: "Proxima Nova",
                width: "140px",
                height: "37px",
                border: "0",
              }}
            >
              Sign Up Free{" "}
            </FilledButton>
            <ul className="p-0">
              {Plan.map((Plan) => (
                <li key={Plan.id}>
                  <span className={`${styles.CheckIcon}`}> {Plan.check}</span>
                  {Plan.name}
                  <span>{Plan.info}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={12}>
          <div className={`${styles.planDetail}`}>
            <h5>Instructor Pro</h5>
            <h1 className="mb-0">$32</h1>
            <span className="mb-0 d-block">
              per month.
              <br />
              <span style={{ color: "#FF4646" }}> save 20% annually</span>
            </span>
            <br />
            <FilledButton
              style={{
                background: "#CB2C2C",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "3px",
                fontSize: "17px",
                color: "#fff",
                fontFamily: "Proxima Nova",
                width: "140px",
                height: "37px",
                border: "0",
              }}
            >
              Buy Now{" "}
            </FilledButton>
            <ul className="p-0">
              {Plan.map((Plan) => (
                <li key={Plan.id}>
                  <span className={`${styles.CheckIcon}`}> {Plan.check}</span>
                  {Plan.name}
                  <span>{Plan.info}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}
