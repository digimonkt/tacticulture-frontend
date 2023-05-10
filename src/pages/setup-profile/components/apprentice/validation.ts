import * as Yup from "yup";

export const apprenticeStepOneValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    password: Yup.string().test("len", "Password must be atleast of 6 or more characters", (val = "") => val?.toString()?.length >= 6),
    isPublicProfile: Yup.boolean(),
    email: Yup.string()
    .email("Invalid email.")
    .required("Email is required!"),
});

export const userEventBioValidationSchema = Yup.object().shape({
  bio: Yup.string().max(500, "Bio should not be more than 500 chars!"),
  events: Yup.array().max(10, "Only 10 categories are allowed"),
});
