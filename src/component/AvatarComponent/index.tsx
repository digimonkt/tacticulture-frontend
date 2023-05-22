import { Avatar, AvatarProps } from "antd";
import React from "react";

interface Props extends AvatarProps {
  imageUrl?: string;
  title?: string;
}

const AvatarComponent = ({ title, imageUrl, style, ...rest }: Props) => {
  return (
    <Avatar
      style={{
        border: "2px solid #fff",
        lineHeight: "24px",
        ...(style || {}),
      }}
      src={imageUrl}
      {...rest}
    >
      {title && title[0]}
    </Avatar>
  );
};

export default AvatarComponent;
