import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const tutionPlanList = async () => {
  let token = getAuthToken();
  try {
    const res = await ApiInstance.get(`/fees-management/list-plans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data?.success) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const UpdateFeePlan = async (id: any, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `fees-management/update-plan/${id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
};

export const updateFeePlanStatus = async (id: any, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `/fees-management/update-status/${id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
};
export const CreateFeePlan = async (body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `/fees-management/create-plan`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
};
