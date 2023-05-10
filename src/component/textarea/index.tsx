import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./textArea.module.css";
import { FieldInputProps } from "formik";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

interface ITextArea {
  bioValue: string;
  handleChange: (arg: string) => void;
  formikProps: FieldInputProps<string>;
}

function TextareaComponent({ bioValue, handleChange, formikProps }: ITextArea) {
  return (
    <div className={`${styles.BioComponent}`}>
      <h4>Your Bio</h4>
      <QuillNoSSRWrapper
        theme="snow"
        value={bioValue}
        onChange={(vl) => {
          handleChange(vl);
          formikProps.onBlur({ target: { name: formikProps.name } });
        }}
      />
    </div>
  );
}

export default TextareaComponent;
