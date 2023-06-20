import React, { useState } from "react";
import { LabeledInput } from "@/component/input";
import { FilledButton } from "@/component/buttons";

function RegisterBodyComponent() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="registerBody">
        {
          <h1>
            {show ? "An Email is On It’s Way!" : "Enter your email address"}
          </h1>
        }
        <p>
          {show ? (
            <>
              {" "}
              We’ve sent an email to{" "}
              <span style={{ color: "#CB2C2C" }}>
                {" "}
                Kris@kristopherray.com{" "}
              </span>{" "}
              This private code confirms your email and allows you to complete
              your registration for this event.
            </>
          ) : (
            " We’ll send you a private event registration code to verify your email and save your spot on the roster."
          )}
        </p>
        <p>
          <b>The link will expire in 4 hours</b>, so be sure to use it soon.
        </p>
        {show && (
          <p>
            <b>Go check your email!</b>
          </p>
        )}
        <div>
          <LabeledInput placeholder={show ? "000000" : "Email Address"} />
          <FilledButton onClick={() => setShow(!show)}>
            Register Now
          </FilledButton>
          {show ? (
            ""
          ) : (
            <p style={{ fontSize: "12px" }} className="pb-5">
              By entering your email you agree to our{" "}
              <span style={{ color: "#CB2C2C" }}>Privacy Policy</span> and
              <span style={{ color: "#CB2C2C" }}>Terms of Use</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterBodyComponent;
