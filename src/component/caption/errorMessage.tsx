import React from "react";

const ErrorMessageComponent = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <p
      style={{
        color: "red",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: "300",
        marginTop: "8px",
        textAlign: "start",
        paddingLeft: "8px",
      }}
    >
      {props.children}
    </p>
  );
};

export default ErrorMessageComponent;
