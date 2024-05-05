import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const allergyOfChild = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(`child/children/allergies`, config);
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const detailsOfAllergy = async (name: string) => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(`child/children/allergiesDetail?allergy=${name}`, config);
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
export const immunasationDetailsOfChild = async () => {
    const token = getAuthToken();
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const res = await ApiInstance.get(`child/children/immunizationDetail`, config);
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};