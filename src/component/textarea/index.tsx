import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./textArea.module.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

function TextareaComponent() {
  const [value, setValue] = useState("");
  return (
    <div className={`${styles.BioComponent}`}>
      <h4>Your Bio</h4>
      <QuillNoSSRWrapper theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

export default TextareaComponent;
