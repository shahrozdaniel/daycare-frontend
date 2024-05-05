import { ApiInstance } from "@/utils/ApiInstance";

export const get_Country_State_city = async (body: any) => {
    const res = await ApiInstance.post(`daycare/countryStateCity/list`,
        body,
    );
    if (res?.data?.success) {
        return res?.data;
    } else {
        return res;
    }
};
