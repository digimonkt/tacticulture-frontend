import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};
function TextAreaComponents() {
  return (
    <div>
      <TextArea showCount maxLength={100} onChange={onChange} rows={5} />
    </div>
  );
}

export default TextAreaComponents;
