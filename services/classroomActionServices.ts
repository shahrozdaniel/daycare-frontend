import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const childListbyclass = async (id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`child/list?classroomId=${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const classRoomACtionCreate = async (actionType: string, body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `classroom-action/create/?actionType=${actionType}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const classroomDetailsById = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(
    `classroom/classroom-details/${id}`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const classroomDetailsByIdPresentStaff = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(
    `classroom/classroom-details/${id}?presentStaff=true`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const getLastSleep = async (id:any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`classroom-action/getSleepRecord/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};