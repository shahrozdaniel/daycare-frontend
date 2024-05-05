import { ApiInstance } from "@/utils/ApiInstance";
import { FieldValues } from "react-hook-form";

export interface verifyOtpBody extends FieldValues {
    email: string,
    otp: string
}

// Login api
export const verifyOtpApi = async (body: verifyOtpBody) => {
    const res = await ApiInstance.post("otp/verify", body);
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
