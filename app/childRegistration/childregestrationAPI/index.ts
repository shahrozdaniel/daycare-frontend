import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

// Login api
export const childRegistration = async (body: object) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: token,
    },
  };

  const res = await ApiInstance.post("/child/registration", body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const childEdit = async (Child_id:any,body: object) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: token,
    },
  };

  const res = await ApiInstance.post(`/child/registration/update/${Child_id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const programTypeAll = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/program-type/all`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const ChildRegistrationProfile = async (body: any, childId: any) => {
  try {
    let token: string | null = getAuthToken();
    const res = await ApiInstance.post(
      `/child/registration-profileImage/${childId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success) {
      return res?.data;
    } else {
      return res;
    }
  } catch (err) {
    console.log("err in register ", err);
  }
};
