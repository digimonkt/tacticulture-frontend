import React, { useState } from "react";
import Layout from "../layout";
import styles from "../auth.module.css";
import { LabeledInput } from "@/component/input";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/utils/validations/createAccountValidation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import { registerUser } from "@/api/auth";
import { useRouter } from "next/router";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { ErrorMessage } from "@/component/caption";

export type InitialStateType = {
  userEmail: string;
};

function CreateAccountComponent() {
  // redux
  const dispatch = useAppDispatch();
  const preLoaderData = useAppSelector(preLoader);

  // router
  const router = useRouter();

  // state management
  const [emailError, setEmailError] = useState<string>("");

  const initialStates: InitialStateType = {
    userEmail: "",
  };
  // formik
  const formik = useFormik({
    initialValues: initialStates,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      handleCreateAccount(values);
    },
  });

  // handle resetAlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2000);
  };

  // handle create account
  const handleCreateAccount = async (values: InitialStateType) => {
    dispatch(setPreLoader(true));
    const payload = {
      email: values.userEmail,
    };
    const response = await registerUser(payload);
    console.log(response);
    if (response.remote === "success") {
      router.push({
        pathname: "/verify-email",
        query: { ...router.query, userEmail: values.userEmail },
      });
    } else {
      if (response?.error?.status === 500) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        dispatch(setPreLoader(false));
        handleResetAlert();
      } else if (response?.error?.status === 404) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        dispatch(setPreLoader(false));
        handleResetAlert();
      } else {
        setEmailError(response.error.errors.email[0]);
        handleResetAlert();
        dispatch(setPreLoader(false));
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <Layout title="First, enter your email">
      <div>
        <p>We suggest using your an email address you easy access to</p>

        <LabeledInput
          disabled={preLoaderData}
          placeholder="Enter your email.."
          className=""
          {...formik.getFieldProps("userEmail")}
          onKeyDown={(e) => {
            if (e.key === "enter" || e.key === "Enter") {
              formik.handleSubmit();
            }
          }}
        />
        {formik.touched.userEmail && formik.errors.userEmail ? (
          <ErrorMessage>{formik.errors.userEmail}</ErrorMessage>
        ) : null}
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <div className={`${styles.signupBtn}`}>
          <FilledButton
            style={{
              background:
                formik.values.userEmail === "" ? "#363636" : "#CB2C2C",
            }}
            disabled={preLoaderData}
            onClick={() => formik.handleSubmit()}
          >
            Continue
          </FilledButton>
        </div>

        <div className={`${styles.spanText}`}>
          <span>OR</span>
        </div>
        <OutlinedButton icon={<SVG.GoogleIcon width="24px" />}>
          Sign in with Google
        </OutlinedButton>
      </div>
    </Layout>
  );
}

export default CreateAccountComponent;
