import React, { useState } from "react";
import styles from "../../course.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { IMAGES } from "@/assets/images";
import { Col, Row } from "antd";
import Image from "next/image";
import UploadProfileComponent from "@/component/upload-profile";
import EventHeaderComponent from "../event-header";

function CustomizeEventComponent() {
  const [fileSelect, setFileSelect] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [addImages, setAddImages] = useState<File>();
  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      setAddImages(e.target.files[0]);

      reader.onloadend = function () {
        setFileSelect(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log(addImages);
  return (
    <div>
      <EventHeaderComponent heading="Customize Event Style" />
      <h6
        style={{
          fontSize: "16px",
          fontFamily: "Proxima Nova",
          fontWeight: "700",
          letterSpacing: "1px",
          marginLeft: "20px",
        }}
      >
        Event Image <span style={{ fontStyle: "italic" }}>(optional)</span>
      </h6>
      <div className={`${styles.eventImg}`}>
        {fileSelect ? (
          <>
            <div
              style={{ backgroundImage: `url(${fileSelect})` }}
              className={`${styles.preview}`}
            ></div>
          </>
        ) : (
          <>
            <h6>
              <SVG.Faupload width="16px" /> Drag and Drop Your Image Here to
              Upload
            </h6>
            <p>recommended image size 1200x628px</p>
          </>
        )}
        <OutlinedButton>or Choose a File</OutlinedButton>

        <input type="file" onChange={fileUpload} />
      </div>
      <h6
        style={{
          fontSize: "16px",
          fontFamily: "Proxima Nova",
          fontWeight: "700",
          letterSpacing: "1px",
          marginLeft: "20px",
        }}
      >
        Event Achievement Badge{" "}
        <span style={{ fontStyle: "italic" }}>(optional)</span>
      </h6>
      <div className={`${styles.achievementBadge}`}>
        <Row>
          <Col md={12}>
            <div className="d-flex align-items-center ps-3">
              <Image src={IMAGES.Badge} alt="" className="me-3 pe-1" />
              <p className="mb-0">
                Event Badges are collectable achievement tokens unique to your
                event that your users can share on their profile.{" "}
                <span
                  style={{
                    color: "#FF3030",
                    fontSize: "14px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    fontFamily: "Proxima Nova",
                  }}
                >
                  Learn More
                </span>
              </p>
            </div>
            <div className="text-start mt-4 ms-4">
              <FilledButton className={`${styles.filledbtn}`}>
                Browse Our Badge Library{" "}
              </FilledButton>
            </div>
          </Col>
          <Col md={12} className="hideProfile">
            <UploadProfileComponent />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CustomizeEventComponent;
