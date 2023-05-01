import React from "react";
import { Dropdown } from "react-bootstrap";

interface IOptionsInput {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

function OptionsInputComponent({ title, footer, children }: IOptionsInput) {
  return (
    <Dropdown className="me-2 ">
      <Dropdown.Toggle
        style={{
          background: "transparent",
          border: "1px solid #333333",
          borderRadius: "4px",
        }}
        id="dropdown-basic"
      >
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="mt-1"
        style={{
          boxShadow: " 0px 4px 12px 0px #00000073",
          border: "0",
          borderRadius: "8px",
        }}
      >
        {children}
        {footer && (
          <div
            className="d-flex dropdownSwitch"
            style={{ borderTop: "1px solid #ddd" }}
          >
            {footer}
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OptionsInputComponent;
