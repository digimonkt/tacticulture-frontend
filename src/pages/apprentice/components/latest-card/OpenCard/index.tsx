import { IMAGES } from "@/assets/images";
import { Row, Col } from "antd";
import Image from "next/image";
import React from "react";
import styles from "../latest.module.css";
import { SVG } from "@/assets/svg";
import { OutlinedButton } from "@/component/buttons";
import { OptionsInput, SwitchInput } from "@/component/input";
import { Card } from "react-bootstrap";

interface IOpenCard {
  data: { name: string };
}

function OpenCard({ data }: IOpenCard) {
  return (
    <Row>
      <Col md={24}>
        <Card className="position-relative cards white">
          <Image src={IMAGES.Card} alt="" className="w-100" />
          <OptionsInput title={<SVG.Setting className="settingIcon" />}>
            <div className={`${styles.dropdownBox}`}>
              <SVG.Edit width="20px" />
              <span
                style={{
                  fontFamily: "Proxima Nova",
                  color: "#444444",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  paddingLeft: "10px",
                  position: "relative",
                  top: "2px",
                }}
              >
                Edit
              </span>
            </div>
            <div className={`${styles.dropdownBox}`}>
              <SVG.Iframe width="20px" />
              <span
                style={{
                  color: "#444444",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  paddingLeft: "10px",
                  position: "relative",
                  top: "2px",
                }}
              >
                Add to Website
              </span>
            </div>
            <div className={`${styles.dropdownBox}`}>
              <SVG.Clone width="20px" />
              <span
                style={{
                  color: "#444444",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  paddingLeft: "10px",
                  position: "relative",
                  top: "2px",
                }}
              >
                Clone
              </span>
            </div>
            <div className={`${styles.dropdownBox}`}>
              <SVG.Delete width="20px" />
              <span
                style={{
                  color: "#444444",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  paddingLeft: "10px",
                  position: "relative",
                  top: "2px",
                }}
              >
                Delete
              </span>
            </div>
            <div className="bottomButton">
              <span>On / Off</span>
              <SwitchInput />
            </div>
          </OptionsInput>
          <div className="eventTitle">
            <h5>{data?.name}</h5>
            <p>[MM.DD.YYYY] + Open Availability</p>
          </div>
          <Card.Body>
            <div className="bodyLink">
              <div className="d-flex">
                <OutlinedButton className="outlineShare">
                  <SVG.Share width="60px" />
                </OutlinedButton>
                <OutlinedButton className="copyShare">
                  <SVG.CopyLink width="80px" />
                </OutlinedButton>
              </div>
              <span>View Course Page</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default OpenCard;
