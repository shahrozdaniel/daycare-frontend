import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";

export const getDashboardDetailsApi = async () => {
  let token = getAuthToken();
  try {
    const result = await ApiInstance.get("/dashboard/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.data.success) {
      return result?.data?.data;
    } else {
      return result?.data?.data;
    }
  } catch (error) {
    console.log("error", error);
  }

};
