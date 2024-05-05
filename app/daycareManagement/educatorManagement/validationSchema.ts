import * as yup from "yup";

export const addEducatorValidationSchemas = yup.object().shape({
  firstName: yup.string().required("first name is a required field"),
  lastName: yup.string().required("last name is a required field"),
  email: yup.string().email().required("email is a required field"),
  addressLine1: yup.string().required("Address Line1 is a required field"),
  city: yup.string().required(" City is a required field"),
  state: yup.string().required("State is a required field"),
  pincode: yup
    .string()
    .required("Postal Code is a required field")
    .length(6, "Code must be exactly 6 characters"),
  country: yup.string().required("Country is a required field"),
  classroom: yup.string().required("Classroom is a required field"),
  employmentStartDate: yup.string().required(),
  // childDob: yup.string().required(" Date of Birth  is a required field"),
  // street: yup.string().required(" Street is a required field"),
  //   parentFirstName: yup.string().required("First Name is a required field"),
  //   parentLastName: yup.string().required("Parent Last Name is a required field"),
  //   parentPreferredName: yup
  //     .string()
  //     .required("Parent Preferred Name is a required field"),
  //   parentRelationToChild: yup
  //     .string()
  //     .required("Parent Relation To Child is a required field"),
  //   parentEmail: yup.string().required("Email is a required field"),
  //   parentContact: yup.string().required("Contact is a required field"),
  //   parentOccupation: yup.string().required("Occupation is a required field"),
  //   parentGender: yup.string().required("Gender is a required field"),
  //   // parentIsCustodian: yup.string().required("parent Is Custodian is a required field"),

  //   //  registration Validation
  //   // childcareType: yup.string().required("Child Care Type is a required field"),
  //   classroomType: yup.string().required("Class Room  is a required field"),
  //   enrollmentType: yup.string().required("Enrollment is a required field"),
});
export const addEducatorValidationSchema = [
  //validation for step1
  yup.object({
    firstName: yup
      .string()
      .matches(
        /^[a-zA-Z]+$/,
        "Invalid characters. Use only alphabetical characters."
      )
      .required("First Name is a required field"),
    lastName: yup
      .string()
      .matches(
        /^[a-zA-Z]+$/,
        "Invalid characters. Use only alphabetical characters."
      )
      .required("Last Name is a required field"),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is a required field"),
    number: yup
      .string()
      .test(
        "is-ten-digits",
        "Phone  number must be 10 digits",
        (value: any) => {
          const numericValue = value.replace(/\D/g, "");
          return numericValue.length === 10;
        }
      )
      .required("Phone number is a required field"),
    dob: yup.string().required("Date of birth is a required field"),
    gender: yup.string().required("Gender is a required field"),
    addressLine1: yup.string().required("Address Line is a required field"),
    // number: yup
    //   .string()
    //   .matches(/^[0-9]*$/, "Contact must only contain numbers"),
    city: yup.string().required(" City is a required field"),
    state: yup.string().required("State is a required field"),
    pincode: yup
      .string()
      .required("Postal Code is a required field")
      .length(6, "Code must be exactly 6 characters"),
    country: yup.string().required("Country is a required field"),
    classroom: yup.string().required("Classroom is a required field"),
  }),
  //validation for step2
  yup.object({
    employmentStartDate: yup
      .string()
      .required("Employment Start Date is a required field"),
    employementtype: yup
      .string()
      .required("Employment Type is a required field"),
  }),
  //validation for step3
  yup.object({}),
  //validation for step4
  yup.object({
    emergencyDetail: yup.array(
      yup.object({
        contactNumber: yup
          .string()
          .matches(/^[0-9]*$/, "Contact number must only contain numbers"),
      })
    ),
  }),
  yup.object({}),
];

export const CheckOutCheckInValidationSchema = [
  //validation for step1
  yup.object({
    checkIn: yup.string().required("checkin is a required field"),
  }),
  //validation for step2
  yup.object({
    checkOut: yup.string().required("checkout is a required field"),
  }),
];
