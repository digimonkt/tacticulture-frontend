import { SVG } from "@/assets/svg";
import { Checkbox, Col, Row } from "antd";
import React, { ReactEventHandler } from "react";
import styles from "./schedule.module.css";
import { LabeledInput } from "../input";

type AvailabilitySchedule = {
  startTime: string;
  endTime: string;
};
export interface IScheduleEvent {
  id: string;
  day: string;
  isChecked: boolean;
  schedules: AvailabilitySchedule[];
}

interface IScheduleEventComponent extends IScheduleEvent {
  handleAddSchedule: () => void;
  handleUpdateStart: (idx: number, value: string) => void;
  handleUpdateEnd: (idx: number, value: string) => void;
  handleRemoveSchedule: (idx: number) => void;
  handleChangeChecked: (value: boolean) => void;
}

function ScheduleEventComponent({
  day,
  isChecked,
  schedules,
  id,
  handleAddSchedule,
  handleChangeChecked,
  handleUpdateStart,
  handleUpdateEnd,
  handleRemoveSchedule,
}: IScheduleEventComponent) {
  return (
    <div>
      <Row className="mt-3">
        <Col md={3}>
          <p
            className="text-white mb-0 mt-3"
            style={{
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            <Checkbox
              checked={isChecked}
              onChange={(e) => handleChangeChecked(e.target.checked)}
            />
            &nbsp;{day}
          </p>
        </Col>
        <Col md={12}>
          <div className={`${styles.box}`}>
            {schedules.length ? (
              schedules.map((schedule, idx) => {
                return (
                  <>
                    <LabeledInput
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) => handleUpdateStart(idx, e.target.value)}
                    />
                    <span>-</span>
                    <LabeledInput
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) => handleUpdateEnd(idx, e.target.value)}
                    />
                    <span
                      className="ps-2"
                      onClick={() => handleRemoveSchedule(idx)}
                    >
                      <SVG.Trash width="24px" />
                    </span>
                  </>
                );
              })
            ) : (
              <p className="mb-0 mt-3">Unavailable</p>
            )}
          </div>
        </Col>
        <Col md={4}>
          <div className="mt-3">
            <span className="pe-3">
              <SVG.File width="24px" />
            </span>

            <span onClick={handleAddSchedule}>
              <SVG.Plus width="24px" />
            </span>
          </div>
        </Col>
      </Row>
      <hr />
    </div>
  );
}

export default ScheduleEventComponent;