import Head from "next/head";
import React from "react";
import ResetPasswordComponent from "./resetPassword";
import { useRouter } from "next/router";
import { RESET_PASSWORD_PAGE } from "@/utils/enum";
import UpdatePasswordComponent from "./updatePassword";
import ProtectedPages from "@/HOC/protectedPages";

interface ISearchQuery {
  at: string;
}

function PasswordReset() {
  const router = useRouter();
  const { at } = router.query as unknown as ISearchQuery;

  const getComponent = () => {
    switch (at) {
      case RESET_PASSWORD_PAGE.resetPassword:
        return <ResetPasswordComponent />;
      default:
        return <UpdatePasswordComponent />;
    }
  };
  return (
    <ProtectedPages>
      <>
        <Head>
          <title>Reset Password</title>
        </Head>
        <main>{getComponent()}</main>
      </>
    </ProtectedPages>
  );
}

export default PasswordReset;
