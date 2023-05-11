import React, { useEffect, useState } from "react";
import ProfileHeaderComponent from "@/component/header/profile-header";
import styles from "./profile.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import UserCardComponent from "@/component/card/user-card";
import { useRouter } from "next/router";
import { USER_ROLES } from "@/utils/enum";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setUserRole } from "@/redux/reducers/userRole";
import { updateUser, userTypesList } from "@/api/auth";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { setPreLoader } from "@/redux/reducers/preLoader";

interface IUserType {
  id: string;
  user_type: string;
  content: string;
  slug_name: USER_ROLES;
}

interface IRouter {
  userEmail: string;
}

function ProfileSetup() {
  // redux dispatch
  const dispatch = useAppDispatch();

  // router
  const router = useRouter();
  const { userEmail } = router.query as unknown as IRouter;

  // state management
  const [role, setRole] = useState<USER_ROLES | "">("");
  const [roleId, setRoleId] = useState<string | "">("");
  const [userTypeList, setUserTypeList] = useState<IUserType[]>([]);

  // fetch owner workspace list
  const fetchUserTypeList = async () => {
    const response = await userTypesList();

    if (response.remote === "success") {
      setUserTypeList(response.data.results);
    }
  };

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
        userTypeId: roleId,
        userTypeName: role,
      };
      const response = await updateUser(payload);
      if (response.remote === "success") {
        if (role === "apprentice") {
          router.push({
            pathname: `/setup-profile/${role}`,
            query: { ...router.query, userEmail },
          });
        } else {
          router.push({
            pathname: `/setup-profile/${role}`,
            query: { ...router.query, userEmail },
          });
        }
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

  // ----
  useEffect(() => {
    fetchUserTypeList();
  }, []);
  return (
    <div className={`${styles.profileBody}`}>
      <ProfileHeaderComponent />
      <div className={`${styles.mainSection}`}>
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
          {userTypeList.map((userType) => (
            <UserCardComponent
              key={userType?.id}
              heading={userType?.user_type}
              content={userType?.content}
              onClick={() => {
                setRole(userType.slug_name);
                setRoleId(userType?.id);
                dispatch(setUserRole(userType.slug_name));
              }}
              selected={role === userType.slug_name}
            />
          ))}
        </div>

        <FilledButton className="btn configure" onClick={handleSubmit}>
          Configure My Profile →
        </FilledButton>
      </div>
      <div className="text-center p-4">
        <p className={`${styles.textContent}`}>
          <SVG.ExclamanationIcon width="24" /> You must select a default account
          type
        </p>
      </div>
    </div>
  );
}

export default ProfileSetup;
