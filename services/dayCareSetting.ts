import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const dayCareSetting = async (
    actionType: string,
    body: any,
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.post(
        `daycare/update/settings?settingType=${actionType}`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const dayCareSettingDetails = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `daycare/update/settings`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};

export const dayCareSettingHolidayList = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `daycare/holiday/list`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
}


export const dayCareSettingDocs = async (
    body: any,
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
        },
    };
    const res = await ApiInstance.post(
        `daycare/registrationSetting`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};

export const dayCareSettingDocsDelete = async (
    id: any,
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.delete(
        `daycare/deleteRegistrationDoc/${id}`, config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const dayCareSettingDocsUpdate = async (
    id: any,
    body: any
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.put(
        `daycare/updateRegistrationDocByID/${id}`, body, config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};

export const addHolidayList = async (
    body: any,
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.post(
        `daycare/holiday`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const UpdateHolidayList = async (
    body: any,
    id: number
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.put(
        `daycare/updateHoliday/${id}`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const DeleteHoliday = async (
    id: number
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.delete(
        `daycare/holiday/${id}`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};


// Location and Cleaning Staff 

// Location 
export const locationList = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `daycare/room-list`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
}

export const createLoction = async (
    body: any,
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.post(
        `daycare/create-room`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const updateLocation = async (
    body: any,
    id: number
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.put(
        `daycare/update-room/${id}`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const deleteLocation = async (
    id: any
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.delete(
        `daycare/delete-room/${id}`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};

// complinces Staff 
export const complianceStafflist = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `daycare/complianceStafflist`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
}

export const createcomplianceStaff = async (
    body: any,
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.post(
        `daycare/create-complianceStaff`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const updatecomplianceStaff = async (
    body: any,
    id: number
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.put(
        `daycare/update/complianceStaff/${id}`,
        body,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const deletecomplianceStaff = async (
    id: any
) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.delete(
        `daycare/delete/complianceStaff/${id}`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};

