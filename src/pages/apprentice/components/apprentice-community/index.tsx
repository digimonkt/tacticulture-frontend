import { SVG } from "@/assets/svg";
import { Col, Row } from "antd";
import Image from "next/image";
import styles from "./apprentice.module.css";
import React, { useState } from "react";
import { IMAGES } from "@/assets/images";

function ApprenticeCommuntity() {
  const [counter, setCounter] = useState(0);

  // Function is called everytime increment button is clicked
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  // Function is called everytime decrement button is clicked
  const handleClick2 = () => {
    // Counter state is decremented
    setCounter(counter - 1);
  };
  const data = [
    {
      id: 1,
      image: IMAGES.Communityprofile,
      heading: "Kristopher Bolleter ·",
      data: "Feb 19",
      content:
        " “Just got done taking   I can’t wait to implement the new training into my dryfire...:",
      course: "  @EddieGallaghers course,",
    },
    {
      id: 2,
      image: IMAGES.Communityprofile,
      heading: "Kristopher Bolleter ·",
      data: "Feb 19",
      content:
        " “Just got done taking   I can’t wait to implement the new training into my dryfire...:",
      course: "  @EddieGallaghers course,",
    },
    {
      id: 3,
      image: IMAGES.Communityprofile,
      heading: "Kristopher Bolleter ·",
      data: "Feb 19",
      coverimg: IMAGES.Uploadcard,
    },
  ];
  return (
    <div>
      {data.map((data) => (
        <Row className={`${styles.mainSection}`} key={data.id}>
          <Col md={3}>
            <div>
              <Image src={data.image} alt="" />
            </div>
          </Col>
          <Col md={21}>
            <div>
              <h6 className="mb-0">
                <SVG.Guard className="me-2" width="17px" />
                {data.heading}
                <span style={{ fontWeight: "400" }}>{data.data}</span>
              </h6>
              {data.coverimg && (
                <Image src={data.coverimg} alt="" className="mt-3" />
              )}
              <p className="pt-0" style={{ fontWeight: "400" }}>
                {data.content}
                <span style={{ fontWeight: "700" }}>{data.course}</span>
              </p>
              <div>
                <span
                  className="me-3"
                  onClick={handleClick1}
                  style={{ cursor: "pointer" }}
                >
                  <SVG.Like
                    width="17px"
                    style={{ position: "relative", bottom: "3px" }}
                  />
                  &nbsp;
                  {counter}
                </span>
                <span onClick={handleClick2} style={{ cursor: "pointer" }}>
                  <SVG.Comment
                    width="17px"
                    style={{ position: "relative", bottom: "1px" }}
                  />
                  &nbsp;{counter}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default ApprenticeCommuntity;
