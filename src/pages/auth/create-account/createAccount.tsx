import React from "react";
import Layout from "../layout";
import styles from "../auth.module.css";
import { LabeledInput } from "@/component/input";
import Link from "next/link";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";

function CreateAccountComponent() {
  return (
    <Layout title="First, enter your email">
      <div>
        <p>We suggest using your an email address you easy access to</p>

        <LabeledInput placeholder="Kris@Kristopherray.com" className="" />

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
