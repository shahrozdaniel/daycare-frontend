import * as Yup from "yup";
export const AddDiscountValidationSchema = Yup.object().shape({
  name: Yup.string().required("Discount Name is required"),
  discountType: Yup.string().required("Discount Type is required"),
  description: Yup.string().required("Description is required"),
  value: Yup.number().required("Amount is required"),
});

export const AddSubsidyProgramValidationSchema = Yup.object().shape({
  subsidyName: Yup.string().required("Subsidy Name is required"),
  subsidyProvider: Yup.string().required("Subsidy Provider is required"),
  subsidyProviderId: Yup.string().required("Provider Agency ID is required"),
  Description: Yup.string().required("Description is required"),
});

export const AddInvoiceValidationSchema = Yup.object().shape({
  invoiceFor: Yup.string().required("Invoice For is required"),
  enrollmentId: Yup.string().required("Enrollment Id is required"),
  amount: Yup.string()
    .matches(/^[0-9]*$/, "Amount should be number")
    .required("Amount is required"),
});

export const AddPaymentValidationSchema = Yup.object().shape({
  // invoiceFor: Yup.string().required("Invoice For is required"),
  // enrollmentId: Yup.string().required("Enrollment Id is required"),
  amount: Yup.string()
    .matches(/^[0-9]*$/, "Amount should be number")
    .required("Amount is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
  referenceNumber: Yup.string().required("Reference No. is required"),
  paymentDate: Yup.string().required("Payment Date is required"),
});
