import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

// Child Management API
export const childManagementApi = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  // console.log("token", token);
  const res = await ApiInstance.get("/child/list", config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
