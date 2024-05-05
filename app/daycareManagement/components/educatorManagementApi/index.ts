import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

// Educator Management List API
export const educatorManagementListApi = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get("/staff/user/list", config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const educatorTerminate = async (id: any, body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/users/terminate/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
