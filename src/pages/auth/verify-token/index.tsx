import Head from "next/head";
import React from "react";
import VerifyTokenComponent from "./verify-token";

function VerifyToken() {
  return (
    <>
      <Head>
        <title>Verify Token</title>
      </Head>
      <main>
        <VerifyTokenComponent />
      </main>
    </>
  );
}

export default VerifyToken;
