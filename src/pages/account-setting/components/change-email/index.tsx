import React from "react";
import styles from "../../styles.module.css";
import { FilledButton } from "@/component/buttons";

function EmailChangeComponent() {
  return (
    <>
      <div className={`${styles.changeemail}`}>
        <h3>Change Email</h3>
      </div>
      <div className={`${styles.details}`}>
        <h4>Account Email Address</h4>
        <p>kris@kristopherray.com</p>
        <FilledButton className={`${styles.btnChnage}`}>Change </FilledButton>
      </div>
      ;
    </>
  );
}

export default EmailChangeComponent;
