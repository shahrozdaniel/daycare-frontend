import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const complianceManagementCreate = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `complianceManagement/create`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const complianceManagementUpdate = async (body: any, id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `complianceManagement/edit/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const complincesList = async (type: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(
    `complianceManagement/list?type=${type}`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const ViewcomplincesList = async (id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(
    `complianceManagement/view/${id}`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
