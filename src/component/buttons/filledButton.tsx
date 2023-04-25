import React from "react";
import { Button } from "antd";
import { IButton } from "@/component/buttons";

function FilledButtonComponent({
  children,
  className,
  color,
  style,
  ...rest
}: IButton) {
  return (
    <Button
      className={`btn ${className}`}
      style={{ background: color ? color : "#CB2C2C", ...(style || {}) }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default FilledButtonComponent;
