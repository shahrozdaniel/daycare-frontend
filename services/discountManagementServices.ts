import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
export const getDiscountList = async () => {
  const token = getAuthToken();
  const config = {
    params: {
      dsicountType: "",
      page: "",
      size: "",
    },
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/discount/list`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res.data;
  }
};

export const createDiscount = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/discount/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const updateDiscount = async (body: any, id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(`/discount/update/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const getDiscountDetails = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/discount/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res.data;
  }
};
