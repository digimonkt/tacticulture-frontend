import React from "react";
import Layout from "../layout";
import styles from "../auth.module.css";
import { LabeledInput } from "@/component/input";
import Link from "next/link";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import { useFormik } from "formik";
import { registerValidationSchema } from "./validation";

function CreateAccountComponent() {
  // formik
  const formik = useFormik({
    initialValues: {
      userEmail: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout title="First, enter your email">
      <div>
        <p>We suggest using your an email address you easy access to</p>

        <LabeledInput
          placeholder="Enter your email.."
          className=""
          {...formik.getFieldProps("userEmail")}
        />

        <div className={`${styles.signupBtn}`}>
          <Link href="/verify-email">
            <FilledButton>Continue</FilledButton>
          </Link>
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
