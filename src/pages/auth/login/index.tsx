import ProtectedPages from "@/HOC/protectedPages";
import LoginComponent from "@/pages/auth/login/login";
import Head from "next/head";
import React from "react";

function Login() {
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Login</title>
        </Head>
        <main>
          <LoginComponent />
        </main>
      </>
    </ProtectedPages>
  );
}

export default Login;
