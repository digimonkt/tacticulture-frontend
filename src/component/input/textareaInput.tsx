import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

interface ITextAreaComponents {
  row?: number;
  text?: string;
  placeholder?: string;
}

function TextAreaComponents({
  row,
  placeholder,
  text,
  ...rest
}: ITextAreaComponents) {
  return (
    <div>
      {text && <label>{text}</label>}
      <TextArea
        showCount
        maxLength={100}
        placeholder={placeholder}
        rows={row}
        {...rest}
      />
    </div>
  );
}

export default TextAreaComponents;
