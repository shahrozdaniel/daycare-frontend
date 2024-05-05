// validationSchema
import * as Yup from "yup";

// register page validation schema
export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "Invalid characters. Use only alphabetical characters."
    )
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "Invalid characters. Use only alphabetical characters."
    )
    .required("Last Name is required"),
  email: Yup.string()
    .matches(/^\S+@\S+\.\S+$/, "Invalid work email")
    .required(),
  phoneNo: Yup.string()
    // .matches(/^[0-9]*$/, "Contact must only contain numbers")
    .required("Contact is a required field").min(14, 'Must be exactly 10 digits')
    .max(14, 'Must be exactly 10 digits'),
  centerName: Yup.string().required("Center Name is required"),
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
    .required("Username is required"),
  programType: Yup.string().required("Program Type is required"),
  philosophyId: Yup.string().required("Philosphy Type is required"),
  country: Yup.string().required("Country is required"),
  time_zone: Yup.string().required("Time zone is required"),
  cardNumber: Yup.string()
    .required("Credit card number is required"),
    // .matches(/^(\d{4}\s?){4}$/, "Credit card number should be 16 digits")
    // .test("luhn-algorithm", "Invalid credit card number", function (value) {
    //   if (!value) return false;

    //   // Remove spaces from the card number
    //   const cardNumber = value.replace(/\s/g, "");

    //   // Luhn algorithm implementation
    //   let sum = 0;
    //   let doubleUp = false;
    //   for (let i = cardNumber.length - 1; i >= 0; i--) {
    //     let digit = parseInt(cardNumber.charAt(i));
    //     if (doubleUp) {
    //       digit *= 2;
    //       if (digit > 9) {
    //         digit -= 9;
    //       }
    //     }
    //     sum += digit;
    //     doubleUp = !doubleUp;
    //   }
    //   return sum % 10 === 0;
    // }),
  name: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Invalid characters. Use only alphabetical characters."
    )
    .required("Cardholder name is required"),
  expiration: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date format")
    .test(
      "is-ten-digits",
      "Expiration date must be in the format MM/YY",
      (value) => {
        if (value === null || value === undefined || value.trim() === "")
          return true;
        const dateValue = value.replace(/\D/g, "");
        return dateValue.length === 4;
      }
    )
    .test("expirationDate", "Credit card is expired", function (value) {
      if (!value) return false; // If expiration date is not provided, return false
      const today = new Date();
      const [month, year] = value.split("/");
      const cardExpiration = new Date(
        2000 + parseInt(year),
        parseInt(month) - 1
      );
      return cardExpiration > today; // Expiration date must be in the future
    }),
  cvv: Yup.string()
    .required("CVV/CVC is required")
    .matches(/^\d{3,4}$/, "CVV/CVC must be 3 or 4 digits"),
});
