import * as yup from "yup";

export const IncidentValidationSchema = yup.object().shape({
  classroomId: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )
    .required("Classroom Name is required"),
  presentStaffId: yup
    .number()
    .transform((cv: unknown, ov: unknown) =>
      typeof ov === "string" && ov.trim() === "" ? undefined : cv
    )

    .required("Present Staff Name is required"),
  incidentType: yup.string().required("Incident Type is required"),
  natureofIncident: yup.string().required("Nature of Incident is required"),
  actionTaken: yup.string().required("Action Taken is required"),
});
