import * as yup from "yup";

export const enrollValidationSchema = [
  //validation for step1
  yup.object({
    childFirstName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .required("First Name is a required field"),
    childLastName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .required("Last Name is a required field"),
    childGender: yup.string().required("Gender is a required field"),
    classroom: yup.string().required("classroom is a required field"),
  }),
  //validation for step2
  yup.object({
    parent1FirstName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .required("First Name is a required field"),
    parent1LastName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .required("Last Name is a required field"),

    parent1Gender: yup.string().required("Gender is a required field"),
    parent1Contact: yup
      .string()
      .test("is-numeric", "Only numbers are allowed", (value) => {
        if (!value) return true; // Skip validation if the value is empty
        return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
      })
      .test("is-ten-digits", "Contact number must be 10 digits", (value) => {
        const numericValue = value.replace(/\D/g, "");
        return numericValue.length === 10;
      })
      .required("Contact is a required field"),
    parent1Relation: yup.string().required("Relation is required"),
    parent1AddressLine1: yup
      .string()
      .required("Address Line 1 is a required field"),
    parent1City: yup.string().required("City is a required field"),
    parent1State: yup.string().required("State is a required field"),
    parent1Country: yup.string().required("Country is a required field"),
    parent1PinCode: yup
      .string()
      .required("Postalcode is a required field")
      .length(6, "Postal Code must be exactly 6 characters"),
    parent2FirstName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable(),
    parent2LastName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable(),
    parent2Gender: yup.string().when(["parent2FirstName", "parent2LastName"], {
      is: true,
      then: yup.string().required("Parent 2 gender is required"),
    }),
    // parent2AddressLine1: yup
    //   .string()
    //   .when(["parent2FirstName", "parent2LastName"], {
    //     is: true,
    //     then: yup.string().required("Parent 2 address line 1 is required"),
    //   }),
    parent2City: yup.string().when(["parent2FirstName", "parent2LastName"], {
      is: true,
      then: yup.string().required("Parent 2 city is required"),
    }),
    parent2State: yup.string().when(["parent2FirstName", "parent2LastName"], {
      is: true,
      then: yup.string().required("Parent 2 state is required"),
    }),
    parent2Country: yup.string().when(["parent2FirstName", "parent2LastName"], {
      is: true,
      then: yup.string().required("Parent 2 country is required"),
    }),
    parent2PinCode: yup.string().when(["parent2FirstName", "parent2LastName"], {
      is: true,
      then: yup
        .string()
        .required("Postalcode is a required field")
        .length(6, "Postal Code must be exactly 6 characters"),
    }),
  }),
  //validation for step3
  yup.object({
    // vaccinationType: yup
    //   .string()
    //   .required("Vaccination Type is a required field"),
    // vaccinationDate: yup
    //   .string()
    //   .required("Vaccination Date is a required field"),
  }),

  //validation for step4
  yup.object({}),

  //validation for step5
  yup.object({
    emergencyContactDetails: yup.array().of(
      yup.object().shape({
        contact: yup
          .string()
          .nullable()
          .test("is-numeric", "Only numbers are allowed", (value) => {
            if (!value) return true; // Skip validation if the value is empty
            return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
          })
          .test(
            "is-ten-digits",
            "Contact number must be 10 digits",
            (value) => {
              if (value === null || value === undefined || value.trim() === "")
                return true;
              const numericValue = value.replace(/\D/g, "");
              return numericValue.length === 10;
            }
          ),
      })
    ),
    // emergencyfirstName: yup.string().required("First Name is a required field"),
    // emergencyEmail: yup.string().required("Email is a required field"),
    // emergencyContact: yup.string().required("Contact is a required field"),
    // emergencyAddressLine1: yup
    //   .string()
    //   .required("Address Line 1 is a required field"),
    // emergencyCity: yup.string().required("City is a required field"),
    // emergencyState: yup.string().required("State is a required field"),
    // emergencyCountry: yup.string().required("Country is a required field"),
    // emergencyPincode: yup.string().required("Postal Code is a required field"),
  }),

  //validation for step6
  yup.object({
    emergencyfirstName: yup.string().required("First Name is a required field"),
    emergencyContact: yup
      .string()
      .test("is-numeric", "Only numbers are allowed", (value) => {
        if (!value) return true; // Skip validation if the value is empty
        return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
      })
      .test("is-ten-digits", "Contact number must be 10 digits", (value) => {
        if (value === null || value === undefined || value.trim() === "")
          return true;
        const numericValue = value.replace(/\D/g, "");
        return numericValue.length === 10;
      })
      .required("Contact is a required field"),
    emergencyEmail: yup
      .string()
      .nullable()
      .email("Email must be a valid email"),
    // emergencyPincode: yup
    //   .string()
    //   .nullable()
    //   .length(6, "Postal code must be exactly 6 characters"),
  }),

  //validation for step7
  yup.object({}),

  //validation for step8
  yup.object({
    napCount: yup
      .string()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .matches(/^\d*\.?\d*$/, "Please enter a valid positive number"),
    napDuration: yup
      .string()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .matches(/^\d*\.?\d*$/, "Please enter a valid positive number"),
  }),
  //validation for step9
  yup.object({}),
  //validation for step10
  yup.object({}),
];

