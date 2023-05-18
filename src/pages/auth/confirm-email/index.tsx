import Head from "next/head";
import React from "react";
import ConfirmEmailComponent from "./confirmEmail";
import ProtectedPages from "@/HOC/protectedPages";

function ConfirmEmail() {
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Confirm Email</title>
        </Head>
        <main>
          <ConfirmEmailComponent />
        </main>
      </>
    </ProtectedPages>
  );
}

export default ConfirmEmail;
