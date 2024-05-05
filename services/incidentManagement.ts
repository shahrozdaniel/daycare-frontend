import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
export const createIncidentChildren = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/child/incident/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const getChildrenIncidentList = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`child/incident/list`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const getChildrenIncidentView = async (id: string | number) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/child/incident/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const updateIncidentChildren = async (
  body: any,
  id: string | number
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `/child/incident/update/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
