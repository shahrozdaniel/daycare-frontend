import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const dashboardAttendenceDetails = async (date: any) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `dashboard/attendance-details?date=${date}`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const DashboardCardDetails = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `dashboard/enrollment-registration-details`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const DashboardInvoiceDetais = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `/dashboard/invoice-details`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const DashboardAttendenceTable = async (date: any) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(
        `dashboard/classroomBasedAttendanceDetails?date=${date}`,
        config
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};