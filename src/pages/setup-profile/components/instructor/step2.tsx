import { SVG } from "@/assets/svg";
import { Checkbox, Col, Row } from "antd";
import React from "react";
import styles from "../../profile.module.css";
import { LabeledInput } from "@/component/input";

function Step2() {
  const Item = [
    {
      id: "1",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Sunday",
    },
    {
      id: "2",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Monday",
    },
    {
      id: "3",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Tuesday",
    },
    {
      id: "4",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Wednesday",
    },
    {
      id: "5",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Thursday",
    },
    {
      id: "6",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Friday",
    },
    {
      id: "7",
      check: (
        <>
          <Checkbox />
        </>
      ),
      name: "Saturday",
    },
  ];
  return (
    <>
      <div
        className="ps-4 pe-4 pb-3"
        style={{ borderBottom: "1px solid #555" }}
      >
        <h4>Set Your Default Availability</h4>
        <p className="mb-0">
          Configure your general availability for Open Availability Events
          <SVG.InfoIcon width="16px" />
        </p>
      </div>
      <Row className="mt-4">
        <Col md={12} className="ps-4 pe-2">
          <div className={`${styles.Hours}`}>
            <label>Available Hours</label>
            <LabeledInput type="time" className="form-control " />
          </div>
        </Col>
        <Col md={12} className="pe-4 ps-2">
          <div className={`${styles.Hours}`}>
            <label className="mb-4"></label>
            <LabeledInput type="time" className="form-control" />
          </div>
        </Col>
      </Row>

      <div className={`${styles.Weekend}`}>
        <>
          {Item.map((Item) => (
            <div className={`${styles.innerSection}`} key={Item.id}>
              <span>{Item.check}</span>
              <p className="mb-0">{Item.name}</p>
            </div>
          ))}
        </>
      </div>
      <div style={{ borderBottom: "1px solid #555" }} className="text-center">
        <p className="ps-4 pe-4">
          You can still configure and further customize your availability later,
          or individually for each event!
        </p>
      </div>
    </>
  );
}

export default Step2;
