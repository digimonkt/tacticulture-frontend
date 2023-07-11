import { SVG } from "@/assets/svg";
import Layout from "@/pages/auth/layout";
import React from "react";
import styles from "../auth.module.css";
import Link from "next/link";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { LabeledInput } from "@/component/input";
import { useFormik } from "formik";
import { magicLinkLoginValidationSchema } from "@/utils/validations/loginValidation";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { LoginUser } from "@/api/types/auth";
import { loginUser } from "@/api/auth";
import { ErrorMessage } from "@/component/caption";
import { useRouter } from "next/router";
import { RESET_PASSWORD_PAGE } from "@/utils/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

function LoginComponent() {
  // redux dispatch
  const dispatch = useAppDispatch();
  const preLoaderData = useAppSelector(preLoader);
  // router
  const router = useRouter();

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: magicLinkLoginValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2200);
  };

  // handle submit
  const handleSubmit = async (values: { email: string }) => {
    dispatch(setPreLoader(true));
    const payload: LoginUser = {
      email: values.email,
    };
    const response = await loginUser(payload);
    if (response.remote === "success") {
      router.push({
        pathname: "/email-sent",
        query: {
          ...router.query,
          at: RESET_PASSWORD_PAGE.verifyEmail,
          email: values.email,
        },
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
        handleResetAlert();
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <Layout title="Sign In">
      <>
        <OutlinedButton
          disabled={preLoaderData}
          icon={<SVG.GoogleIcon width="24px" />}
        >
          Sign in with Google
        </OutlinedButton>

        <div className={`${styles.spanText}`}>
          <span>OR</span>
        </div>
        <form>
          <LabeledInput
            disabled={preLoaderData}
            placeholder="Enter your email.."
            {...formik.getFieldProps("email")}
            onKeyDown={(e) => {
              if (e.key === "enter" || e.key === "Enter") {
                formik.handleSubmit();
              }
            }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alertLogin">
              {" "}
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            </div>
          ) : null}
          <div className={`${styles.signupBtn}`}>
            <FilledButton
              disabled={preLoaderData}
              onClick={() => formik.handleSubmit()}
            >
              Sign in with Email
            </FilledButton>
          </div>
        </form>
        <div className={`${styles.magicalBox}`}>
          <span>
            <SVG.MagicLink />
          </span>
          <p>
            We’ll email you a magic code for a password-free sign in. Or you can{" "}
            <span>
              <Link href="/login/manual">sign in manually instead.</Link>
            </span>
          </p>
        </div>
      </>
    </Layout>
  );
}

export default LoginComponent;
