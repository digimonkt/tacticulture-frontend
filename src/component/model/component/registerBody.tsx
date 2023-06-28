import React, { useState, useEffect } from "react";
import { LabeledInput } from "@/component/input";
import { FilledButton } from "@/component/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "@/component/caption";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { guestOtpSubmit, guestRegistration } from "@/redux/reducers/booking";

interface IRegistrationBody {
  handleStepNext: (guestEmail: string) => void;
  handleStepPrev: () => void;
}

function RegisterBodyComponent({
  handleStepNext,
  handleStepPrev,
}: IRegistrationBody) {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const { guestRegistrationStatus, registrationData, guestOtpStatus } =
    useAppSelector((state) => state.BookingReducer);

  const formik = useFormik({
    initialValues: { guestEmail: "", guestOtp: "" },
    validationSchema: Yup.object({
      guestEmail: Yup.string().required("email is required"),
    }),
    onSubmit: (values) => {
      dispatch(guestRegistration(values.guestEmail));
    },
  });

  useEffect(() => {
    if (guestRegistrationStatus === "success") {
      setShow(true);
    }
  }, [guestRegistrationStatus]);

  useEffect(() => {
    if (guestOtpStatus === "success") {
      handleStepNext();
    }
  }, [guestOtpStatus]);

  return (
    <div>
      <div className="scheduleSteps">
        <span style={{ color: "#CB2C2C", fontWeight: "500" }}>
          Back to Schedule
        </span>
        <div className="counters">
          <span style={{ background: "#CB2C2C" }}></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
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
                {registrationData.email}{" "}
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
          {!show ? (
            <LabeledInput
              {...formik.getFieldProps("guestEmail")}
              placeholder={"Email Address"}
            />
          ) : (
            <LabeledInput
              {...formik.getFieldProps("guestOtp")}
              placeholder={"000000"}
            />
          )}
          {!show && (
            <p style={{ color: "red" }} className="verificationError">
              {formik.errors.guestEmail}
            </p>
          )}
          {show && (
            <p style={{ color: "red" }} className="verificationError">
              {registrationData.verification_code}
            </p>
          )}
          <FilledButton
            onClick={() =>
              show
                ? dispatch(
                    guestOtpSubmit({
                      email: formik.values.guestEmail,
                      verification_code: formik.values.guestOtp,
                    })
                  )
                : formik.handleSubmit()
            }
          >
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
