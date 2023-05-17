import ProfileHeaderComponent from "@/component/header/profile-header";
import { USER_ROLES } from "@/utils/enum";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import styles from "./profile.module.css";
import { SVG } from "@/assets/svg";
import { ApprenticeSteps, InstructorSteps } from "./components";
import StepperComponent from "./components/steppers";
import { IRef } from "./components/apprentice/apprenticeStep1";
import { IStepTwoRef } from "./components/apprentice/apprenticeStep2";
import { InstructorStepOneRef } from "./components/instructor/step1";
import { InstructorStepTwoRef } from "./components/instructor/step2";
import { InstructorStepFourRef } from "./components/instructor/step4";

interface IRouter {
  role: USER_ROLES;
  step: string;
}

function Role() {
  // router
  const router = useRouter();
  const { role, step } = router.query as unknown as IRouter;

  // refs
  const apprenticeStepOneRef = useRef<IRef>(null);
  const apprenticeStepTwoRef = useRef<IStepTwoRef>(null);
  const instructorStepOneRef = useRef<InstructorStepOneRef>(null);
  const instructorStepTwoRef = useRef<InstructorStepTwoRef>(null);
  const instructorStepFourRef = useRef<InstructorStepFourRef>(null);

  // components to render
  const getComponents = () => {
    if (role === USER_ROLES.instructor) {
      switch (step) {
        case "1":
          return <InstructorSteps.Step1 ref={instructorStepOneRef} />;
        case "2":
          return <InstructorSteps.Step2 ref={instructorStepTwoRef} />;
        case "3":
          // return <InstructorSteps.Step3 />;
          return (
            <ApprenticeSteps.ApprenticeStep1
              ref={apprenticeStepOneRef}
              role={role}
            />
          );
        case "4":
          return <InstructorSteps.Step4 ref={instructorStepFourRef} />;
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
          return (
            <ApprenticeSteps.ApprenticeStep1
              ref={apprenticeStepOneRef}
              role={role}
            />
          );
        case "2":
          return <ApprenticeSteps.ApprenticeStep2 ref={apprenticeStepTwoRef} />;
        default:
          router.push({
            pathname: router.pathname,
            query: { ...router.query, step: 1 },
          });
      }
    }
  };

  // function to handle update user profile based on role
  const handleUpdateProfile = () => {
    if (role === USER_ROLES.instructor) {
      switch (step) {
        case "1":
          instructorStepOneRef?.current?.handleSubmitAccountDetail();
          break;
        case "2":
          instructorStepTwoRef?.current?.handleSubmitStepTwoDetail();
          break;
        case "3":
          apprenticeStepOneRef?.current?.handleSubmitApprenticeStepOne();
          break;
        case "4":
          instructorStepFourRef?.current?.handleSubmitPlanForm();

          break;
        case "5":
          break;
        default:
      }
    } else if (role === USER_ROLES.apprentice) {
      switch (step) {
        case "1":
          apprenticeStepOneRef?.current?.handleSubmitApprenticeStepOne();
          break;
        case "2":
          apprenticeStepTwoRef?.current?.handleSubmitApprenticeStepTwo();
          break;
        default:
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
            handleSubmit={() => handleUpdateProfile()}
            steps={USER_ROLES.apprentice === role ? 2 : 4}
            at={Number(step)}
          />
        </div>
      </div>
    </div>
  );
}

export default Role;
