import ProfileHeaderComponent from "@/component/header/profile-header";
import React, { useState } from "react";
import styles from "./profile.module.css";
import { SVG } from "@/assets/svg";
// import Link from "next/link";
import { FilledButton } from "@/component/buttons";
import UserCardComponent from "@/component/card/user-card";
import { useRouter } from "next/router";
// import { SETUP_PROFILE_PAGE } from "../setup-profile/enum";
import { USER_ROLES } from "@/utils/enum";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setUserRole } from "@/redux/reducers/userRole";

function ProfileSetup() {
  // redux dispatch
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [role, setRole] = useState<USER_ROLES | "">("");
  const handleNextStep = () => {
    router.push("/setup-profile/[role]", `/setup-profile/${role}`);
  };
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
          <UserCardComponent
            heading="Apprentice"
            content=" Discover and attend new events, track your training and progress by
        collecting badges, and connect with new instructors and friends."
            onClick={() => {
              setRole(USER_ROLES.apprentice);
              dispatch(setUserRole(USER_ROLES.apprentice));
            }}
            selected={role === USER_ROLES.apprentice}
          />
          <UserCardComponent
            heading="Instructor"
            content=" Create and manage events, accept payments from attendees, manage event roster and questions, and build your training network."
            onClick={() => {
              setRole(USER_ROLES.instructor);
              dispatch(setUserRole(USER_ROLES.instructor));
            }}
            selected={role === USER_ROLES.instructor}
          />
        </div>

        <FilledButton className="btn configure" onClick={handleNextStep}>
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
