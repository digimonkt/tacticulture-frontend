import UploadProfileComponent from "@/component/upload-profile";
import React from "react";
import styles from "../../profile.module.css";
import { Checkbox, Col, Row } from "antd";
import { FormLabel } from "react-bootstrap";
import { LabeledInput } from "@/component/input";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { apprenticeStepOneValidationSchema } from "./validation";
import { useAppDispatch } from "@/redux/hooks/hooks";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { setPreLoader } from "@/redux/reducers/preLoader";
import { updateUser } from "@/api/auth";

interface IRouter {
  userEmail: string;
}

function ApprenticeStep1() {
  // router
  const router = useRouter();

  const { userEmail } = router.query as unknown as IRouter;

  // redux
  const dispatch = useAppDispatch();

  // formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      isPublicProfile: false,
    },
    validationSchema: apprenticeStepOneValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2000);
  };
  // handle submit
  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    password: string;
    isPublicProfile: boolean;
  }) => {
    dispatch(setPreLoader(true));
    const response = await updateUser(values);

    if (response.remote === "success") {
      /* empty */
    } else {
      if (response?.error?.status === 500) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response?.error?.errors,
            show: true,
          })
        );
        handleResetAlert();
        dispatch(setPreLoader(false));
      } else if (response?.error?.status === 404) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response?.error?.errors,
            show: true,
          })
        );
        handleResetAlert();
        dispatch(setPreLoader(false));
      } else {
        // setEmailError(response.error.errors?.email[0]);
        handleResetAlert();
        dispatch(setPreLoader(false));
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <div style={{ borderBottom: "1px solid #555", paddingBottom: "24px" }}>
      <UploadProfileComponent />
      <div className="mt-4 mb-4 pt-2 pb-2 ps-4 pe-4">
        <h5 className={`${styles.accounthead}`}>Your Account Information</h5>
        <div className="d-flex align-items-center ">
          <Checkbox
            checked={formik.values.isPublicProfile}
            onChange={(e) => {
              formik.setFieldValue("isPublicProfile", e.target.checked);
            }}
            className="me-2"
          />
          Create a public profile to log achievements and engage with the
          community{" "}
          <span style={{ fontSize: "12px", fontStyle: "italic" }}>
            (uncheck for private)
          </span>
        </div>
      </div>
      <div className={`${styles.apprenticeForm}`}>
        <Row className="ps-4 pe-4">
          <Col md={12}>
            <div className="me-3 mb-3">
              <FormLabel>
                First Name<span>*</span>
              </FormLabel>
              <LabeledInput {...formik.getFieldProps("firstName")} />
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <FormLabel>
                Last Name<span>*</span>
              </FormLabel>
              <LabeledInput {...formik.getFieldProps("lastName")} />
            </div>
          </Col>
          <Col md={12}>
            <div className="me-3 mb-3">
              <FormLabel>
                Email Address<span>*</span>
              </FormLabel>
              <LabeledInput
                disabled
                value={userEmail}
                style={{ background: "#fff", color: "#000" }}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <FormLabel>Password</FormLabel>
              <LabeledInput {...formik.getFieldProps("password")} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ApprenticeStep1;
