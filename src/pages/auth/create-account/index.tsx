import Head from "next/head";
import React from "react";
import CreateAccountComponent from "./createAccount";
import ProtectedPages from "@/HOC/protectedPages";

function CreateAccount() {
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Create Account</title>
        </Head>
        <main>
          <CreateAccountComponent />
        </main>
      </>
    </ProtectedPages>
  );
}

export default CreateAccount;
