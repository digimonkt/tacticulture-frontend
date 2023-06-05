import { SVG } from "@/assets/svg";
import { Checkbox, Col, Row } from "antd";
import React, { Ref, forwardRef, useEffect, useImperativeHandle } from "react";
import styles from "../../../pages/setup-profile/profile.module.css";
import { LabeledInput } from "@/component/input";
import { useFormik } from "formik";
import { setPreLoader } from "@/redux/reducers/preLoader";
import { instructorStepTwoValidationSchema } from "@/utils/validations/instructorProfileValidation";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { useRouter } from "next/router";
import { updateUserDetails } from "@/redux/reducers/user";
import { Weekdays } from "@/utils/constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { REQUEST_STATUS_TYPE } from "@/utils/enum";
export interface InstructorStepTwoRef {
  handleSubmitStepTwoDetail: () => void;
}

type FormikInitialStateType = {
  availableFrom?: string;
  availableTo?: string;
  offWeekdays?: string[];
};
// function Step2() {
const Step2 = forwardRef(function Step2(props, ref: Ref<InstructorStepTwoRef>) {
  // redux dispatch
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();
  const { currentUser, updateUserStatus, errroList } = useAppSelector(
    (state) => state.userReducer
  );

  // formik
  const formik = useFormik<FormikInitialStateType>({
    initialValues: {
      availableFrom: undefined,
      availableTo: undefined,
      offWeekdays: [],
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
  const handleSubmit = async (values: FormikInitialStateType) => {
    dispatch(setPreLoader(true));
    dispatch(updateUserDetails(values));

    if (updateUserStatus === REQUEST_STATUS_TYPE.fulfilled) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, step: 3 },
      });
    } else if (updateUserStatus === REQUEST_STATUS_TYPE.rejected) {
      console.log("rejected error -- ", errroList);
      dispatch(
        setAlertMessage({
          error: true,
          message: "Error has occurs!",
          show: true,
        })
      );
      handleResetAlert();
    }
    dispatch(setPreLoader(false));
  };

  useImperativeHandle(ref, () => ({
    handleSubmitStepTwoDetail: formik.handleSubmit,
  }));

  const setWeekdaysValues = (day: string) => {
    if (formik.values?.offWeekdays) {
      formik.setValues({
        ...formik.values,
        offWeekdays: formik.values.offWeekdays.includes(day)
          ? formik.values.offWeekdays.filter((weekday) => weekday !== day)
          : [...formik.values.offWeekdays, day],
      });
    }
  };

  useEffect(() => {
    formik.setFieldValue("availableFrom", currentUser.availableFrom);
    formik.setFieldValue("availableTo", currentUser.availableTo);
    formik.setFieldValue("offWeekdays", currentUser.offWeekdays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            {/* <TimepickerInput
              className="timePickers"
              suffixIcon={<SVG.DownChevron width="16px" />}
              onChange={(vl) => console.log("e -- ", vl)}
              // {...formik.getFieldProps("availableFrom")}
            /> */}
            <LabeledInput
              type="time"
              className="form-control"
              {...formik.getFieldProps("availableFrom")}
            />
          </div>
        </Col>
        <Col md={12} className="pe-4 ps-2">
          <div className={`${styles.Hours}`}>
            <label className="mb-4"></label>
            {/* <TimepickerInput
              suffixIcon={<SVG.DownChevron width="16px" />}
              className="timePickers"
              {...formik.getFieldProps("availableTo")}
            /> */}
            <LabeledInput
              type="time"
              className="form-control"
              {...formik.getFieldProps("availableTo")}
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
                  checked={formik.values.offWeekdays?.includes(item.slug)}
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
