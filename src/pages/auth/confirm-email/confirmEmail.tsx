import React from "react";
import Layout from "../layout";
import { LabeledInput } from "@/component/input";
import Link from "next/link";
import styles from "../auth.module.css";
import { FilledButton } from "@/component/buttons";

function ConfirmEmailComponent() {
  return (
    <Layout title="Confirm your email">
      <div>
        <p className="mb-4">
          This is a one-time security measure that’ll be used to protect your
          info and create your account.
        </p>
        <LabeledInput placeholder="Enter Your Email Address" className="mb-0" />
        <div className={`${styles.signupBtn}`}>
          <Link href="/create-account">
            <FilledButton>Create Account</FilledButton>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default ConfirmEmailComponent;
