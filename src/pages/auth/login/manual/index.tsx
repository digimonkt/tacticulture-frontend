import React from "react";
import Head from "next/head";
import ManualLoginComponent from "./manualLogin";

function ManualLogin() {
  return (
    <>
      <Head>
        <title>Manual Login</title>
      </Head>
      <main>
        <ManualLoginComponent />
      </main>
    </>
  );
}

export default ManualLogin;
