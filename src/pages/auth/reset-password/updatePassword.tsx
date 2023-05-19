import React, { useState } from "react";
import Layout from "../layout";
import { LabeledInput } from "@/component/input";
import styles from "../auth.module.css";
import { FilledButton } from "@/component/buttons";
import { useFormik } from "formik";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { setPreLoader } from "@/redux/reducers/preLoader";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { passwordRestValidationSchema } from "./validation";
import { useRouter } from "next/router";
import { resetPassword } from "@/api/auth";
import { ResetPassword } from "@/api/types/auth";
import { ErrorMessage } from "@/component/caption";

interface ISearchQuery {
  token?: string;
  uid?: string;
}

type initialStateType = {
  password: string;
  passwordConfirm: string;
  token?: string;
  uid?: string;
};

function UpdatePasswordComponent() {
  const router = useRouter();

  // redux dispatch
  const dispatch = useAppDispatch();

  const { token, uid } = router.query as unknown as ISearchQuery;
  console.log(token, uid);
  // state management
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const initialStates: initialStateType = {
    password: "",
    passwordConfirm: "",
  };

  // formik
  const formik = useFormik({
    initialValues: initialStates,
    validationSchema: passwordRestValidationSchema,
    onSubmit: (data) => {
      console.log(data, "dayta");
      handleSubmit(data);
    },
  });

  console.log({ formik });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2200);
  };

  // handle submit
  const handleSubmit = async (data: initialStateType) => {
    dispatch(setPreLoader(true));
    const payload: ResetPassword = {
      password: data.password,
      token,
      uid,
      password_confirm: data.passwordConfirm,
    };
    const response = await resetPassword(payload);
    console.log(response);
    if (response.remote === "success") {
      dispatch(
        setAlertMessage({
          error: false,
          message: "Password changed successfully",
          show: true,
        })
      );
      handleResetAlert();
      router.push("/manual-login");
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
      } else if (response.error.status === 400) {
        if (response.error.errors?.non_field_errors) {
          dispatch(
            setAlertMessage({
              error: true,
              message: response.error.errors?.non_field_errors[0],
              show: true,
            })
          );
          handleResetAlert();
        } else {
          setPasswordError(response.error.errors?.password[0]);
          setConfirmPasswordError(response.error.errors?.password_confirm[0]);
          handleResetAlert();
        }
      } else {
        setPasswordError(response.error.errors?.password[0]);
        setConfirmPasswordError(response.error.errors?.password_confirm[0]);
        handleResetAlert();
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <Layout title="Password Reset">
      <>
        <div>
          <p>Enter your new password for your account.</p>
          <LabeledInput
            type="password"
            placeholder="Password"
            className="mb-3"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorMessage>
              {" "}
              <div style={{ marginTop: -14, marginBottom: -14 }}>
                {formik.errors.password}
              </div>
            </ErrorMessage>
          ) : null}
          {passwordError && (
            <ErrorMessage>
              {" "}
              <div style={{ marginTop: -14, marginBottom: -14 }}>
                {passwordError}
              </div>
            </ErrorMessage>
          )}
          <LabeledInput
            type="password"
            placeholder="Confirm Password"
            {...formik.getFieldProps("passwordConfirm")}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <ErrorMessage>
              {" "}
              <div style={{ marginTop: -4, marginBottom: -0 }}>
                {formik.errors.passwordConfirm}
              </div>
            </ErrorMessage>
          ) : null}
          {confirmPasswordError && (
            <ErrorMessage>
              {" "}
              <div style={{ marginTop: -4, marginBottom: -0 }}>
                {confirmPasswordError}
              </div>
            </ErrorMessage>
          )}
          <div className={`${styles.signupBtn}`}>
            <FilledButton onClick={() => formik.handleSubmit()}>
              Change my password
            </FilledButton>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default UpdatePasswordComponent;
