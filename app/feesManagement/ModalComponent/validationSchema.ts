import * as Yup from "yup";
export const AddDiscountValidationSchema = Yup.object().shape({
  name: Yup.string().required("Discount Name is required"),
  discountType: Yup.string().required("Discount Type is required"),
  description: Yup.string().required("Description is required"),
  value: Yup.string()
    .test("is-positive-integer", "Amount must be positive number", (value) => {
      if (!value) return true; // Skip validation if the value is empty
      const numericValue = Number(value);
      return numericValue > 0;
    })
    .required("Amount is required"),
});

export const AddSubsidyProgramValidationSchema = Yup.object().shape({
  subsidyName: Yup.string().required("Subsidy Name is required"),
  subsidyProvider: Yup.string().required("Subsidy Provider is required"),
  subsidyProviderId: Yup.string().required("Provider Agency ID is required"),
  Description: Yup.string().required("Description is required"),
});

export const AddInvoiceValidationSchema = Yup.object().shape({
  invoiceFor: Yup.string().required("Invoice For is required"),
  registrationId: Yup.string().required("Child is required"),
  amount: Yup.string()
    .test("is-positive-integer", "Amount must be positive number", (value) => {
      if (!value) return true; // Skip validation if the value is empty
      const numericValue = Number(value);
      return numericValue > 0;
    })
    .required("Amount is required"),
});

export const AllocateSeatValidationSchema = Yup.object().shape({
  invoiceFor: Yup.string().required("Invoice For is required"),
  amount: Yup.string()
    .matches(/^[0-9]*$/, "Amount should be number")
    .required("Amount is required"),
  planType: Yup.string().required("Plan Type is required"),
  planName: Yup.string().required("Plan Name is required"),
});
export const AddPaymentValidationSchema = Yup.object().shape({
  // invoiceFor: Yup.string().required("Invoice For is required"),
  // enrollmentId: Yup.string().required("Enrollment Id is required"),
  amountPayment: Yup.string()
    .test("is-positive-integer", "Amount must be positive number", (value) => {
      if (!value) return true; // Skip validation if the value is empty
      const numericValue = Number(value);
      return numericValue > 0;
    })
    .required("Amount is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
  referenceNumber: Yup.string()
    .test(
      "is-positive-integer",
      "Reference No. must be a positive integer",
      (value) => {
        if (!value) return true; // Skip validation if the value is empty
        const numericValue = Number(value);
        return Number.isInteger(numericValue) && numericValue > 0;
      }
    )
    .required("Reference No. is required"),
  paymentDate: Yup.string().required("Payment Date is required"),
});

export const AddTutionPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  classroom: Yup.string().required("Classroom is required"),
  billingFees: Yup.string().required("Billing Fees Type is required"),
  tutionFeesType: Yup.string().required("Tution Fees Type is required"),
  amountPerDay: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      console.log("tutionFeesType", tutionFeesType);
      return tutionFeesType[0] === "daily-rate"
        ? schema.required("Amount per day is required")
        : schema;
    }
  ),
  taxAmount: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      return tutionFeesType[0] === "daily-rate" ||
        tutionFeesType[0] === "flat-rate" ||
        tutionFeesType[0] === "fee-tier"
        ? schema.required("Tax amount is required")
        : schema;
    }
  ),
  amount: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      return tutionFeesType[0] === "flat-rate"
        ? schema.required("Amount is required")
        : schema;
    }
  ),
  fullDayFees: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      return tutionFeesType[0] === "fee-tier"
        ? schema.required("Full day fees is required")
        : schema;
    }
  ),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
});

export const AddIndividualPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  childId: Yup.string().required("Child is required"),
  billingFees: Yup.string().required("Billing Fees Type is required"),
  tutionFeesType: Yup.string().required("Tution Fees Type is required"),
  amountPerDay: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      console.log("tutionFeesType", tutionFeesType);
      return tutionFeesType[0] === "daily-rate"
        ? schema.required("Amount per day is required")
        : schema;
    }
  ),
  taxAmount: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      return tutionFeesType[0] === "daily-rate" ||
        tutionFeesType[0] === "flat-rate" ||
        tutionFeesType[0] === "fee-tier"
        ? schema.required("Tax amount is required")
        : schema;
    }
  ),
  amount: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      return tutionFeesType[0] === "flat-rate"
        ? schema.required("Amount is required")
        : schema;
    }
  ),
  fullDayFees: Yup.string().when(
    "tutionFeesType",
    function (tutionFeesType: any, schema) {
      return tutionFeesType[0] === "fee-tier"
        ? schema.required("Full day fees is required")
        : schema;
    }
  ),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
});
