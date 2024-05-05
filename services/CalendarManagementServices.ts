import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const createFoodMenu = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/foodMenu/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const createActivityPlanning = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/activityPlanning/createactivityPlanning`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};



export const getEventData = async (month: any, catogery: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  let res;
  try {
    res = await ApiInstance.get(
      `activityPlanning/calenderDetail?month=${month}&classRoomCategory=${catogery}`,
      config
    );

    if (res?.data?.success) {
      return res?.data
    }
  } catch (error: any) {
    return error?.response?.data
  }


};


export const UpdateActivityPlanning = async (body: any, id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `/activityPlanning/updateActivityPlanning/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const UpdateFoodmenu = async (body: any, id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `/foodMenu/updateFoodMenu/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
}; 