import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
import { toast } from "react-toastify";

export const getChildEnrollment = async (classRoomID: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(
    `enrollment/required-enrollment-details/${classRoomID}`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const createChildEnrollment = async (body: any, classRoomID: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `enrollment/enrollment-details/${classRoomID}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const getEnrollmentById = async (childId: any) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await ApiInstance.get(`enrollment/create/${childId}`, config);
    if (res?.data?.success) {
      return res?.data;
    } else {
      return res;
    }
  } catch (error) {}
};
export const multiStepChildEnrollment = async (body: any, childId: number) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`enrollment/${childId}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// export const deleteImmunization = async (childId: number) => {
//   const token = getAuthToken();
//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };
//   const res = await ApiInstance.delete(
//     /child/immunisationDelete/${childId},
//     config
//   );
//   if (res?.data?.success) {
//     return res?.data;
//   } else {
//     return res;
//   }
// };

// export const updateImmunization = async (body: any, childId: number) => {
//   const token = getAuthToken();
//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };
//   const res = await ApiInstance.put(``
//     /child/immunisationDetailsUpdate/${childId},
//     body,
//     config
//   );
//   if (res?.data?.success) {
//     return res?.data;
//   } else {
//     return res;
//   }
// };
