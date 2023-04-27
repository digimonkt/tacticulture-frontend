import ProfileHeaderComponent from "@/component/header/profile-header";
import { USER_ROLES } from "@/utils/enum";
import { useRouter } from "next/router";
import React from "react";
import styles from "./profile.module.css";
import { SVG } from "@/assets/svg";
import { FilledButton } from "@/component/buttons";
import { InstructorSteps } from "./components";

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
          {Number(step) == 5 ? (
            ""
          ) : (
            <div className="d-flex justify-content-between align-items-center mt-4 ms-4 me-4 position-relative">
              <div className={`${styles.dots}`}>
                <div
                  style={{
                    height: "10px",
                    width: "20px",
                    border: `5px solid ${
                      Number(step) <= 1 ? "#BFBFBF" : "#CB2C2C"
                    }`,
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "20px",
                    border: `5px solid ${
                      Number(step) <= 2 ? "#BFBFBF" : "#CB2C2C"
                    }`,
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "20px",
                    border: `5px solid ${
                      Number(step) <= 3 ? "#BFBFBF" : "#CB2C2C"
                    }`,
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "20px",
                    border: `5px solid ${
                      Number(step) <= 4 ? "#BFBFBF" : "#CB2C2C"
                    }`,
                  }}
                ></div>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "17%",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Set up later
              </span>
              <FilledButton
                style={{
                  fontSize: "17px",
                  background: "#333",
                  fontWeight: "700",
                  border: "0",
                  borderRadius: "4px",
                  color: "#fff",
                  width: "108px",
                  height: "38px",
                }}
                onClick={() => {
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, step: Number(step) + 1 },
                  });
                }}
              >
                Continue
              </FilledButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Role;
