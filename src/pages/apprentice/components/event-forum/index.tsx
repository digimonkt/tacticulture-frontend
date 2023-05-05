import { IMAGES } from "@/assets/images";
import { Checkbox, Col, Row } from "antd";
import Image from "next/image";
import styles from "./styles.module.css";
import React from "react";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import { TextInput } from "@/component/input";

interface IEventForum {
  heading?: string;
  text?: string;
}

function EventForumComponent({ heading, text }: IEventForum) {
  const data = [
    { id: 1, image: IMAGES.ProfilePic, name: "Kristoper roy" },
    { id: 2, image: IMAGES.ProfilePic, name: "Kristoper roy" },
  ];

  const publish = [
    {
      id: 1,
      image: IMAGES.Communityprofile,
      heading: "Eddie Gallagher - Dec 7 ",
      text: "- Pinned",
      content: "A Pinned Post will always go to the top of the community forum",
    },
    {
      id: 2,
      image: IMAGES.Communityprofile,
      heading: "Eddie Gallagher - Dec 7 ",
      text: "- Pinned",
      content: "A Pinned Post will always go to the top of the community forum",
    },
    {
      id: 3,
      image: IMAGES.Communityprofile,
      heading: "Eddie Gallagher - Dec 7 ",
      text: "- Pinned",
      content: "A Pinned Post will always go to the top of the community forum",
    },
  ];

  return (
    <div>
      <Row
        className="forumRow"
        style={{ borderBottom: "1px solid #474747", paddingBottom: "10px" }}
      >
        <Col md={3}>
          <div className="text-center">
            <Image src={IMAGES.Badge} alt="" />
          </div>
        </Col>
        <Col md={21}>
          <div className={`${styles.eventDetails}`}>
            <h6>Event Title Goes Here Short</h6>
            <div className="d-flex align-items-center">
              <span
                className="d-flex align-items-center me-4"
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontFamily: "Proxima Nova",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
              >
                <Image src={IMAGES.ProfilePic} alt="" className="me-2" />
                Eddie Gallagher
              </span>
              <span
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontFamily: "Proxima Nova",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              >
                <SVG.Location width="20px" className="me-2 svgIcon" />
                Location Name
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <div className={`${styles.eventDetails}`}>
        <Row style={{ padding: "20px" }}>
          <Col
            md={16}
            className="pb-3"
            style={{ borderBottom: "1px solid #474747" }}
          >
            {heading ? <h6 className="mb-0">{heading}</h6> : ""}
            {text ? <p className="ps-0">{text}</p> : ""}
            <TextInput row={5} />
            <div className="position-relative">
              <div
                className="replyevent"
                style={{ position: "absolute", top: "8px", zIndex: "999" }}
              >
                <Checkbox />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fff",
                    letterSpacing: "1px",
                    fontFamily: "Proxima Nova",
                    marginLeft: "10px",
                  }}
                >
                  Event Community can reply
                </span>
              </div>
              <div className="text-end mt-3 position-relative ">
                <div
                  style={{
                    position: "absolute",
                    right: "36%",
                    top: "8px",
                  }}
                >
                  <input type="file" className="publishImg" />
                  <Image src={IMAGES.Gif} alt="" className="me-2" />
                </div>
                <FilledButton
                  style={{
                    background: "#CB2C2C",
                    fontWeight: "700",
                    fontFamily: "Proxima Nova",
                    color: "#fff",
                    border: "0",
                    height: "37px",
                    width: "160px",
                    fontSize: "17px",
                    borderRadius: "4px",
                    letterSpacing: "2px",
                  }}
                >
                  Publish Update{" "}
                </FilledButton>
              </div>
            </div>
          </Col>
          <Col
            md={8}
            className="communityRight mt-5"
            style={{ paddingTop: "40px" }}
          >
            <div className={`${styles.communityEvent}`}>
              <h6>Event Community</h6>
              <ul className="p-0">
                {data.map((data) => (
                  <li
                    key={data.id}
                    className="mb-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      fontFamily: "Proxima Nova",
                    }}
                  >
                    <Image src={data.image} alt="" className="me-2" />
                    {data.name}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
        <div className={`${styles.publishSection}`}>
          {publish.map((publish) => (
            <Row className={`${styles.mainSection}`} key={publish.id}>
              <Col md={3}>
                <div>
                  <Image src={publish.image} alt="" />
                </div>
              </Col>
              <Col md={20}>
                <div>
                  <h6 className="mb-0">
                    {publish.heading}
                    <span style={{ fontWeight: "400", color: "#FF4646" }}>
                      {publish.text}
                    </span>
                  </h6>

                  <p className="pt-2 ps-0" style={{ fontWeight: "400" }}>
                    {publish.content}
                  </p>
                  <div>
                    <span className="me-3 text-white">
                      <SVG.Like
                        width="20px"
                        style={{ position: "relative", bottom: "3px" }}
                      />{" "}
                      0
                    </span>
                    <span className="text-white">
                      <SVG.Comment
                        width="20px"
                        style={{ position: "relative", bottom: "1px" }}
                      />
                      &nbsp;0
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={1}>
                <div>
                  <Image src={IMAGES.Dots} alt="" />
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventForumComponent;
