import { getAuthToken } from "@/components/common/Utils";
import { ApiInstance } from "@/utils/ApiInstance";
export const getInvoiceList = async () => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.get(`/invoice/list`, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res.data;
  }
};

export const createInvoice = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/invoice/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const createInvoicePayment = async (body: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.post(`/invoice/payment/create`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
export const getInvoiceDetails = async (id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const res = await ApiInstance.get(`/invoice/invoice-details/${id}`, config);
    if (res?.data?.success) {
      return res?.data;
    } else {
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

export const updateInvoice = async (body: any, id: any) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await ApiInstance.put(`/invoice/update/${id}`, body, config);
  if (res?.data?.success) {
    return res?.data;
  } else {
    return res;
  }
};
