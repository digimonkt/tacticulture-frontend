/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FilledButton } from "@/component/buttons";
import { CheckInput, LabeledInput } from "@/component/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { guestProfileCreate } from "@/redux/reducers/booking";
import { Col, Row } from "antd";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";

interface IRegisterGuest {
  handleStepNext: () => void;
  handleStepPrev: () => void;
}

function RegisterGuestComponent({
  handleStepNext,
  handleStepPrev,
}: IRegisterGuest) {
  const dispatch = useAppDispatch();
  const [publicProfile, setPublicProfile] = useState(false);

  const { registrationData, guestProfileStatus } = useAppSelector(
    (state) => state.BookingReducer
  );

  const { currentUser } = useAppSelector(state => state.userReducer);

  console.log({ currentUser });

  useEffect(() => {
    formik.setFieldValue("guestFirstName", currentUser.firstName);
    formik.setFieldValue("guestLastName", currentUser.lastName);
    formik.setFieldValue("guestPhone", currentUser.phoneNumber);
  }, [currentUser]);

  const formik = useFormik({
    initialValues: { guestFirstName: "", guestLastName: "", guestPhone: "" },
    validationSchema: Yup.object({
      guestFirstName: Yup.string().required("first name is required"),
      guestLastName: Yup.string().required("last name is required"),
      guestPhone: Yup.string().required("phone is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        // @ts-ignore
        guestProfileCreate({
          email: registrationData.email,
          first_name: values.guestFirstName,
          last_name: values.guestLastName,
          phone_number: values.guestPhone,
          is_public_profile: publicProfile,
        })
      );
    },
  });

  useEffect(() => {
    if (guestProfileStatus === "success") {
      handleStepNext();
    }
  }, [guestProfileStatus]);

  return (
    <div className="guestBody ">
      <div className="scheduleSteps pb-2">
        <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
          {registrationData.email}
        </span>
        <div className="counters">
          <span style={{ background: "#CB2C2C" }}></span>
          <span style={{ background: "#CB2C2C" }}></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="guest">
        <h3>Your Profile Information</h3>
        <Row>
          <Col md={12}>
            <LabeledInput
              {...formik.getFieldProps("guestFirstName")}
              placeholder="First Name*"
            />
            <p style={{ color: "red" }} className="verificationErrors">
              {formik.errors.guestFirstName}
            </p>
          </Col>

          <Col md={12}>
            <LabeledInput
              {...formik.getFieldProps("guestLastName")}
              placeholder="Last Name*"
            />
            <p style={{ color: "red" }} className="verificationErrors">
              {formik.errors.guestLastName}
            </p>
          </Col>

          <Col md={12}>
            <LabeledInput
              {...formik.getFieldProps("guestPhone")}
              placeholder="Phone Number*"
            />
            <p style={{ color: "red" }} className="verificationErrors">
              {formik.errors.guestPhone}
            </p>
          </Col>
          <Col md={12}>
            <FilledButton onClick={() => formik.handleSubmit()}>
              Continue to Event Information
            </FilledButton>
          </Col>

          <div className="publicView">
            <CheckInput
              onClick={(e: any) => setPublicProfile(e.target.checked)}
            />
            <p>
              Create a Tacticulture public profile to display my completed
              achievements <span>(uncheck for private)</span>
            </p>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default RegisterGuestComponent;
