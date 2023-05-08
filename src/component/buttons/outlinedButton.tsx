import { IButton } from "@/component/buttons";
import { Button } from "antd";
import React from "react";

function OutlinedButtonComponent({
  className,
  children,
  icon,
  ...rest
}: IButton) {
  return (
    <Button
      className={`btn btn-outline-grey ${className}`}
      {...rest}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon ? <span>{icon}</span> : ""}

      {children}
    </Button>
  );
}

export default OutlinedButtonComponent;
