"use client";
import React from "react";
import { Alert } from "antd";
import style from "./alertbox.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { alertMessage, setAlertMessage } from "@/redux/reducers/modalsToggle";

const AlertBox = () => {
  // redux
  const dispatch = useAppDispatch();
  const alertMessageData = useAppSelector(alertMessage);

  return (
    <div className={style.alertBoxContainer}>
      <Alert
        // message={"Error Text"}
        description={alertMessageData.message}
        style={{
          background: alertMessageData.error ? "#cb2c2c" : "#00A167",
          border: alertMessageData.error
            ? "1px solid #cb2c2c"
            : "1px solid #00A167",
        }}
        closable
        onClose={() =>
          dispatch(setAlertMessage({ error: false, message: "", show: false }))
        }
      />
    </div>
  );
};

export default AlertBox;
