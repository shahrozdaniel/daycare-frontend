
import * as yup from "yup";
 

export const cleaningStaffValidation = yup
  .object()
  .shape({
    staff_name: yup.string().required("Name is a required field"),
    status: yup.number().typeError('Status is a required field').required("Status is a required field"),
  })

  export const LocationValidation = yup
  .object()
  .shape({
    staff_name: yup.string().required("Name is a required field"),
    status: yup.number().typeError('Status is a required field').required("Status is a required field"),
  })