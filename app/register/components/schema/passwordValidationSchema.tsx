// validationSchema
import * as Yup from "yup";

// password setup validation schema
export const passwordValidationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(8, "Password should be of atleast 8 characters")
    .matches(/\d+/, {
      message: "Password should contain atleast a number",
    })
    .matches(/[a-z]+/, {
      message: "Password should contain atleast a lowercase letter",
    })
    .matches(/[A-Z]+/, {
      message: "Password should contain atleast a uppercase letter",
    })
    .matches(/[!@#$%^&*()-+]+/, {
      message: "Password should contain atleast a special character",
    })
    // .test('Password has spaces', (value) => !/\s+/.test(value))
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(8, "Password should be of atleast 8 characters")
    .matches(/\d+/, {
      message: "Password should contain atleast a number",
    })
    .matches(/[a-z]+/, {
      message: "Password should contain atleast a lowercase letter",
    })
    .matches(/[A-Z]+/, {
      message: "Password should contain atleast a uppercase letter",
    })
    .matches(/[!@#$%^&*()-+]+/, {
      message: "Password should contain atleast a special character",
    })
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Password is required"),
});
