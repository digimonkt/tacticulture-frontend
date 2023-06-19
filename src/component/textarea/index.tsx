import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./textArea.module.css";
import { ReactQuillProps } from "react-quill";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

interface ITextArea extends ReactQuillProps {
  title?: string;
}

function TextareaComponent({ title, ...rest }: ITextArea) {
  return (
    <div className={`${styles.BioComponent}`}>
      <h4>{title}</h4>
      <QuillNoSSRWrapper theme="snow" {...rest} />
    </div>
  );
}

export default TextareaComponent;
