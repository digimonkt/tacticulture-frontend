import Head from "next/head";
import React from "react";
import VerifyEmailComponent from "./verifyEmail";
import ProtectedPages from "@/HOC/protectedPages";

function VerifyEmail() {
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Verify Email</title>
        </Head>
        <main>
          <VerifyEmailComponent />
        </main>
      </>
    </ProtectedPages>
  );
}

export default VerifyEmail;
