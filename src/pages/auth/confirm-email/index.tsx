import Head from "next/head";
import React from "react";
import ConfirmEmailComponent from "./confirmEmail";

function ConfirmEmail() {
  return (
    <>
      <Head>
        <title>Confirm Email</title>
      </Head>
      <main>
        <ConfirmEmailComponent />
      </main>
    </>
  );
}

export default ConfirmEmail;
