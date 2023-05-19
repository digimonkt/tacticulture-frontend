import React, { useState } from "react";
import Layout from "../layout";
import { LabeledInput } from "@/component/input";
import { SVG } from "@/assets/svg";
import styles from "../auth.module.css";
import { FilledButton } from "@/component/buttons";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { verificationCodeValidationSchema } from "./validation";
import { ErrorMessage } from "@/component/caption";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { verifyUser } from "@/api/auth";
interface IRouter {
  userEmail: string;
}

function VerifyEmailComponent() {
  // router
  const router = useRouter();

  const { userEmail } = router.query as unknown as IRouter;

  // redux
  const dispatch = useAppDispatch();
  const preLoaderData = useAppSelector(preLoader);

  // state management
  const [verificationCodeError, setVerificationCodeError] = useState("");

  // formik
  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: verificationCodeValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
      setVerificationCodeError("");
    }, 2000);
  };

  // handle submit
  const handleSubmit = async (values: { verificationCode: string }) => {
    dispatch(setPreLoader(true));
    const payload = {
      email: userEmail,
      verification_code: values.verificationCode,
    };
    const response = await verifyUser(payload);
    if (response.remote === "success") {
      router.push({
        pathname: "/setup-profile",
        query: { ...router.query, userEmail },
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
        handleResetAlert();
        dispatch(setPreLoader(false));
      } else {
        setVerificationCodeError(response?.error?.errors?.error[0]);
        handleResetAlert();
        dispatch(setPreLoader(false));
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <Layout title="">
      <>
        <div>
          <h1>
            Check your email
            <br /> for a code
          </h1>
          <p>
            We’ve sent a 6 digit code to <b> {userEmail}.</b> The code expires
            shortly so please enter it soon.
          </p>
          <div className={`${styles.checkIocn}`}>
            <LabeledInput
              disabled={preLoaderData}
              maxLength={6}
              placeholder="Enter verification code.."
              className=""
              {...formik.getFieldProps("verificationCode")}
              onKeyDown={(e) => {
                if (e.key === "enter" || e.key === "Enter") {
                  formik.handleSubmit();
                }
              }}
            />
            {formik.values.verificationCode.length === 6 ? (
              <SVG.CheckIcon />
            ) : (
              ""
            )}
          </div>
          {formik.touched.verificationCode && formik.errors.verificationCode ? (
            <ErrorMessage>{formik.errors.verificationCode}</ErrorMessage>
          ) : null}
          {verificationCodeError && (
            <ErrorMessage>{verificationCodeError}</ErrorMessage>
          )}
          <div className={`${styles.signupBtn}`}>
            <FilledButton
              style={{
                background:
                  formik.values.verificationCode === "" ? "#363636" : "#CB2C2C",
              }}
              disabled={preLoaderData}
              onClick={() => formik.handleSubmit()}
            >
              Continue
            </FilledButton>
          </div>
          <div className={`${styles.socialIcon}`}>
            <h3>
              <span>
                <SVG.GoogleIcon />
              </span>
              Open Gmail
            </h3>
            <h3>
              <span>
                <SVG.WindowIcon />
              </span>
              Open Outlook
            </h3>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default VerifyEmailComponent;
