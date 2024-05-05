import { FieldValues } from "react-hook-form";
import { ApiInstance } from "../../../../../utils/ApiInstance";
import { getAuthToken } from "@/components/common/Utils";

export interface RegisterUserBody extends FieldValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  centerName: string;
  // centreLocation: string;
  //   programType: string;
  //   classroomNumber: string;
  programType: string;
  userName: string;
  philosophyId: string;
  workingDays: any;
}

// register api
export const registerUser = async (
  body: RegisterUserBody,
  router: any,
  toast: any
) => {
  try {
    const res = await ApiInstance.post("/auth/register-new", body);
    if (res.data.success) {
      toast.success(res.data.message);
      setTimeout(()=>router.push("/thankyouPageRegister"),5000);
    } else {
      console.log("error");
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
  }
};

// category id api
export const classroomCategory = async () => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token,
      },
    };
    // const res = await ApiInstance.get("/classroom-category/all");
    const res = await ApiInstance.get(
      "/classroom-category/all-registered",
      config
    );

    // console.log(res, "res");
    if (res.data.success) {
      return res;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err in register ", err);
  }
};

// philosophy id api
export const philosophyID = async () => {
  try {
    const res = await ApiInstance.get("/daycare/philosophyMaster/list");
    if (res.data.success) {
      return res;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err in register ", err);
  }
};

// program id api
export const programID = async () => {
  try {
    const res = await ApiInstance.get("/program-type/all");
    if (res.data.success) {
      return res;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err in register ", err);
  }
};
