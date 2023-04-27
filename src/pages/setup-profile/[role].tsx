import ProfileHeaderComponent from "@/component/header/profile-header";
import { USER_ROLES } from "@/utils/enum";
import { useRouter } from "next/router";
import React from "react";
import styles from "./profile.module.css";
import { SVG } from "@/assets/svg";
import { ApprenticeSteps, InstructorSteps } from "./components";
import StepperComponent from "./components/steppers";

interface IRouter {
  role: USER_ROLES;
  step: string;
}

function Role() {
  const router = useRouter();
  const { role, step } = router.query as unknown as IRouter;

  const getComponents = () => {
    if (role === USER_ROLES.instructor) {
      switch (step) {
        case "1":
          return <InstructorSteps.Step1 />;
        case "2":
          return <InstructorSteps.Step2 />;
        case "3":
          return <InstructorSteps.Step3 />;
        case "4":
          return <InstructorSteps.Step4 />;
        case "5":
          return <InstructorSteps.Step5 />;
        default:
          router.push({
            pathname: router.pathname,
            query: { ...router.query, step: 1 },
          });
      }
    } else if (role === USER_ROLES.apprentice) {
      switch (step) {
        case "1":
          return <ApprenticeSteps.ApprenticeStep1 />;
        case "2":
          return <ApprenticeSteps.ApprenticeStep2 />;
        default:
          router.push({
            pathname: router.pathname,
            query: { ...router.query, step: 1 },
          });
      }
    }
  };
  return (
    <div className={`${styles.profileBody}`}>
      <ProfileHeaderComponent />
      <div className={`${styles.mainSection}`}>
        <div className="accountSetup">
          <span
            className={`${styles.back}`}
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { ...router.query, step: Number(step) - 1 },
              });
            }}
          >
            <SVG.Leftarrow className="me-2" width="24px" />
            GO BACK
          </span>
          <h1 className="mt-2">Set Up Your Account</h1>
        </div>
        <div className="profileSection pt-4 pb-4">
          <div>{getComponents()}</div>

          <StepperComponent
            steps={USER_ROLES.apprentice === role ? 2 : 4}
            at={Number(step)}
          />
        </div>
      </div>
    </div>
  );
}

export default Role;
