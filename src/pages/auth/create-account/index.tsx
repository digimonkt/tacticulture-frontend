import Head from "next/head";
import React from "react";
import CreateAccountComponent from "./createAccount";

function CreateAccount() {
  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <main>
        <CreateAccountComponent />
      </main>
    </>
  );
}

export default CreateAccount;
