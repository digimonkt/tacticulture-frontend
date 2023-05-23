import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./textArea.module.css";
import { FieldInputProps } from "formik";
import { ReactQuillProps } from "react-quill";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

interface ITextArea extends ReactQuillProps {
  title: string;
  bioValue: string;
  handleChange: (arg: string) => void;
  formikProps: FieldInputProps<string>;
}

function TextareaComponent({
  title,
  bioValue,
  handleChange,
  formikProps,
  ...rest
}: ITextArea) {
  return (
    <div className={`${styles.BioComponent}`}>
      <h4>{title}</h4>
      <QuillNoSSRWrapper
        theme="snow"
        value={bioValue}
        onChange={(vl) => {
          handleChange(vl);
          formikProps.onBlur({ target: { name: formikProps.name } });
        }}
        {...rest}
      />
    </div>
  );
}

export default TextareaComponent;
