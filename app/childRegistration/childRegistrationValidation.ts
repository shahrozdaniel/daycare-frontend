import * as yup from "yup";
export const RegistrationSchema = [
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
    childDob: yup.string().required(" Date of Birth  is a required field"),
    // age: yup.string().required(" Age is a required field"),
    childLanguage: yup.string().required("Child Language is a required field"),
    ChildGender: yup.string().required("Gender Name is a required field"),
    childPreferredName: yup.string(),
  }),
  // validation for step2
  yup.object({
    street1: yup.string().required("Address Line 1 is a required field"),
    city: yup.string().required(" City is a required field"),
    state: yup.string().required("State is a required field"),
    postalCode: yup
      .string()
      .required("Postalcode is a required field")
      .length(6, "Postal Code must be exactly 6 characters"),
    country: yup.string().required("Country is a required field"),
    parentFirstName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .required("First Name is a required field"),
    parentLastName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Invalid characters. Use only alphanumeric characters."
      )
      .required("Last Name is a required field"),
    parentPreferredName: yup.string(),
    parentRelationToChild: yup
      .string()
      .required("Relation To Child is a required field"),
    parentEmail: yup
      .string()
      .trim()
      .required("Email is a required field")
      .email("Invalid email address")
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/,
        "Invalid email address format"
      ),
    parentContact: yup
      .string()
      .test("is-numeric", "Only numbers are allowed", (value) => {
        if (!value) return true; // Skip validation if the value is empty
        return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
      })
      .test(
        "is-ten-digits",
        "Contact number must be 10 digits",
        (value: any) => {
          const numericValue = value.replace(/\D/g, "");
          return numericValue.length === 10;
        }
      )
      .required("Contact is a required field"),
    parentContact2: yup
      .string()
      .test("is-numeric", "Only numbers are allowed", (value) => {
        if (!value) return true; // Skip validation if the value is empty
        return /^[0-9\s~`!@#$%^&*()-_+={}[\]|;:'",./<>?]*$/.test(value); // Check if value contains only numeric characters
      })
      .test(
        "is-ten-digits",
        "Contact number must be 10 digits",
        (value: any) => {
          if (value === null || value === undefined || value.trim() === "")
            return true;
          const numericValue = value.replace(/\D/g, "");
          return numericValue.length === 10;
        }
      ),
    // parentOccupation: yup
    //   .string()
    //   .matches(
    //     /^[a-zA-Z]+$/,
    //     "Invalid characters. Use only alphabetical characters."
    //   )
    //   .required("Occupation is a required field"),
    parentGender: yup.string().required("Gender is a required field"),
  }),
  // validation for step3
  yup.object({
    startDate: yup.string().required("Start Date  is a required field"),
    // parentIsCustodian: yup.string().required("parent Is Custodian is a required field"),
    //  registration Validation
    // childcareType: yup.string().required("Child Care Type is a required field"),
    classroomType: yup.string().required("Class Room  is a required field"),
    enrollmentType: yup.string().required("Enrollment is a required field"),
  }),
  yup.object({}),
];
