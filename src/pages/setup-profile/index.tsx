import React, { useState } from "react";
import ProfileHeaderComponent from "@/component/header/profile-header";
import styles from "./profile.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import UserCardComponent from "@/component/card/user-card";
import { useRouter } from "next/router";
import { USER_ROLES, USER_TYPE_LIST } from "@/utils/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setUserRole } from "@/redux/reducers/userRole";
import { updateUser } from "@/api/user";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { preLoader, setPreLoader } from "@/redux/reducers/preLoader";
import ProtectedPages from "@/HOC/protectedPages";
import { updateCurrentUser } from "@/redux/reducers/user";

interface IRouter {
  userEmail: string;
}

function ProfileSetup() {
  // redux dispatch
  const dispatch = useAppDispatch();
  const preLoaderData = useAppSelector(preLoader);
  const { currentUser } = useAppSelector((state) => state.userReducer);

  // router
  const router = useRouter();
  const { userEmail } = router.query as unknown as IRouter;

  // state management
  const [role, setRole] = useState<USER_ROLES | "">("");

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2000);
  };

  // handle submit
  const handleSubmit = async () => {
    if (role === "") {
      dispatch(
        setAlertMessage({
          error: true,
          message: "Select account type!",
          show: true,
        })
      );
      handleResetAlert();
      return;
    } else {
      dispatch(setPreLoader(true));
      const payload = {
        user_roles: role,
        default_profile: role,
      };
      const response = await updateUser(payload);
      if (response.remote === "success") {
        dispatch(
          updateCurrentUser({
            ...currentUser,
            userRoles: role,
            defaultRole: role,
            email: userEmail,
          })
        );
      } else {
        dispatch(
          setAlertMessage({
            error: true,
            message: response?.error?.errors,
            show: true,
          })
        );
        handleResetAlert();
        dispatch(setPreLoader(false));
      }
    }
    dispatch(setPreLoader(false));
  };

  return (
    <ProtectedPages>
      <div className={`${styles.profileBody}`}>
        <ProfileHeaderComponent />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          className={`${styles.mainSection}`}
        >
          <h1
            style={{
              fontSize: "37px",
              fontWeight: "800",
              fontFamily: "Proxima Nova",
              letterSpacing: "1px",
              paddingBottom: "16px",
            }}
          >
            Welcome to Tacticulture!
          </h1>
          <p style={{ fontWeight: "500", letterSpacing: "1px" }}>
            Setup your account for how you plan on using Tacticulture. Don’t
            worry, you can update this selection at any time in the Account
            Settings.
          </p>
          <h6 className={`${styles.icondefault}`}>
            Select your <b>Default Account Type</b> <SVG.InfoIcon width="24" />
          </h6>
          <div className="d-flex align-items-center justify-content-between">
            {USER_TYPE_LIST.map((userType) => (
              <UserCardComponent
                key={userType?.id}
                heading={userType.userRoles}
                content={userType?.content}
                onClick={() => {
                  setRole(userType.userRoles);
                  dispatch(setUserRole(userType.userRoles));
                }}
                selected={role === userType.userRoles}
              />
            ))}
          </div>

          <FilledButton
            disabled={preLoaderData}
            style={{ background: role === "" ? "#363636" : "#CB2C2C" }}
            className="btn configure"
            onClick={handleSubmit}
          >
            Configure My Profile →
          </FilledButton>
        </div>
        <div className="text-center p-4">
          <p className={`${styles.textContent}`}>
            <SVG.ExclamanationIcon width="24" /> You must select a default
            account type
          </p>
        </div>
      </div>
    </ProtectedPages>
  );
}

export default ProfileSetup;
