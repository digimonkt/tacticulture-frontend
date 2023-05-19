import * as Yup from "yup";

export const passwordRestValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  passwordConfirm: Yup.string().required("Confirm Password is required!"),
});
