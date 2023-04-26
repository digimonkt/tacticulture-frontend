import Head from "next/head";
import React from "react";
import VerifyEmailComponent from "./verifyEmail";

function VerifyEmail() {
  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <main>
        <VerifyEmailComponent />
      </main>
    </>
  );
}

export default VerifyEmail;
