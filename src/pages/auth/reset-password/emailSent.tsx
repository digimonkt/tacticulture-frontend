import React from "react";
import Layout from "../layout";
import Link from "next/link";

function EmailSentComponent() {
  return (
    <Layout title="An email is on its way!">
      <>
        <p>
          We’ve sent an email to<b> Kris@kristopherray.com.</b> If this email
          address has an account, you’ll find a link to reset your account
          password.
        </p>
        <p>
          <b>The link expires in 24 hours, so be sure to use it soon.</b>
        </p>
        <Link href="/confirm-email">
          <h2>Go check your email!</h2>
        </Link>
      </>
    </Layout>
  );
}

export default EmailSentComponent;
