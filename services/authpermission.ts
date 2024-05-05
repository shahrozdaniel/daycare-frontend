import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";


export const getloggedInuserPermission = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.get('/permissions/loggedInUserPermission', config)

        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}
export const createRoles = async (body: any) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.post('/daycare/roles/create', body, config)

        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}

export const updateRoles = async (id: string, body: any) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.put(`/daycare/roles/update/${id}`, body, config)

        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}

export const deleteRole = async (id: string) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.delete(`/daycare/roles/delete/${id}`, config)

        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}

export const roleList = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.get('/daycare/roles/rolelist/roleslist', config)
        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}
export const authuserList = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.get('/users/daycaresUsersList', config)
        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}

export const AssignRoles = async (body: any) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.post('/daycare/roles/assign', body, config)

        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}
export const roleByid = async (id: any) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res;
    try {
        res = await ApiInstance.get(`/daycare/roles/${id}`, config)
        if (res?.data?.succes) {
            return res?.data
        } else {
            return res?.data
        }
    } catch (error: any) {
        return error?.response?.data?.error

    }
}