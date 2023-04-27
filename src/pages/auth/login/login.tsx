import { SVG } from "@/assets/svg";
import Layout from "@/pages/auth/layout";
import React from "react";
import styles from "../auth.module.css";
import Link from "next/link";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { LabeledInput } from "@/component/input";
function LoginComponent() {
  return (
    <Layout title="Sign In">
      <>
        <OutlinedButton icon={<SVG.GoogleIcon width="24px" />}>
          Sign in with Google
        </OutlinedButton>

        <div className={`${styles.spanText}`}>
          <span>OR</span>
        </div>
        <LabeledInput placeholder="Kris@Kristopherray.com" />
        <div className={`${styles.signupBtn}`}>
          <Link href="/user-step">
            <FilledButton>Sign in with Email</FilledButton>
          </Link>
        </div>
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
