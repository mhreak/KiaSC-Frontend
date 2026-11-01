import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Discount,
  DiscountCodeValidate,
  DiscountGet,
  DiscountGetListParams,
} from "@/types/api/endpointTypes/discounts.types";

const client = new ApiClient(
  API_CONFIG.panel.admin + API_ENDPOINT.discountCode,
);

export const discountCodeApi = {
  getList: (params?: DiscountGetListParams) => {
    return client.get<APIGetTemplate<Discount[]>>("/GetList", params);
  },
  get: (params?: { id: number }) => {
    return client.get<DiscountGet>(`/Get/${params?.id}`);
  },

  add: (data?: any) => {
    return client.post<APIAddTemplateResponse<number>, any>("/Add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  edit: (params?: any) => {
    return client.put<APIAddTemplateResponse, any>(`/Edit`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  //   delete: (params?: { id?: string }) => {
  //     return client.delete<APIGetTemplate<null>>(`/${params?.id}`);
  //   },

  validate: (data?: DiscountCodeValidate) => {
    return client.post<APIAddTemplateResponse<number>, DiscountCodeValidate>(
      "/ValidateForCourseRegistration",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
};
