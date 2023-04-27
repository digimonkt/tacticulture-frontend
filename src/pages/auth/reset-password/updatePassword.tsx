import React from "react";
import Layout from "../layout";
import { LabeledInput } from "@/component/input";
import styles from "../auth.module.css";
import { FilledButton } from "@/component/buttons";

function UpdatePasswordComponent() {
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
