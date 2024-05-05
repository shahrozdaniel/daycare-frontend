import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

// Classroom API
export const classroomlist = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await ApiInstance.get("/classroom/list", config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const createClassroom = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/classroom/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const updateClassroom = async (id: any, body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(`/classroom/update/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const classroomCatogery = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/classroom-category/all`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
