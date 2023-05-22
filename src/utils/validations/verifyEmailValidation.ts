import * as Yup from "yup";

export const verificationCodeValidationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("verification code is required!"),
});
