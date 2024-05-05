import * as yup from "yup";

export const addClassroomValidationSchema = yup.object().shape({
  classroomName: yup
    .string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Invalid characters. Use only alphabetical characters."
    )
    .required("Classroom Name is required"),
  staffRatio: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .positive("Educator Ratio should be a positive number")
    .required("Educator Ratio is required"),
  maxChildrens: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .positive("Max child should be a positive number")
    .required("Max child is required"),
  status: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .positive("Status should be a positive number")
    .required("Status is required"),
  categoryId: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .positive("Classroom Category should be a positive number")
    .required("Classroom Category is required"),
});
