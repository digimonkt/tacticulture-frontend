import { useAppDispatch } from "@/redux/hooks/hooks";
import {
  getUserDetails,
  resetCurrentUser,
  setIsLoggedIn,
} from "@/redux/reducers/user";
import { tokens } from "@/utils/jwtTokenStorage";
import React, { useEffect, useCallback } from "react";

type Props = {
  children: React.ReactNode;
};

function AuthEventListner({ children }: Props) {
  // redux
  const dispatch = useAppDispatch();

  // check weather user logged in or not
  const checkLoginStatus = useCallback(() => {
    const accessToken = tokens.accessToken();
    if (accessToken) {
      dispatch(getUserDetails());
    } else {
      dispatch(resetCurrentUser());
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, [checkLoginStatus]);

  return <>{children}</>;
}

export default AuthEventListner;
