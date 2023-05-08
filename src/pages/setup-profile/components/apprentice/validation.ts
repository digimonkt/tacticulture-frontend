import * as Yup from "yup";

export const apprenticeStepOneValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    password: Yup.string().test("len", "Password must be atleast of 6 or more characters", (val = "") => val?.toString()?.length >= 6),
    isPublicProfile: Yup.boolean()
});
