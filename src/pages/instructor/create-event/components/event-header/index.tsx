import { FilledButton, OutlinedButton } from "@/component/buttons";
import React from "react";
import styles from "../../course.module.css";
import { useRouter } from "next/router";

interface IEventHeaderComponent {
  heading: string;
}

function EventHeaderComponent({ heading }: IEventHeaderComponent) {
  const router = useRouter();
  const { step } = router.query;
  return (
    <>
      <div className={`${styles.header}`}>
        <h1>{heading}</h1>
        <div className="d-flex align-items-baseline">
          <OutlinedButton className={`${styles.BtnCancel}`}>
            Cancel
          </OutlinedButton>
          <FilledButton
            onClick={() => {
              router.push(
                `../instructor/create-event?step=${Number(step) + 1}`
              );
            }}
            className={`${styles.BtnNext}`}
          >
            Next
          </FilledButton>
        </div>
      </div>
    </>
  );
}

export default EventHeaderComponent;
