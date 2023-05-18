import Head from "next/head";
import React from "react";
import VerifyTokenComponent from "./verify-token";
import ProtectedPages from "@/HOC/protectedPages";

function VerifyToken() {
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Verify Token</title>
        </Head>
        <main>
          <VerifyTokenComponent />
        </main>
      </>
    </ProtectedPages>
  );
}

export default VerifyToken;
