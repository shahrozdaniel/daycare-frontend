import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const getUserDetails = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await ApiInstance.get(`/staff/user/staff_detail/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const educatorCheckinCheckout = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/educator/checkinOut`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
