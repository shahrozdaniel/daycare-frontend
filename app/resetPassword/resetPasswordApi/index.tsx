import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
import { FieldValues } from "react-hook-form";

export interface ResendEmailBody extends FieldValues {
  email: string;
}

// resend email api
export const resendEmail = async (
  body: ResendEmailBody,
  router: any,
  toast: any
) => {
  try {
    const res = await ApiInstance.put("/auth/resend-email", body);
    if (res.data.success) {
      toast.success("Please check your email for link to reset your password");
    } else {
      console.log("error");
    }
  } catch (err: any) {
    toast.error(err.response.data.error);
    console.log("err in register ", err);
  }
};
