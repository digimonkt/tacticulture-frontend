import { Col, Row } from "antd";
import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styles from "../../../pages/setup-profile/profile.module.css";
import { LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";
import TextareaComponent from "@/component/textarea";
import { useFormik } from "formik";
import { instructorStepOneValidationSchema } from "@/utils/validations/instructorProfileValidation";
import TimeZoneComponent from "@/component/timezone";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setPreLoader } from "@/redux/reducers/preLoader";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { useRouter } from "next/router";
import { updateUserDetails } from "@/redux/reducers/user";
import { REQUEST_STATUS_TYPE } from "@/utils/enum";

export interface InstructorStepOneRef {
  handleSubmitAccountDetail: () => void;
}

type InitialValuesType = {
  username?: string;
  bio: string;
  timezone: string;
};

// function Step1() {

const Step1 = forwardRef(function Step1(props, ref: Ref<InstructorStepOneRef>) {
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();
  const { currentUser, updateUserStatus, errroList } = useAppSelector(
    (state) => state.userReducer
  );

  // state management
  const [customUrlError, setCustomUrlError] = useState<boolean | null>(null);

  // formik
  const formik = useFormik<InitialValuesType>({
    initialValues: {
      username: undefined,
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
    dispatch(updateUserDetails(values));

    if (updateUserStatus === REQUEST_STATUS_TYPE.fulfilled) {
      setCustomUrlError(false);
      isNavigable &&
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: 2 },
        });
    } else if (updateUserStatus === REQUEST_STATUS_TYPE.rejected) {
      dispatch(
        setAlertMessage({
          error: true,
          message: "Error has occurs!",
          show: true,
        })
      );
      handleResetAlert();
    }
    dispatch(setPreLoader(false));
  };

  // ----

  useImperativeHandle(ref, () => ({
    handleSubmitAccountDetail: formik.handleSubmit,
  }));

  useEffect(() => {
    formik.setFieldValue("username", currentUser.username);
    formik.setFieldValue("bio", currentUser.bio);
    formik.setFieldValue("timezone", currentUser.timezone);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <h6>@{formik.values.username}</h6>
          </div>
        </Col>
        <Col md={16} className="pe-4">
          <div className={`${styles.Instruction}`}>
            <div className="position-relative Instructor">
              <LabeledInput
                value={formik.values.username}
                onChange={(e) => {
                  if (customUrlError === true || customUrlError === false) {
                    setCustomUrlError(null);
                  }
                  formik.setFieldValue("username", e.target.value);
                }}
                onBlur={(e) => {
                  handleUpdateProfile(
                    {
                      username: formik.values.username,
                      bio: "",
                      timezone: "",
                    },
                    false
                  );
                  formik.getFieldProps("username").onBlur(e);
                }}
              />
              {formik.values.username !== "" && customUrlError && (
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
              {formik.values.username !== "" && customUrlError ? (
                <li>
                  <SVG.ExclamanationIcon
                    className={`${styles.firstLine}`}
                    width="15px"
                  />
                  That has already been reserved, please modify further
                </li>
              ) : formik.values.username !== "" && customUrlError === false ? (
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
          onChange={(vl) => formik.setFieldValue("timezone", vl.value)}
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
