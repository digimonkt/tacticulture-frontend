import * as Yup from "yup";

export const apprenticeStepOneValidationSchema = Yup.object().shape(
  {
    first_name: Yup.string().required("First name is required!"),
    last_name: Yup.string().required("Last name is required!"),
    // password: Yup.string().when("password", (value) => {
    //   if (value) {
    //     return Yup.string().test(
    //       "len",
    //       "Password must be atleast of 6 or more characters",
    //       (val = "") => val?.toString()?.length >= 6
    //     );
    //   } else {
    //     return Yup.string()
    //       .transform((value, originalValue) => {
    //         // Convert empty values to null
    //         if (!value) {
    //           return null;
    //         }
    //         return originalValue;
    //       })
    //       .nullable()
    //       .optional();
    //   }
    // }),
    is_public_profile: Yup.boolean(),
    email: Yup.string().email("Invalid email.").required("Email is required!"),
  },
  [["password", "password"]]
);

export const userEventBioValidationSchema = Yup.object().shape({
  bio: Yup.string().max(500, "Bio should not be more than 500 chars!"),
  events: Yup.array().max(10, "Only 10 categories are allowed"),
});
