import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const EdituserMangementPersonalDetails = async (
  id: string,
  body: any
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(`staff/user/update/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const EdituserMangementavailability = async (id: string, body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `staff/user/update/availability/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const EdituserMangementdocuments = async (id: string, body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `staff/user/update/documents/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const EdituserMangementemergencydetails = async (
  id: string,
  body: any
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `staff/user/update/emergency-details/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

export const EdituserMangementotherdetails = async (id: string, body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(
    `staff/user/update/other-details/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// personal details post api
export const createPersonalDetails = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorPersonalDetail`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// availability post api
export const createEducatorAvailbility = async (body: any, id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorAvailability/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// create educator record
export const createEducatorRecord = async (body: any, id: number) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorRecordsDocuments/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

//emergency contact post api
export const createEmergencyContactUser = async (body: any, id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorEmergencyContactDetails/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

//other details post api
export const createOtherDetailsUser = async (body: any, id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorOtherDetails/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// get record api
export const getEducatorRecord = async (id: string, paramsconfig: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: paramsconfig,
  };
  const res = await ApiInstance.get(
    `/staff/user/educator/viewEducatorRecordDocByID/${id}`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// certification add api post
export const createCertificationEducator = async (body: any, id: number) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorCertificationsDocuments/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// update certification document
export const updateCertificationDocumentEducator = async (
  recordid: string,
  staffId: string,
  body: any
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      staffId: staffId,
      id: recordid,
    },
  };
  const res = await ApiInstance.put(
    `/staff/user/updateEducatorCertificationDocByID`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
// delete record document
export const deleteCertifDocumentEducator = async (
  recordid: string,
  staffId: string
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      staffId: staffId,
      id: recordid,
    },
  };
  const res = await ApiInstance.delete(
    `/staff/user/deleteEducatorCertificationDoc`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// get user details from staff id
export const getEducatorByStaffId = async (id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/staff/user/educator/${id}`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// update record document
export const updateRecordDocument = async (
  recordid: string,
  staffId: string,
  body: any
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      staffId: staffId,
      id: recordid,
    },
  };
  const res = await ApiInstance.put(
    `/staff/user/updateEducatorRecordDocByID`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// delete record document
export const deleteRecordDocumentEducator = async (
  recordid: string,
  staffId: string
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      staffId: staffId,
      id: recordid,
    },
  };
  const res = await ApiInstance.delete(
    `/staff/user/deleteEducatorRecordDoc`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// create training document
export const createTrainingDocumentEducator = async (body: any, id: string) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(
    `/staff/user/educatorTrainingsDocuments/${id}`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// update training document
export const updateTrainingDocumentEducator = async (
  recordid: string,
  staffId: string,
  body: any
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      staffId: staffId,
      id: recordid,
    },
  };
  const res = await ApiInstance.put(
    `/staff/user/updateEducatorTrainingDocByID`,
    body,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};

// delete training document
export const deleteTrainingDocumentEducator = async (
  staffId: string,
  recordid: string
) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      staffId: staffId,
      id: recordid,
    },
  };
  const res = await ApiInstance.delete(
    `/staff/user/deleteEducatorTrainingDoc`,
    config
  );
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
