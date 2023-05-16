import React from "react";
import Layout from "../layout";
import Link from "next/link";
import { useRouter } from "next/router";

interface ISearchQuery {
  email?: string;
  page?: string;
}

function EmailSentComponent() {
  const router = useRouter();
  const { email, page } = router.query as unknown as ISearchQuery;
  return (
    <Layout title="An email is on its way!">
      <>
        <p>
          We’ve sent an email to<b> {email}.</b> If this email address has an
          account,
          {page === "login"
            ? "you’ll find a magic link that will sign you in."
            : "you’ll find a link to reset your account password."}
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
