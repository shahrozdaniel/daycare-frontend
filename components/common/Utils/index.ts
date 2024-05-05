export const getAuthToken = () => {
  const authToken = localStorage.getItem("token");
  return authToken;
};

export const someAsyncFunctionWithDelay = (errors: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Object.keys(errors).length === 0 ? true : false;
      resolve(isSuccess);
    }, 2000);
  });
};
export const getCurrentStage = (index: number) => {
  switch (index) {
    case 0:
      return "child_details";
    case 1:
      return "parent_details";
    case 2:
      return "immunization_details";
    case 3:
      return "medical_details";
    case 4:
      return "emergency_contact_details";
    case 5:
      return "emergency_doctor_details";
    case 6:
      return "dietary_details";
    case 7:
      return "sleep_details";
    case 8:
      return "other_details";
    case 9:
      return "physical_details_final";
    default:
      return "unknown_stage";
  }
};

export const getStageName = (stage: string) => {
  switch (stage) {
    case "child_details":
      return 0;
    case "parent_details":
      return 1;
    case "immunization_details":
      return 2;
    case "medical_details":
      return 3;
    case "emergency_contact_details":
      return 4;
    case "emergency_doctor_details":
      return 5;
    case "dietary_details":
      return 6;
    case "sleep_details":
      return 7;
    case "other_details":
      return 8;
    case "physical_details_final":
      return 9;
    default:
      return null;
  }
};
export const getApiBody = (detail: any, step: number) => {
  const current_stage = getCurrentStage(step);
  let formData = new FormData();
  formData.append(current_stage, JSON.stringify(detail));
  formData.append("current_stage", current_stage);
  return formData;
};
