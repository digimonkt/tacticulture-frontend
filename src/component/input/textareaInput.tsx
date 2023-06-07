import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};
interface ITextAreaComponents {
  row: number;
  text?: string;
}

function TextAreaComponents({ row, text, ...rest }: ITextAreaComponents) {
  return (
    <div>
      {text && <label>{text}</label>}
      <TextArea showCount maxLength={100} rows={row} {...rest} />
    </div>
  );
}

export default TextAreaComponents;
