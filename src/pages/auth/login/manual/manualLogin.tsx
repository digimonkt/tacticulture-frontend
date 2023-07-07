import React from "react";
import Layout from "../../layout";
import { LabeledInput } from "@/component/input";
import styles from "../../auth.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import Link from "next/link";
import { SVG } from "@/assets/svg";
import { useFormik } from "formik";
import { manualLoginValidationSchema } from "@/utils/validations/loginValidation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import { LoginUser } from "@/api/types/auth";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { loginUser } from "@/api/auth";
import urlcat from "urlcat";

function ManualLoginComponent() {
  // redux dispatch
  const dispatch = useAppDispatch();
  const preLoaderData = useAppSelector(preLoader);
  // router
  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: manualLoginValidationSchema,
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
  const handleSubmit = async (values: { email: string; password: string }) => {
    dispatch(setPreLoader(true));
    const payload: LoginUser = {
      email: values.email,
      password: values.password,
    };
    const response = await loginUser(payload);
    if (response.remote === "success") {
      // pass
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
        formik.setErrors({
          email: response.error.errors.non_field_errors.toString(),
        });
        handleResetAlert();
      } else {
        handleResetAlert();
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <Layout title="Sign In">
      <>
        <div>
          <LabeledInput
            disabled={preLoaderData}
            placeholder="Enter your email.."
            className="mb-3"
            {...formik.getFieldProps("email")}
          />
          <p style={{ color: "red" }} className="verificationError">
            {formik.errors.email}
          </p>
          <LabeledInput
            disabled={preLoaderData}
            placeholder="Password"
            className=""
            type="password"
            {...formik.getFieldProps("password")}
          />
          <p style={{ color: "red" }} className="verificationError">
            {formik.errors.password}
          </p>
          <div className={`${styles.signupBtn}`}>
            <FilledButton
              disabled={preLoaderData}
              onClick={() => formik.handleSubmit()}
            >
              Sign in with Email
            </FilledButton>
          </div>
          <Link href={urlcat("/reset-password", { at: "reset-password" })}>
            Forgot password?
          </Link>
          <div className={`${styles.spanText}`}>
            <span>OR</span>
          </div>
          <OutlinedButton
            className="btn btn-outline-grey"
            icon={<SVG.GoogleIcon width="24px" />}
          >
            Sign in with Google
          </OutlinedButton>
        </div>
      </>
    </Layout>
  );
}

export default ManualLoginComponent;
