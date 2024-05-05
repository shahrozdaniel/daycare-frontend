import { FieldValues } from "react-hook-form";
import { ApiInstance } from "@/utils/ApiInstance";
import { getAuthToken } from "@/components/common/Utils";

// export interface PasswordBody extends FieldValues {
//   userName: string;
//   password: string;
//   confirmPassword: string;
// }

// create staff api
export const createStaff = async (body: any, router: any) => {
  let token: string | null = getAuthToken();
  const res = await ApiInstance.post("/staff/user/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res?.data;
  }
};
