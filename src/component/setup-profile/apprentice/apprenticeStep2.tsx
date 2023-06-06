import EventInterest, { IEventCategories } from "@/component/eventInterest";
import TextareaComponent from "@/component/textarea";
import { useFormik } from "formik";
import React, { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { userEventBioValidationSchema } from "@/utils/validations/apprenticeProfileValidation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setPreLoader } from "@/redux/reducers/preLoader";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { ErrorMessage } from "@/component/caption";
import { useRouter } from "next/router";
import { updateUserDetails } from "@/redux/reducers/user";
import { REQUEST_STATUS_TYPE } from "@/utils/enum";

interface IFormik {
  bio: string;
  isProfileComplete: boolean;
  events: IEventCategories[];
  eventIds: number[];
}

export interface IStepTwoRef {
  handleSubmitApprenticeStepTwo: () => void;
}

const ApprenticeStep2 = forwardRef(function ApprenticeStep2(
  props,
  ref: Ref<IStepTwoRef>
) {
  // redux
  const dispatch = useAppDispatch();
  const { currentUser, updateUserStatus } = useAppSelector(
    (state) => state.userReducer
  );

  // router
  const router = useRouter();

  // formik
  const formik = useFormik<IFormik>({
    initialValues: {
      bio: "",
      isProfileComplete: true,
      events: [],
      eventIds: [],
    },
    validationSchema: userEventBioValidationSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    },
  });

  // add event interest list
  const handleAddEventInterestList = (item: IEventCategories) => {
    const isExist = formik.values.events?.includes(item);
    if (!isExist) {
      formik.setValues({
        ...formik.values,
        events: [...formik.values.events, item],
        eventIds: [...formik.values.eventIds, item.id],
      });
    }
  };

  // handle remove interest from list
  const handleRemoveEventInterest = (item: IEventCategories) => {
    const filteredList = formik.values.events?.filter((el) => el !== item);
    const filteredIds = formik.values.eventIds?.filter((el) => el !== item.id);
    formik.setValues({
      ...formik.values,
      events: filteredList || [],
      eventIds: filteredIds || [],
    });
  };

  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2200);
  };

  // handle submit
  const handleSubmit = async (values: IFormik) => {
    dispatch(setPreLoader(true));
    dispatch(
      updateUserDetails({
        events: values.eventIds,
        bio: values.bio,
        isProfileComplete: values.isProfileComplete,
      })
    );
    if (updateUserStatus === REQUEST_STATUS_TYPE.fulfilled) {
      router.push({
        pathname: "../apprentice/profile",
      });
    } else if (updateUserStatus === REQUEST_STATUS_TYPE.rejected) {
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
    handleSubmitApprenticeStepTwo: formik.handleSubmit,
  }));

  useEffect(() => {
    formik.setFieldValue("bio", currentUser.bio);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TextareaComponent
        title="Your Bio"
        value={formik.values.bio}
        onChange={(vl) => formik.setValues({ ...formik.values, bio: vl })}
      />
      {formik?.touched?.bio && formik.errors.bio ? (
        <ErrorMessage>{formik.errors.bio}</ErrorMessage>
      ) : null}
      <EventInterest
        eventInterestValues={formik.values.events}
        handleSetInterest={(vl) => handleAddEventInterestList(vl)}
        handleRemoveInterest={(vl) => handleRemoveEventInterest(vl)}
        formikProps={formik.getFieldProps("events")}
      />
      {/* {formik?.touched?.events && formik.errors.events ? (
        <ErrorMessage>{formik.errors.events}</ErrorMessage>
      ) : null} */}
    </div>
  );
});

export default ApprenticeStep2;
