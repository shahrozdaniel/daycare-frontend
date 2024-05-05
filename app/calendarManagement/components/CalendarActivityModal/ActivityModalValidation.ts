import * as yup from "yup";

export const addActivityModalValidation = yup.object().shape({
  activityName: yup.string().required("Activity Name is required"),
  domain: yup.string().required("Domain is required"),
  description: yup.string().required("Description is required"),
  date: yup.string(),
  classRoomCategory: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .positive("Classroom Category should be a positive number"),
 
  materialUsed: yup
    .array(
      yup.object({
        material: yup.string().required("Materials To Be Used is required"),
      })
    )
    .required("material used is required"),
  instructions: yup
    .array(
      yup.object({
        step: yup.string().required("Instructions is required"),
      })
    )
    .required("Instructions is required"),
  extraDetails: yup.string().required("ExtraDetails is required"),
  developmentSkill: yup.string().required("Development Skill is required"),
  // ispublic: yup.boolean().required("This is required"),
});
