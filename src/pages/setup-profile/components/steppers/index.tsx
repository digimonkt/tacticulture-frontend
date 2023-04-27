import React from "react";
import styles from "../../profile.module.css";
import { FilledButton } from "@/component/buttons";
import { useRouter } from "next/router";

interface StepperI {
  steps: number;
  at: number;
}

function StepperComponent({ steps, at }: StepperI) {
  const router = useRouter();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 ms-4 me-4 position-relative">
        <div className={`${styles.dots}`}>
          {[...Array(steps)].map((item: number) => (
            <div
              key={item}
              style={{
                height: "10px",
                width: "20px",
                border: `5px solid ${at <= 1 ? "#BFBFBF" : "#CB2C2C"}`,
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
              query: { ...router.query, step: at + 1 },
            });
          }}
        >
          Continue
        </FilledButton>
      </div>
    </div>
  );
}

export default StepperComponent;
