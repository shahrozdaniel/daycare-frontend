import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getChildprofileDetail = async (id: any) => {
  let token = getAuthToken();
  try {
    const res = await ApiInstance.get(`/child/${id}`, {
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
// api call for Wait list
export const childRegistrationList = async () => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.get("/registrations/list?status=1", config);
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// api for all registred  child list
export const getAllchildRegistrationList = async () => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.get(
      "/registrations/all-registered-list?status=1",
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
// api call for enroll list
export const childEnrollmetnList = async (status: string) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.get(
      `/enrollment/list?status=${status}`,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const approveEnrollment = async (body: any, enrollmentId: string) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `/enrollment/approve-enrollment/${enrollmentId}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    return error;
  }
};

export const assignClassroomEnrollment = async (
  body: any,
  enrollmentId: string
) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `/enrollment/assign-classroom/${enrollmentId}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    return error;
  }
};
//  api call for registred list
export const childPendingList = async () => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.get(
      "/registrations/list?status=0&status=2 ",
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const childlistStatus = async (reg_id: any, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(`/registrations/${reg_id}`, body, config);
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const childMedicalInfoEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `child/medical-info/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const childDoctorInfoEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `child/doctor-info/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const childOtherInfoEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `child/other-details/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const childemgContactEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `child/emergency-contact-details/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const childpersonalEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(`child/update/${child_id}`, body, config);
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const childParentlEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `parent/update/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const childProfileImageEdit = async (child_id: string, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `child/registration-profileImage/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export const childImmunazation = async (child_id: any, body: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.post(
      `child/immunisation-details/${child_id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export const childImmunazationList = async (child_id: any) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.get(
      `child/immunisation-details/${child_id}`,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
export const childImmunazationEdit = async (body: any, id: string) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `child/immunisationDetailsUpdate/${id}`,
      body,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    return error;
  }
};
export const childImmunazationDelete = async (child_id: string) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.delete(
      `child/immunisationDelete/${child_id}`,
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

//  get child Activity  get API
export const getChildActivityDetail = async (
  id: any,
  fromDate: any,
  toDate: any
) => {
  let token = getAuthToken();
  try {
    const res = await ApiInstance.get(
      `child/children/dailyReports?childId=${id}&fromdate=${fromDate}&todate=${toDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res?.data?.success) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error?.response?.data;
  }
};

export const UpdateGraduationDateofEnrolledChild = async (
  id: string,
  body: any
) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.put(
      `/enrollment/graduate/${id}`,
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

export const vacancyReportList = async () => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await ApiInstance.get(
      "/vacancyPlanning/list/vacancyReport",
      config
    );
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getVacancyChildWailist = async (
  startDate: string,
  classroomId: string
) => {
  let token = getAuthToken();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      status: 1,
      startDate: startDate,
      classroomId,
    },
  };
  try {
    const res = await ApiInstance.get(`registrations/vacancy/list`, config);
    if (res?.data?.succes) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
};

export const getChildJournalDetail = async (
  id: any,
  fromDate: any,
  toDate: any
) => {
  let token = getAuthToken();
  try {
    const res = await ApiInstance.get(
      `child/children/journal?childId=${id}&fromdate=${fromDate}&todate=${toDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res?.data?.success) {
      return res?.data;
    } else {
      return res?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error?.response?.data;
  }
};