// export const setEnrollvalidationSchema=()=>{
//   //validation for step1
// return  yup.object({
//     childFirstName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       )
//       .required("First Name is a required field"),
//     childLastName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       )
//       .required("Last Name is a required field"),
//     childGender: yup.string().required("Gender is a required field"),
//     classroom: yup.string().required("classroom is a required field"),
//   }),
//   //validation for step2
//   yup.object({
//     parent1FirstName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       )
//       .required("First Name is a required field"),
//     parent1LastName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       )
//       .required("Last Name is a required field"),
//     parent1PreferredName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       ),
//     parent1Gender: yup.string().required("Gender is a required field"),
//     parent1AddressLine1: yup
//       .string()
//       .required("Address Line 1 is a required field"),
//     parent1City: yup.string().required("City is a required field"),
//     parent1State: yup.string().required("State is a required field"),
//     parent1Country: yup.string().required("Country is a required field"),
//     parent1PinCode: yup.string().required("Postal Code is a required field"),
//     parent2FirstName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       ),
//     parent2LastName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       ),
//     parent2PreferredName: yup
//       .string()
//       .matches(
//         /^[a-zA-Z]+$/,
//         "Invalid characters. Use only alphabetical characters."
//       ),
//     parent2Gender: yup.string().when(["parent2FirstName", "parent2LastName"], {
//       is: true,
//       then: yup.string().required("Parent 2 gender is required"),
//     }),
//     parent2AddressLine1: yup
//       .string()
//       .when(["parent2FirstName", "parent2LastName"], {
//         is: true,
//         then: yup.string().required("Parent 2 address line 1 is required"),
//       }),
//     parent2City: yup.string().when(["parent2FirstName", "parent2LastName"], {
//       is: true,
//       then: yup.string().required("Parent 2 city is required"),
//     }),
//     parent2State: yup.string().when(["parent2FirstName", "parent2LastName"], {
//       is: true,
//       then: yup.string().required("Parent 2 state is required"),
//     }),
//     parent2Country: yup.string().when(["parent2FirstName", "parent2LastName"], {
//       is: true,
//       then: yup.string().required("Parent 2 country is required"),
//     }),
//     parent2PinCode: yup.string().when(["parent2FirstName", "parent2LastName"], {
//       is: true,
//       then: yup.string().required("Parent 2 pincode is required"),
//     }),
//   }),
//   //validation for step3
//   yup.object({
//     // vaccinationType: yup
//     //   .string()
//     //   .required("Vaccination Type is a required field"),
//     // vaccinationDate: yup
//     //   .string()
//     //   .required("Vaccination Date is a required field"),
//   }),

//   //validation for step4
//   yup.object({}),

//   //validation for step5
//   yup.object({
//     // emergencyfirstName: yup.string().required("First Name is a required field"),
//     // emergencyEmail: yup.string().required("Email is a required field"),
//     // emergencyContact: yup.string().required("Contact is a required field"),
//     // emergencyAddressLine1: yup
//     //   .string()
//     //   .required("Address Line 1 is a required field"),
//     // emergencyCity: yup.string().required("City is a required field"),
//     // emergencyState: yup.string().required("State is a required field"),
//     // emergencyCountry: yup.string().required("Country is a required field"),
//     // emergencyPincode: yup.string().required("Postal Code is a required field"),
//   }),

//   //validation for step6
//   yup.object({
//     emergencyfirstName: yup.string().required("First Name is a required field"),
//     emergencyContact: yup
//       .string()
//       .matches(/^[0-9]*$/, "Contact must only contain numbers")
//       .required("Contact is a required field"),
//     emergencyEmail: yup.string().email().required("Email is required"),
//   }),

//   //validation for step7
//   yup.object({}),

//   //validation for step8
//   yup.object({}),

//   //validation for step9
//   yup.object({}),
//   //validation for step10
//   yup.object({}),
// }
