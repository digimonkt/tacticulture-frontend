import React, { useCallback, useEffect } from "react";
import Layout from "../layout";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { useRouter } from "next/router";
import { verifyLoginToken } from "@/api/auth";
import { VerifyLoginToken } from "@/api/types/auth";
import { useAppDispatch } from "@/redux/hooks/hooks";

interface ISearchQuery {
  token?: string;
  uid?: string;
}

function VerifyTokenComponent() {
  const router = useRouter();

  // redux dispatch
  const dispatch = useAppDispatch();

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2200);
  };
  const { token, uid } = router.query as unknown as ISearchQuery;

  // verify magic link token
  const verifyUserLoginToken = useCallback(async () => {
    if (!token || !uid) {
      dispatch(
        setAlertMessage({
          error: true,
          message: "Magic link is not valid.",
          show: true,
        })
      );
      handleResetAlert();
    } else {
      const payload: VerifyLoginToken = {
        token,
        uid,
      };
      const response = await verifyLoginToken(payload);
      if (response.remote !== "success") {
        if (response.error.status === 500 || response.error.status === 404) {
          dispatch(
            setAlertMessage({
              error: true,
              message: response.error.errors,
              show: true,
            })
          );
          router.push("/");

          handleResetAlert();
        } else if (response.error.status === 400) {
          dispatch(
            setAlertMessage({
              error: true,
              message: response.error.errors?.non_field_errors[0],
              show: true,
            })
          );
          router.push("/");

          handleResetAlert();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token, uid]);

  useEffect(() => {
    if (token && uid) {
      verifyUserLoginToken();
    }
  }, [token, uid, verifyUserLoginToken]);
  return (
    <Layout title="">
      <>
        <div>
          <p>Verifying Token......</p>
        </div>
      </>
    </Layout>
  );
}

export default VerifyTokenComponent;
