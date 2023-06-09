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
import { passwordRestValidationSchema } from "@/utils/validations/resetPasswordValidation";
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
      handleSubmit(data);
    },
  });

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
    if (response.remote === "success") {
      dispatch(
        setAlertMessage({
          error: false,
          message: "Password changed successfully",
          show: true,
        })
      );
      handleResetAlert();
      router.push("/login/manual");
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
            <div
              className="updateError"
              style={{ position: "relative", bottom: "17px" }}
            >
              {" "}
              <ErrorMessage>
                {" "}
                <div>{formik.errors.password}</div>
              </ErrorMessage>
            </div>
          ) : null}
          {passwordError && (
            <ErrorMessage>
              {" "}
              <p> {passwordError}</p>
            </ErrorMessage>
          )}
          <LabeledInput
            type="password"
            placeholder="Confirm Password"
            {...formik.getFieldProps("passwordConfirm")}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <div className="updateError">
              {" "}
              <ErrorMessage>
                {" "}
                <div style={{ marginTop: -4, marginBottom: -0 }}>
                  {formik.errors.passwordConfirm}
                </div>
              </ErrorMessage>{" "}
            </div>
          ) : null}
          {confirmPasswordError && (
            <ErrorMessage>
              {" "}
              <div style={{ marginTop: 0, marginBottom: -0 }}>
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
