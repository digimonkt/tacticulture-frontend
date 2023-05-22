import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email("Invalid email.")
    .required("Email is required!"),
});
