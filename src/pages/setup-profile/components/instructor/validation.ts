import * as Yup from "yup";

export const instructorStepOneValidationSchema = Yup.object().shape({
  customUrl: Yup.string(),
  bio: Yup.string(),
  timezone: Yup.string(),
});

export const instructorStepTwoValidationSchema = Yup.object().shape({});
