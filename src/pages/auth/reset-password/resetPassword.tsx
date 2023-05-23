import React, { useState } from "react";
import Layout from "../layout";
import styles from "../auth.module.css";
import { LabeledInput } from "@/component/input";
import { FilledButton } from "@/component/buttons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { registerValidationSchema } from "@/utils/validations/createAccountValidation";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import { ErrorMessage } from "@/component/caption";
import { forgotPassword } from "@/api/auth";
import { ForgotPassword } from "@/api/types/auth";
import { InitialStateType } from "../create-account/createAccount";

function ResetPasswordComponent() {
  const router = useRouter();
  const preLoaderData = useAppSelector(preLoader);

  // redux dispatch
  const dispatch = useAppDispatch();

  // state management
  const [emailError, setEmailError] = useState("");
  const initialStates: InitialStateType = {
    userEmail: "",
  };
  // formik
  const formik = useFormik({
    initialValues: initialStates,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
      setEmailError("");
    }, 2200);
  };

  // handle submit
  const handleSubmit = async (values: InitialStateType) => {
    dispatch(setPreLoader(true));
    const payload: ForgotPassword = {
      email: values.userEmail,
    };
    const response = await forgotPassword(payload);

    if (response.remote === "success") {
      router.push({
        pathname: "/reset-email-sent",
        query: { ...router.query, userEmail: values.userEmail },
      });
    } else {
      if (response.error.status === 500 || response.error.status === 404) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
      } else {
        setEmailError(response.error.errors?.email[0]);
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
            disabled={preLoaderData}
            placeholder="Enter your email.."
            {...formik.getFieldProps("userEmail")}
          />
          {formik.touched.userEmail && formik.errors.userEmail ? (
            <ErrorMessage>{formik.errors.userEmail}</ErrorMessage>
          ) : null}
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <div className={`${styles.signupBtn}`}>
            <FilledButton
              disabled={preLoaderData}
              onClick={() => formik.handleSubmit()}
            >
              Change my password
            </FilledButton>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default ResetPasswordComponent;
