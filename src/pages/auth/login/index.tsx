import LoginComponent from "@/pages/auth/login/login";
import Head from "next/head";
import React from "react";

function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <LoginComponent />
      </main>
    </>
  );
}

export default Login;
