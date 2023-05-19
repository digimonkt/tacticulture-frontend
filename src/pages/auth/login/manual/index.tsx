import React from "react";
import Head from "next/head";
import ManualLoginComponent from "./manualLogin";
import ProtectedPages from "@/HOC/protectedPages";

function ManualLogin() {
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Manual Login</title>
        </Head>
        <main>
          <ManualLoginComponent />
        </main>
      </>
    </ProtectedPages>
  );
}

export default ManualLogin;
