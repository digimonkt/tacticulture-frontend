import * as Yup from "yup";

export const passwordRestValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  confirmPassword: Yup.string().required("Confirm Password is required!"),
  token: Yup.string().required("token is required!"),
  uid: Yup.string().required("uid is required!"),
});
