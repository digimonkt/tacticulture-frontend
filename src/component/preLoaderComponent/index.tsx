"use client";
import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.preLoaderContainer}>
      <div className={styles["loading-bar"]}>
        <div className={styles["progress-bar"]}></div>
      </div>
    </div>
  );
};

export default Loader;
