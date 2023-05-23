import EventInterest, { IEventCategories } from "@/component/eventInterest";
import TextareaComponent from "@/component/textarea";
import { useFormik } from "formik";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { userEventBioValidationSchema } from "@/utils/validations/apprenticeProfileValidation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { updateUser } from "@/api/user";
import { setPreLoader } from "@/redux/reducers/preLoader";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { ErrorMessage } from "@/component/caption";
import { useRouter } from "next/router";
import { updateCurrentUser } from "@/redux/reducers/user";

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
  const { currentUser } = useAppSelector((state) => state.userReducer);

  // router
  const router = useRouter();

  // formik initial state
  const initialStates: IFormik = {
    bio: "",
    isProfileComplete: true,
    events: [],
    eventIds: [],
  };

  // formik
  const formik = useFormik({
    initialValues: initialStates,
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
    const payload = {
      events: values.eventIds,
      bio: values.bio,
      is_profile_complete: values.isProfileComplete,
    };
    const response = await updateUser(payload);

    if (response.remote === "success") {
      dispatch(
        updateCurrentUser({
          ...currentUser,
          events: values.eventIds,
          bio: values.bio,
          isProfileComplete: values.isProfileComplete,
        })
      );
      router.push({
        pathname: "../apprentice/profile",
      });
    } else {
      if (response?.error?.status === 500) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
        dispatch(setPreLoader(false));
      } else if (response?.error?.status === 404) {
        dispatch(
          setAlertMessage({
            error: true,
            message: response.error.errors,
            show: true,
          })
        );
        handleResetAlert();
        dispatch(setPreLoader(false));
      } else {
        // setEmailError(response.error.errors?.email[0]);
        handleResetAlert();
        dispatch(setPreLoader(false));
      }
    }
    dispatch(setPreLoader(false));
  };

  useImperativeHandle(ref, () => ({
    handleSubmitApprenticeStepTwo: formik.handleSubmit,
  }));

  return (
    <div>
      <TextareaComponent
        title="Your Bio"
        bioValue={formik.values.bio}
        handleChange={(vl) => formik.setValues({ ...formik.values, bio: vl })}
        formikProps={formik.getFieldProps("bio")}
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
