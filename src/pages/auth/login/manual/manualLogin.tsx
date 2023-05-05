import React from "react";
import Layout from "../../layout";
import { LabeledInput } from "@/component/input";
import styles from "../../auth.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import Link from "next/link";
import { SVG } from "@/assets/svg";

function ManualLoginComponent() {
  return (
    <Layout title="Sign In">
      <>
        <div>
          <LabeledInput placeholder="Enter your email.." className="mb-3" />
          <LabeledInput placeholder="Password" className="" />
          <div className={`${styles.signupBtn}`}>
            <FilledButton>Sign in with Email</FilledButton>
          </div>
          <Link href="/reset-password">Forgot password?</Link>
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
