import * as yup from "yup";

export const GraduationModalValidationSchema = yup.object().shape({
  graduationDate: yup.string().required("Graduation Date is required"),
});

export const AssignClassroomValidationSchema = yup.object().shape({
  classroom: yup.string().required("Classroom is required"),
});
