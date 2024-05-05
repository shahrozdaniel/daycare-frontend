import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const AddEmaiTemplate = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`emailTemplate/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const EmaiTemplate = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/emailTemplate/template-list`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const getnotificationHistory = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(
    `/emailTemplate/notificationHistory`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const updateEmaiTemplate = async (body: any, id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(`emailTemplate/update/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const deleteEmaiTemplate = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.delete(`emailTemplate/delete/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const Addnotificationtemplate = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `notificationTemplate/create`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const notificationTemplate = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/notificationTemplate/list`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
