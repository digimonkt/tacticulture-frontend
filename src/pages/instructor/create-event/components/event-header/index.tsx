import { FilledButton, OutlinedButton } from "@/component/buttons";
import React from "react";
import styles from "../../course.module.css";

// import { useRouter } from "next/router";
import { FormikHandlers } from "formik";

interface IEventHeaderComponent {
  heading?: string;
  onPress: () => void;
  // formik: FormikHandlers;
}

function EventHeaderComponent({ heading, onPress }: IEventHeaderComponent) {
  // const router = useRouter();
  // const { step } = router.query;

  // const ChangePage = () => {
  //   router.push(`../instructor/create-event?step=${Number(step) + 1}`);
  // };
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
              onPress();
              // ChangePage();
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
