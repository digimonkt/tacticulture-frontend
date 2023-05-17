import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { LabeledInput } from "@/component/input";
import styles from "../auth.module.css";
import { FilledButton } from "@/component/buttons";
import { useFormik } from "formik";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { passwordRestValidationSchema } from "./validation";
import { useRouter } from "next/router";
import { resetPassword } from "@/api/auth";
import { ResetPassword } from "@/api/types/auth";

interface ISearchQuery {
  token?: string;
  uid?: string;
}

function UpdatePasswordComponent() {
  const router = useRouter();

  // redux dispatch
  const dispatch = useAppDispatch();

  const { token, uid } = router.query as unknown as ISearchQuery;

  // state management
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // formik
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      token: "",
      uid: "",
    },
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
  setTimeout(() => {
    setPasswordError("");
    setConfirmPasswordError("");
  }, 2200);
  // handle submit
  const handleSubmit = async (data: {
    password: string;
    password_confirm: string;
    token: string;
    uid: string;
  }) => {
    dispatch(setPreLoader(true));
    const payload: ResetPassword = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: data.token,
      uid: data.uid,
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
      // navigate("/manual-login");
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
    }
    dispatch(setPreLoader(false));
  };
  useEffect(() => {
    if (!token && !uid) {
      // navigate("/");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    formik.setValues({ ...formik.values, token, uid });
  }, [token, uid]);
  return (
    <Layout title="Password Reset">
      <>
        <div>
          <p>Enter your new password for your account.</p>
          <LabeledInput
            placeholder="Enter Your Email Address"
            className="mb-3"
          />
          <LabeledInput placeholder="Confirm New Password" />
          <div className={`${styles.signupBtn}`}>
            <FilledButton>Change my password</FilledButton>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default UpdatePasswordComponent;
