import { Col, Row } from "antd";
import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import styles from "../../../pages/setup-profile/profile.module.css";
import { LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";
import TextareaComponent from "@/component/textarea";
import { useFormik } from "formik";
import { instructorStepOneValidationSchema } from "@/utils/validations/instructorProfileValidation";
import TimeZoneComponent from "@/component/timezone";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setPreLoader } from "@/redux/reducers/preLoader";
import { updateUser } from "@/api/user";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { useRouter } from "next/router";
import { updateCurrentUser } from "@/redux/reducers/user";

export interface InstructorStepOneRef {
  handleSubmitAccountDetail: () => void;
}

type InitialValuesType = {
  customUrl?: string;
  bio: string;
  timezone: string;
};

// function Step1() {

const Step1 = forwardRef(function Step1(props, ref: Ref<InstructorStepOneRef>) {
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.userReducer);

  // state management
  const [customUrlError, setCustomUrlError] = useState<boolean | null>(null);

  // formik
  const formik = useFormik<InitialValuesType>({
    initialValues: {
      customUrl: undefined,
      bio: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    validationSchema: instructorStepOneValidationSchema,
    onSubmit: (values) => {
      handleUpdateProfile(values, true);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2000);
  };

  // handle submit
  const handleUpdateProfile = async (
    values: InitialValuesType,
    isNavigable: boolean
  ) => {
    dispatch(setPreLoader(true));
    const payload = {
      username: values.customUrl,
      bio: values.bio,
      timezone: values.timezone,
    };
    const response = await updateUser(payload);

    if (response.remote === "success") {
      setCustomUrlError(false);
      isNavigable &&
        dispatch(
          updateCurrentUser({
            ...currentUser,
            username: values.customUrl || "",
            bio: values.bio || "",
            timezone: values.timezone || "",
          })
        );
      isNavigable &&
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: 2 },
        });
    } else {
      if (response.error.status === 500) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
      } else if (response.error.status === 404) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
      } else {
        response.error.status === 400 &&
          response.error.errors?.username?.length &&
          setCustomUrlError(true);
        handleResetAlert();
      }
    }
    dispatch(setPreLoader(false));
  };

  // ----

  useImperativeHandle(ref, () => ({
    handleSubmitAccountDetail: formik.handleSubmit,
  }));

  return (
    <div>
      <h5
        className="ms-4 me-4"
        style={{
          fontSize: "24px",
          fontWeight: "800",
          letterSpacing: "1px",
          fontFamily: "Proxima Nova",
        }}
      >
        Create your Tacticulture URL & Username
      </h5>
      <span
        className="ms-4 me-4 d-block"
        style={{ fontSize: "14px", letterSpacing: "1px", width: "80%" }}
      >
        Choose a URL that describes you or your business in a concise way. Make
        it short and easy to remember so you can share links with ease.
      </span>
      <Row className="mt-4" style={{ borderBottom: "1px solid #555555" }}>
        <Col md={8} className="ps-4">
          <div className={`${styles.lefthead}`}>
            <h5>tacticulture.com/</h5>
            <span>Username:</span>
            <h6>@{formik.values.customUrl}</h6>
          </div>
        </Col>
        <Col md={16} className="pe-4">
          <div className={`${styles.Instruction}`}>
            <div className="position-relative Instructor">
              <LabeledInput
                value={formik.values.customUrl}
                onChange={(e) => {
                  if (customUrlError === true || customUrlError === false) {
                    setCustomUrlError(null);
                  }
                  formik.setFieldValue("customUrl", e.target.value);
                }}
                onBlur={(e) => {
                  handleUpdateProfile(
                    {
                      customUrl: formik.values.customUrl,
                      bio: "",
                      timezone: "",
                    },
                    false
                  );
                  formik.getFieldProps("firstName").onBlur(e);
                }}
              />
              {formik.values.customUrl !== "" && customUrlError && (
                <>
                  <SVG.ExclamanationIcon
                    style={{
                      position: "absolute",
                      right: "14px",
                      bottom: "14px",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </>
              )}
            </div>
            <ul className="p-0">
              {formik.values.customUrl !== "" && customUrlError ? (
                <li>
                  <SVG.ExclamanationIcon
                    className={`${styles.firstLine}`}
                    width="15px"
                  />
                  That has already been reserved, please modify further
                </li>
              ) : formik.values.customUrl !== "" && customUrlError === false ? (
                <li>
                  <SVG.Fillcheck
                    className={`${styles.secondLine}`}
                    width="15px"
                  />
                  That URL is available
                </li>
              ) : null}
            </ul>
          </div>
        </Col>
      </Row>
      <div className={`${styles.timeZone}`}>
        <TimeZoneComponent
          title="Time zone"
          value={formik.values.timezone}
          onChange={(vl) => formik.setFieldValue("timezone", vl)}
        />
      </div>
      <div className={`${styles.textArea}`}>
        <TextareaComponent
          title="Your Bio"
          value={formik.values.bio}
          onChange={(vl) => formik.setValues({ ...formik.values, bio: vl })}
        />
      </div>
    </div>
  );
});

export default Step1;
