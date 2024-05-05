import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
export const getSubsidyProgramList = async () => {
  const token = getAuthToken();
  const config = {
    params: {
      subsidyName: "",
      page: "",
      size: "",
    },
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/subsidy/list`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res.data;
  }
};

export const createSubsidyProgram = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/subsidy/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const updateSubsidy = async (body: any, id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(`/subsidy/update/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const getSubsidyDetails = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/subsidy/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res.data;
  }
};
