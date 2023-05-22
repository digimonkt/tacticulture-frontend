import { SVG } from "@/assets/svg";
import { Checkbox, Col, Row } from "antd";
import React, { Ref, forwardRef, useImperativeHandle } from "react";
import styles from "../../../pages/setup-profile/profile.module.css";
import { LabeledInput } from "@/component/input";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setPreLoader } from "@/redux/reducers/preLoader";
import { updateUser } from "@/api/user";
import { instructorStepTwoValidationSchema } from "@/utils/validations/instructorProfileValidation";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { useRouter } from "next/router";
import { updateCurrentUser } from "@/redux/reducers/user";
import { Weekdays } from "@/utils/constent";

export interface InstructorStepTwoRef {
  handleSubmitStepTwoDetail: () => void;
}

type FormikInitialStateType = {
  available_from: string | undefined;
  available_to: string | undefined;
  off_weekdays: string[];
};
// function Step2() {
const Step2 = forwardRef(function Step2(props, ref: Ref<InstructorStepTwoRef>) {
  // redux dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // formik
  const formik = useFormik<FormikInitialStateType>({
    initialValues: {
      available_from: undefined,
      available_to: undefined,
      off_weekdays: [],
    },
    validationSchema: instructorStepTwoValidationSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
      // setEmailError("");
    }, 2200);
  };
  // handle submit
  const handleSubmit = async (values: {
    available_from: string | undefined;
    available_to: string | undefined;
    off_weekdays: string[];
  }) => {
    dispatch(setPreLoader(true));

    const response = await updateUser(values);
    if (response.remote === "success") {
      dispatch(
        updateCurrentUser({
          availableFrom: values.available_from,
          availableTo: values.available_to,
          offWeekdays: values.off_weekdays,
        })
      );
      router.push({
        pathname: router.pathname,
        query: { ...router.query, step: 3 },
      });
    } else {
      if (response.error.status === 500) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
      } else if (response.error.status === 404) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
      } else {
        handleResetAlert();
      }
    }
    dispatch(setPreLoader(false));
  };

  useImperativeHandle(ref, () => ({
    handleSubmitStepTwoDetail: formik.handleSubmit,
  }));

  const setWeekdaysValues = (day: string) => {
    formik.setValues({
      ...formik.values,
      off_weekdays: formik.values.off_weekdays.includes(day)
        ? formik.values.off_weekdays.filter((weekday) => weekday !== day)
        : [...formik.values.off_weekdays, day],
    });
  };
  return (
    <>
      <div
        className="ps-4 pe-4 pb-3"
        style={{ borderBottom: "1px solid #555" }}
      >
        <h4>Set Your Default Availability</h4>
        <p className="mb-0">
          Configure your general availability for Open Availability Events
          <SVG.InfoIcon width="16px" />
        </p>
      </div>
      <Row className="mt-4">
        <Col md={12} className="ps-4 pe-2">
          <div className={`${styles.Hours}`}>
            <label>Available Hours</label>
            <LabeledInput
              type="time"
              className="form-control"
              {...formik.getFieldProps("available_from")}
            />
          </div>
        </Col>
        <Col md={12} className="pe-4 ps-2">
          <div className={`${styles.Hours}`}>
            <label className="mb-4"></label>
            <LabeledInput
              type="time"
              className="form-control"
              {...formik.getFieldProps("available_to")}
            />
          </div>
        </Col>
      </Row>

      <div className={`${styles.Weekend}`}>
        <>
          {Weekdays.map((item) => (
            <div className={`${styles.innerSection}`} key={item.id}>
              <span>
                <Checkbox
                  checked={formik.values.off_weekdays.includes(item.slug)}
                  onClick={() => setWeekdaysValues(item.slug)}
                />
              </span>
              <p className="mb-0">{item.name}</p>
            </div>
          ))}
        </>
      </div>
      <div style={{ borderBottom: "1px solid #555" }} className="text-center">
        <p className="ps-4 pe-4">
          You can still configure and further customize your availability later,
          or individually for each event!
        </p>
      </div>
    </>
  );
});

export default Step2;
