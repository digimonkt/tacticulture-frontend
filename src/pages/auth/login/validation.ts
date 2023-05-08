import * as Yup from "yup";

export const magicLinkLoginValidationSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email("Invalid email.")
    .required("Email is required!"),
});

export const manualLoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});
