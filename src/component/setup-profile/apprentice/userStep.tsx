import React, { Ref, forwardRef, useImperativeHandle, useEffect } from "react";
import UploadProfileComponent from "@/component/upload-profile";
import styles from "../../../pages/setup-profile/profile.module.css";
import { Checkbox, Col, Row } from "antd";
import { FormLabel } from "react-bootstrap";
import { LabeledInput } from "@/component/input";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { apprenticeStepOneValidationSchema } from "@/utils/validations/apprenticeProfileValidation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { setPreLoader } from "@/redux/reducers/preLoader";
import { ErrorMessage } from "@/component/caption";
import { REQUEST_STATUS_TYPE, USER_ROLES } from "@/utils/enum";
import { setIsUserStepActive, updateUserDetails } from "@/redux/reducers/user";

interface IRouter {
  userEmail: string;
}

export interface IRef {
  handleSubmitApprenticeStepOne: () => void;
}

export interface IProps {
  role: USER_ROLES;
}

export type InitialValueType = {
  firstName: string;
  lastName: string;
  password: string;
  isPublicProfile: boolean;
  email: string;
  profileImage: string;
};

const UserStep = forwardRef(function UserStep(props: IProps, ref: Ref<IRef>) {
  // router
  const router = useRouter();

  // props
  const { role } = props;

  const { userEmail } = router.query as unknown as IRouter;

  // redux
  const dispatch = useAppDispatch();
  const { updateUserStatus, errroList, currentUser } = useAppSelector(
    (state) => state.userReducer
  );

  // formik
  const formik = useFormik<InitialValueType>({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      isPublicProfile: false,
      email: "",
      profileImage: "",
    },
    validationSchema: apprenticeStepOneValidationSchema,
    onSubmit: (values) => {
      handleUpdateProfile(values);
    },
  });

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2000);
  };

  // handle submit
  const handleUpdateProfile = async (values: InitialValueType) => {
    dispatch(setPreLoader(true));
    dispatch(updateUserDetails(values));
    if (updateUserStatus === REQUEST_STATUS_TYPE.fulfilled) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, step: role === "apprentice" ? 2 : 4 },
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
    handleSubmitApprenticeStepOne: formik.handleSubmit,
  }));

  // ---
  useEffect(() => {
    formik.setFieldValue("email", userEmail);
    formik.setFieldValue("firstName", currentUser.firstName);
    formik.setFieldValue("lastName", currentUser.lastName);
    formik.setFieldValue("isPublicProfile", currentUser.isPublicProfile);
    formik.setFieldValue("profileImage", currentUser.profileImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ borderBottom: "1px solid #555", paddingBottom: "24px" }}>
      <UploadProfileComponent
        handleSetProfileImage={(image: string | null) =>
          formik.setValues({ ...formik.values, profileImage: image || "" })
        }
      />
      <div className="mt-4 mb-4 pt-2 pb-2 ps-4 pe-4">
        <h5 className={`${styles.accounthead}`}>Your Account Information</h5>
        <div className="d-flex align-items-center ">
          <Checkbox
            checked={formik.values.isPublicProfile}
            onChange={(e) => {
              formik.setFieldValue("isPublicProfile", e.target.checked);
            }}
            className="me-2"
          />
          Create a public profile to log achievements and engage with the
          community{" "}
          <span style={{ fontSize: "12px", fontStyle: "italic" }}>
            (uncheck for private)
          </span>
        </div>
      </div>
      <div className={`${styles.apprenticeForm}`}>
        <Row className="ps-4 pe-4">
          <Col md={12}>
            <div className="me-3 mb-3">
              <FormLabel>
                First Name<span>*</span>
              </FormLabel>
              <LabeledInput
                {...formik.getFieldProps("firstName")}
                onBlur={(e) => {
                  if (
                    formik.values.firstName !== "" &&
                    formik.values.lastName !== ""
                  ) {
                    dispatch(setIsUserStepActive(true));
                  } else {
                    dispatch(setIsUserStepActive(false));
                  }
                  formik.getFieldProps("firstName").onBlur(e);
                }}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
              ) : null}
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <FormLabel>
                Last Name<span>*</span>
              </FormLabel>
              <LabeledInput
                {...formik.getFieldProps("lastName")}
                onBlur={(e) => {
                  if (
                    formik.values.firstName !== "" &&
                    formik.values.lastName !== ""
                  ) {
                    dispatch(setIsUserStepActive(true));
                  } else {
                    dispatch(setIsUserStepActive(false));
                  }
                  formik.getFieldProps("lastName").onBlur(e);
                }}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
              ) : null}
            </div>
          </Col>
          <Col md={12}>
            <div className="me-3 mb-3">
              <FormLabel>
                Email Address<span>*</span>
              </FormLabel>
              <LabeledInput
                disabled
                {...formik.getFieldProps("email")}
                style={{ background: "#fff", color: "#000" }}
              />
              {formik.touched.email && formik.errors.email ? (
                <ErrorMessage>{formik.errors.email}</ErrorMessage>
              ) : null}
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <FormLabel>Password</FormLabel>
              <LabeledInput
                type="password"
                {...formik.getFieldProps("password")}
              />
              {/* {formik.touched.password && formik.errors.password ? (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              ) : null} */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default UserStep;
