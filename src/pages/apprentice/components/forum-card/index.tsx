import { IMAGES } from "@/assets/images";
import { Card } from "antd";
import Image from "next/image";
import React from "react";
import styles from "./forumCard.module.css";
import { OptionsInput } from "@/component/input";
import { SVG } from "@/assets/svg";

interface IForumCardComponent {
  Heading: string;
  Content: string;
  Description: string;
}

function ForumCardComponent({
  Heading,
  Content,
  Description,
}: IForumCardComponent) {
  return (
    <div>
      <Card
        style={{
          width: 254,
          position: "relative",
          borderRadius: "6px !important",
          marginBottom: "16px",
        }}
        cover={<Image alt="example" src={IMAGES.Dummypic} />}
      >
        <div className="optionFile">
          <OptionsInput title={<SVG.Setting />}>
            <div className={`${styles.dropdownBox}`}>
              <SVG.UserIcon width="20px" />
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
                Edit Profile
              </span>
            </div>
            <div className={`${styles.dropdownBox}`}>
              <SVG.Clip width="20px" />
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
                Copy Link
              </span>
            </div>
          </OptionsInput>
        </div>
        <div className={`${styles.cardDetail}`}>
          <p>{Heading}</p>
          <span>{Content}</span>
        </div>
        {/* <p className="description">
          <span
            dangerouslySetInnerHTML={{
              __html: Description,
            }}
          ></span>{" "}
        </p> */}
        <p className={`${styles.decriptionText}`}>{Description}</p>
      </Card>
    </div>
  );
}

export default ForumCardComponent;
