import { FilledButton, OutlinedButton } from "@/component/buttons";
import React from "react";
import styles from "../../course.module.css";
import Swal from "sweetalert";

// import { useRouter } from "next/router";
import { FormikHandlers } from "formik";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { resetEventData } from "@/redux/reducers/event";
import { useRouter } from "next/router";

interface IEventHeaderComponent {
  heading?: string;
  onPress: () => void;
  // formik: FormikHandlers;
}

function EventHeaderComponent({ heading, onPress }: IEventHeaderComponent) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const { step } = router.query;

  // const ChangePage = () => {
  //   router.push(`../instructor/create-event?step=${Number(step) + 1}`);
  // };
  const cancelFunc = () => {
    Swal({
      title: "all event creation data will be removed!",
      icon: "error",
    }).then((value) => {
      dispatch(resetEventData());
      router.push("/instructor/home");
    });
  };
  return (
    <>
      <div className={`${styles.header}`}>
        <h1>{heading}</h1>
        <div className="d-flex align-items-baseline">
          <OutlinedButton
            onClick={cancelFunc}
            className={`${styles.BtnCancel}`}
          >
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
