import { FieldValues } from "react-hook-form";
import { ApiInstance } from "../../../../utils/ApiInstance";

export interface loginUserBody extends FieldValues {
    userName: string,
    password: string
}

// Login api
export const loginuser = async (body: loginUserBody) => {
    const res = await ApiInstance.post("auth/login", body);
    if (res?.data?.success) {
        return res?.data
    } else {
        return res
    }
};
