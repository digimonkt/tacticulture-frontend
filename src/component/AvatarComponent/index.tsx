import { Avatar, AvatarProps } from "antd";
import React from "react";

interface Props extends AvatarProps {
  title: string;
}

const AvatarComponent = ({ title, style, ...rest }: Props) => {
  return (
    <Avatar
      style={{
        border: "2px solid #fff",
        lineHeight: "24px",
        ...(style || {}),
      }}
      {...rest}
    >
      {title}
    </Avatar>
  );
};

export default AvatarComponent;
