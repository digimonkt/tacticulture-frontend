import { useAppSelector } from "@/redux/hooks/hooks";
import { currentUser, isLoggedIn } from "@/redux/reducers/user";
import { USER_ROLES } from "@/utils/enum";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function ProtectedPages({ children }: Props) {
  // router
  const router = useRouter();

  // redux
  const isUserLoggedIn = useAppSelector(isLoggedIn);
  const userDetail = useAppSelector(currentUser);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (userDetail.isProfileComplete) {
        if (userDetail.defaultRole === USER_ROLES.apprentice) {
          router.push("/apprentice/profile");
        } else if (userDetail.defaultRole === USER_ROLES.instructor) {
          router.push("/instructor/home");
        }
      } else {
        if (userDetail.defaultRole) {
          router.push({
            pathname: `/setup-profile/${userDetail.defaultRole}`,
            query: { ...router.query, userEmail: userDetail.email },
          });
        } else {
          router.push({
            pathname: "/setup-profile",
            query: { ...router.query, userEmail: userDetail.email },
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUserLoggedIn,
    userDetail.defaultRole,
    userDetail.email,
    userDetail.isProfileComplete,
  ]);

  return <>{children}</>;
}

export default ProtectedPages;
