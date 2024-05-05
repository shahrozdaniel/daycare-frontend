import * as yup from "yup";

export const addFoodMenuValidationSchema = yup.object().shape({
  menuName: yup.string().required("Food Menu name is required"),
  classRoomCategory: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .positive("Classroom Category should be a positive number"),
  //   .required("Classroom Category is required"),
  menuType: yup.string().required("Menu Type is required"),
  mealType: yup.string().required("Menu Type is required"),

  // foodItems: yup
  // .array(
  //   yup.object({
  //     material: yup.string().required("Materials To Be Used is required"),
  //   })
  // )
  // startTime: yup.string().required("Start time is required"),
  // endTime: yup.string().required("End Time is required"),
});
