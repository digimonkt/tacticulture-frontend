import React from "react";
import Layout from "../layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import ProtectedPages from "@/HOC/protectedPages";

interface ISearchQuery {
  email?: string;
}

function ResetEmailSentComponent() {
  const router = useRouter();
  const { email } = router.query as unknown as ISearchQuery;
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Reset Password Link Sent</title>
        </Head>
        <Layout title="An email is on its way!">
          <>
            <p>
              We’ve sent an email to<b> {email}.</b> If this email address has
              an account, you’ll find a link to reset your account password.
            </p>
            <p>
              <b>The link expires in 24 hours, so be sure to use it soon.</b>
            </p>
            <Link href="/confirm-email">
              <h2>Go check your email!</h2>
            </Link>
          </>
        </Layout>
      </>
    </ProtectedPages>
  );
}

export default ResetEmailSentComponent;
