import React from "react";
import Layout from "../layout";
import styles from "../auth.module.css";
import { LabeledInput } from "@/component/input";
import Link from "next/link";
import { FilledButton } from "@/component/buttons";
import { useRouter } from "next/router";
import { RESET_PASSWORD_PAGE } from "../enum";

function ResetPasswordComponent() {
  const router = useRouter();
  const handleNextStep = () => {
    router.push({
      pathname: router.pathname.replace("auth", ""),
      query: { ...router.query, at: RESET_PASSWORD_PAGE.verifyEmail },
    });
  };
  return (
    <Layout title="Password Reset">
      <>
        <div>
          <p>Enter your new password for your account.</p>
          <LabeledInput placeholder="Enter your email.." />
          <div className={`${styles.signupBtn}`}>
            <FilledButton onClick={handleNextStep}>
              Change my password
            </FilledButton>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default ResetPasswordComponent;
