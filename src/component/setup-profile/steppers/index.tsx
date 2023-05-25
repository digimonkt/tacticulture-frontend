import React from "react";
import styles from "../../../pages/setup-profile/profile.module.css";
import { FilledButton } from "@/component/buttons";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  currentUser,
  isPlanPageActive,
  isUserStepActive,
} from "@/redux/reducers/user";
import { USER_ROLES } from "@/utils/enum";

interface StepperI {
  steps: number;
  at: number;
  handleSubmit: () => void;
}

function StepperComponent({ steps, at, handleSubmit }: StepperI) {
  // redux
  const currentUserDetails = useAppSelector(currentUser);
  const isUserStepActiveStatus = useAppSelector(isUserStepActive);
  const isPlanPageActiveStatus = useAppSelector(isPlanPageActive);

  // check to activate continue btn
  const checkActiveBtn = () => {
    if (currentUserDetails.defaultRole === USER_ROLES.instructor) {
      switch (at) {
        case 1:
          return true;
        case 2:
          return true;
        case 3:
          if (isUserStepActiveStatus) {
            return true;
          } else {
            return false;
          }
        case 4:
          if (isPlanPageActiveStatus) {
            return true;
          } else {
            return false;
          }
        default:
          return false;
      }
    } else if (currentUserDetails.defaultRole === USER_ROLES.apprentice) {
      switch (at) {
        case 1:
          if (isUserStepActiveStatus) {
            return true;
          } else {
            return false;
          }
        case 2:
          return true;
        default:
          return false;
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 ms-4 me-4 position-relative">
        <div className={`${styles.dots}`}>
          {[...Array(steps)].map((item: number, index: number) => (
            <div
              key={index}
              style={{
                height: "10px",
                width: "20px",
                border: `5px solid ${at >= index + 1 ? "#CB2C2C" : "#BFBFBF"}`,
              }}
            />
          ))}
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
          disabled={!checkActiveBtn()}
          style={{
            fontSize: "17px",
            background: checkActiveBtn() ? "#CB2C2C" : "#333",
            fontWeight: "700",
            border: "0",
            borderRadius: "4px",
            color: "#fff",
            width: "108px",
            height: "38px",
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Continue
        </FilledButton>
      </div>
    </div>
  );
}

export default StepperComponent;
