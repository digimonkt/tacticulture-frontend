import React from "react";
import styles from "../../styles.module.css";
import { Col, Row } from "antd";

import { FilledButton } from "@/component/buttons";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import moment from "moment";

interface IEmbedCardComponent {
  icon?: React.ReactNode;
  images?: React.ReactNode;
  heading?: string;
  address?: string;
  text?: string;
  label?: string;
  classname?: string;
  timeDuration?: {
    eventEndDate: string;
    eventEndTime: string;
    eventStartDate: string;
    eventStartTime: string;
  };
  onClick?: () => void;
}

function EmbedCardComponent({
  icon,
  heading,
  address,
  text,
  label,
  classname,
  images,
  timeDuration,
  ...rest
}: IEmbedCardComponent) {
  return (
    <div className={`${styles.locationbox}`} {...rest}>
      <Row>
        {icon && (
          <Col md={2}>
            <div className="pt-0 d-flex align-items-center h-100">{icon}</div>
          </Col>
        )}
        <Col md={16}>
          <div>
            {heading && <h6>{heading}</h6>}
            {timeDuration && (
              <h6>
                {`${moment(timeDuration.eventStartDate).format(
                  "MMMM DD, YYYY"
                )} -
                  ${moment(timeDuration.eventEndDate).format("MMMM DD, YYYY")}`}
              </h6>
            )}
            {text && <h3>{text}</h3>}
            <span className={classname} style={{ color: " #cb2c2c;" }}>
              {address}
            </span>
          </div>
        </Col>
        <Col md={6}>
          <div className="pt-0 text-center d-flex align-items-center h-100 justify-content-end">
            {images && <Image src={IMAGES.Badge} alt="" />}
            {label && (
              <FilledButton className={`${styles.btnMap}`}>
                {label}{" "}
              </FilledButton>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EmbedCardComponent;
